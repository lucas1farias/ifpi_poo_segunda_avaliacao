

import { Perfil } from "./perfil";
import { Postagem } from "./postagem";
import { PostagemAvancada } from "./postagemAvancada";
import { 
    PerfilSemPostagemAvancadaError , PerfilSemPostagemRegularError, HashtagInexistenteError, PerfilInexistenteError, PostagemExcedeTamanhoError, 
    PostagemInexistenteError, PostagemSemSentidoError, PostagemVaziaError, PostagemRegularError 
} from "./excecoes";
import { Valor } from "./valor";

interface IRepositorioDePostagens {
    postagens: Postagem[];
    lastId: number;

    postagemVazia(postagem: string): boolean;
    postagemGigante(postagem: string): boolean;
    postagemSemSentido(postagem: string): boolean;

    incluir(postagem: Postagem): void;

    consultar(id: number, hashtag: string, texto?: string, perfil?: Perfil): Postagem[];

    consultarUnico(postId: number): Postagem;

    consultarPorIdPerfil(id: number): PostagemAvancada[];

    consultarPorHashtag(hashtag: string): PostagemAvancada[];

    tamanhoRepositorio(): number;

    filtrarPostagensAvancadas(): PostagemAvancada[];

    obterHashtags(arrayPosts: PostagemAvancada[]): string[];

    exibirPostagens(arrayPosts: Postagem[]): void;

    exibirPostagemSolo(postagem: Postagem): void;

    verRepositorioPostagens(): void;

    simularAtividadePostagem(): void;

    atualizarUltimoIdPostagem(): void;
}

interface IPostagemValidacoes {
    postagemVazia(postagem: string): boolean;
    postagemGigante(postagem: string): boolean;
    postagemSemSentido(postagem: string): boolean;
}

interface IConsultasPostagens {
    consultar(id: number, hashtag: string, texto?: string, perfil?: Perfil): Postagem[];
    consultarUnico(postId: number): Postagem;
    consultarPorIdPerfil(id: number): PostagemAvancada[];
    consultarPorHashtag(hashtag: string): PostagemAvancada[];
}

interface IPostagemExibicao {
    exibirPostagens(arrayPosts: Postagem[]): void;
    exibirPostagemSolo(postagem: Postagem): void;
    verRepositorioPostagens(): void;
}

interface IPostagemAtividade {
    simularAtividadePostagem(): void;
    atualizarUltimoIdPostagem(): void;
}

export class RepositorioDePostagens implements IRepositorioDePostagens, IPostagemValidacoes, IConsultasPostagens, IPostagemExibicao, IPostagemAtividade {
    private _postagens: Postagem[];
    mockProfile: Perfil;
    mockAdvancedPost: PostagemAvancada;
    lastId: number;

    constructor(postagem: Postagem[]) {
        this._postagens = postagem;
        this.mockProfile = new Perfil(-1, "Void", "void@gmail.com");
        this.mockAdvancedPost = new PostagemAvancada(-1, "void", 0, 0, "01-01-01", this.mockProfile, ["#void"], 0);
        this.lastId = 0;
    }

    get postagens(): Postagem[] {
        return this._postagens
    }

    postagemVazia(postagem: string): boolean {
        return postagem === ""
    }

    postagemGigante(postagem: string): boolean {
        return postagem.length > 100
    }

    postagemSemSentido(postagem: string): boolean {
        for (let i = 0; i < postagem.length; i++) {
            if (postagem[i] != " ") {
                return false
            }
        }
        return true
    }
    
    incluir(postagem: Postagem): void {
        if (this.postagemVazia(postagem.texto)) {
            throw new PostagemVaziaError("\nERRO: postagem vazia... [repositorioPerfis.ts/incluir]")
        }
        if (this.postagemGigante(postagem.texto)) {
            throw new PostagemExcedeTamanhoError("\nERRO: postagem excede limite de caracteres... [repositorioPerfis.ts/incluir]")
        }
        if (this.postagemSemSentido(postagem.texto)) {
            throw new PostagemSemSentidoError("\nERRO: postagem não faz sentido... [repositorioPerfis.ts/incluir]")
        }
        this.postagens.push(postagem)
    }
    
    // Por id de perfil (não inclui postagens avançadas)
    // Por hashtag (inclui apenas postagens avançadas)
    consultar(id: number, hashtag: string, texto?: string,  perfil?: Perfil): Postagem[] {
        const posts: Postagem[] = []
        let profileFound: boolean = false
        
        for(let i = 0; i < this.postagens.length; i++) {
            
            const currentPost: Postagem = this.postagens[i]
            
            // When post is regular, get posts based on a profile id
            // If profile id found == parameter id => append this post
            if (currentPost instanceof Postagem && !(currentPost instanceof PostagemAvancada)) {
                if (currentPost.perfil.id === id) {
                    profileFound = true
                    posts.push(currentPost)
                } 
            }
            
            // Advanced post
            if (currentPost instanceof PostagemAvancada) {
                if (currentPost.hashtags.includes(hashtag)) {
                    posts.push(currentPost)
                }
            }
        }
        
        // add -1 p/ caso se queira procurar por postagem avançada, colocar -1 desconsidera busca por perfil
        if (!profileFound && id != -1) {
            throw new PerfilSemPostagemRegularError("\nERRO: perfil não possui postagens regulares... [repositorioPostagens.ts/consultar]")
        }
        
        // Ambas pesquisas podem estar vazias, mas a de perfil vêm primeiro com a condição acima
        // Portanto, se passar, então o problema foi na busca por postagem avançada 
        if (posts.length == 0) {
            throw new HashtagInexistenteError("\nERRO: não foram encontrados postagens com essa hashtag... [repositorioPostagens.ts/consultar]")
        }
        return posts
    }

    consultarUnico(postId: number): Postagem {
        // Espera achar a postagem que seja de valor igual ao parâmetro
        const thePost: Postagem[] = this.postagens.filter((i: Postagem) => {
            if (i.id === postId) {
                return true
            }
            return false
        })
        
        // Se não existir, informar que a postagem com este id não existe
        if (thePost.length === 0) {
            throw new PostagemInexistenteError("\nERRO: postagem inexistente... [repositorioPostagens.ts/consultarUnico]")
        }

        return thePost[0]
    }
    
    // case 7: Trata indiretamente postagens avançadas sem views
    consultarPorIdPerfil(id: number): PostagemAvancada[] {
        let fromId: boolean = false
        const posts: PostagemAvancada[] = []
        
        for(let i = 0; i < this.postagens.length; i++) {
            const currentPost: Postagem = this.postagens[i]
            
            if (currentPost instanceof PostagemAvancada) {
                if (currentPost.perfil.id === id) {
                    if (currentPost.visualizacoesRestantes > 0) {
                        fromId = true
                        posts.push(currentPost)
                    }
                }
            }
        }
        
        if (!fromId) {
            throw new PerfilSemPostagemAvancadaError("\nERRO: perfil não possui postagens avançadas... [repositorioPostagens.ts/consultarPorIdPerfil]")
        }
        return posts
    }
    
    // case 7
    consultarPorHashtag(hashtag: string): PostagemAvancada[] {
        let fromHashtag: boolean = false
        const posts: PostagemAvancada[] = []
        
        for(let i = 0; i < this.postagens.length; i++) {
            const currentPost: Postagem = this.postagens[i]
            if (currentPost instanceof PostagemAvancada) {
                if (currentPost.hashtags.includes(hashtag)) {
                    if (currentPost.visualizacoesRestantes > 0) {
                        fromHashtag = true
                        posts.push(currentPost)
                    }
                }
            }
        }

        if (!fromHashtag) {
            throw new HashtagInexistenteError("\nERRO: não foram encontradas postagens com essa hashtag... [repositorioPostagens.ts/consultarPorHashtag]") 
        }

        return posts
    }

    tamanhoRepositorio(): number {
        return this.postagens.length
    }

    // Support
    filtrarPostagensAvancadas(): PostagemAvancada[] {
        let postsFilter: Postagem[] = this.postagens.filter((i: Postagem) => {
            if (i instanceof PostagemAvancada) {
                return true
            }
            return false
        })
        
        // This is done to avoid error ts(2322)
        const advancedPosts: PostagemAvancada[] = []
        postsFilter.forEach(i => {i instanceof PostagemAvancada ? advancedPosts.push(i) : null})
        postsFilter = []
        
        return advancedPosts
    }

    // Support
    obterHashtags(arrayPosts: PostagemAvancada[]): string[] {
        const arrayHashtags: string[] = []
        for (let i = 0; i < arrayPosts.length; i++) {
            // Add each hashtag [j] from each index of arrayPosts [i]
            for (let j = 0; j < arrayPosts[i].hashtags.length; j++) {
                arrayHashtags.push(arrayPosts[i].hashtags[j])
            }
        }
        return arrayHashtags
    }
    
    // Função suporte: quando for exibir arrays do tipo "Postagem[]" que não são "this.postagens"
    exibirPostagens(arrayPosts: Postagem[]): void {
        console.log("\n[")
        for (let i = 0; i < arrayPosts.length; i++) {
            const thisPost: Postagem = arrayPosts[i]
            this.exibirPostagemSolo(thisPost)
        }
        console.log("]")
    }

    exibirPostagemSolo(postagem: Postagem): void {
        if (postagem instanceof Postagem && !(postagem instanceof PostagemAvancada)) {
            console.log("------------------------------------------------")
            console.log(`    (${postagem.data}) ${postagem.texto}`)
            console.log(`    likes: ${postagem.curtidas}    dislikes: ${postagem.descurtidas}`)
        } if (postagem instanceof PostagemAvancada) {
            console.log("------------------------------------------------")
            console.log(`    (${postagem.data}) ${postagem.texto}`)
            console.log(`    likes: ${postagem.curtidas}    dislikes: ${postagem.descurtidas}    views restantes: ${postagem.visualizacoesRestantes}`)
        }
    }
    
    // Função suporte: exibir "this.postagens"
    verRepositorioPostagens(): void {
        console.log("\n[")
        for(let i = 0; i < this.tamanhoRepositorio(); i++) {
            const thisPost: Postagem = this.postagens[i] 
            this.exibirPostagemSolo(thisPost)
        }
        console.log("]")
    }

    //  
    simularAtividadePostagem(): void {
        for (let i = 0; i < this.tamanhoRepositorio(); i++) {
            this.postagens[i].curtidas = new Valor().criarValor(1, 100001)
            this.postagens[i].descurtidas = new Valor().criarValor(1, 100001)
        }
    }

    /* ===== SUPPORTS: "txt/last_id_post.txt" =====
    After each new post added, this value will track the history of indexes record 
    */
    atualizarUltimoIdPostagem() {
        this.lastId++
    }
}

