



import { Calendario } from "./calendario"
import { File } from "./file"
import { Hashtag } from "./hashtag"
import { Messages } from "./mensagem"
import { Perfil } from "./perfil"
import { IPerfil } from "./repositorioPerfis"
import { IPerfilCompleto } from "./repositorioPerfis"
import { Postagem } from "./postagem"
import { PostagemAvancada } from "./postagemAvancada"
import { RedeSocial } from "./redeSocial"
import { RepositorioDePostagens } from "./repositorioPostagens"
import * as self from "./excecoes"
import prompt from "prompt-sync"

export class App {
    private _redeSocial: RedeSocial
    
    // Content for algorithm handling
    auto: boolean
    operation: string
    input
    
    // Text files variables
    profilesTxt: File
    postsTxt: File
    profileLastId: File
    postLastId: File
    settingsOptionA: File

    // Support classes
    calendar: Calendario

    // Settings
    private _triggerOptionA: number
 
    constructor(redeSocial: RedeSocial, auto: boolean=false) {
        this._redeSocial = redeSocial
        this.auto = auto
        this.input = prompt()
        this.operation = ""
        
        // Text files
        this.profilesTxt = new File("../txt/profiles.txt", "")
        this.postsTxt = new File("../txt/posts.txt", "")
        this.profileLastId = new File("../txt/last_id_profile.txt", "")
        this.postLastId = new File("../txt/last_id_post.txt", "")
        this.settingsOptionA = new File("../txt/settingsOptionA.txt", "")

        this.calendar = new Calendario()
        
        // This is only apropriate to settings menu options, otherwise, it is better to create functions
        this._triggerOptionA = Number(this.settingsOptionA.read())
        
        this.auto ? this.iniciar() : null
    }

    get redeSocial(): RedeSocial {
        return this._redeSocial
    }

    get triggerOptionA(): number {
        return this._triggerOptionA
    }

    set triggerOptionA(newValue) {
        this._triggerOptionA = newValue
    }

    // Main
    iniciar(): void {
        
        // docs/app.txt/iniciar/copy_file_values
        this.recuperarUltimoIndiceDePerfil()
        this.recuperarUltimoIndiceDePostagem()

        // docs/app.txt/iniciar/translate_and_copy_from_file_content_to_virtual_array
        this.recuperarRepositorioPerfis()
        this.recuperarRepositorioPostagens()
        
        // Start
        do {
            console.clear()
            console.log(this.menu())
            this.operation = this.requisitarEntrada(new Messages().msg.inputs.askOperationValue)
            this.condicionais()
            
        } while(this.operation != "0")
        
        // The wipe must happen before any change on
        this.removerPostagensAvancadasSemViews()
        
        /*
        ========== PROFILE MANAGEMENT ==========
        Record into documents the last index from each repository
        Before recording, wipe old content, and when leaving, record new content
        */
        this.gravarUltimoPerfilId()
        this.limparRepositorioPerfisDesatualizado()    
        this.anexarRepositorioPerfisAtualizado()

        /* ========== POSTS MANAGEMENT ==========
        Before recording, wipe old content, and when leaving, record new content
        */
        this.gravarUltimoPostId()
        this.limparRepositorioPostagensDesatualizado()
        this.triggerOptionA != 0 ? this.redeSocial.repPosts.simularAtividadePostagem() : null
        this.anexarRepositorioPostagensAtualizado()

        // End
        this.teclarEnter()
        console.log(new Messages().msg.warn)
        console.log(new Messages().msg.success.appClosed)
        
    }
    
    // Uses set method from "RepositorioDePerfis"
    recuperarUltimoIndiceDePerfil(): void {
        this.redeSocial.repPerfis.lastId = Number(this.profileLastId.read())
    }

    // Uses set method from "RepositorioDePostagens"
    recuperarUltimoIndiceDePostagem(): void {
        this.redeSocial.repPosts.lastId = Number(this.postLastId.read())
    }

    // To be used before algorithm start
    recuperarRepositorioPerfis(): void {
        const profilesData = this.profilesTxt.read().split("\n")
        for (let i = 0; i < profilesData.length; i++) {
            // There is an empty line after appending rows, so this is required
            if (profilesData[i] != "") {
                const p: string[] = profilesData[i].split(";")
                const retrievedProfile: Perfil = new Perfil(Number(p[0]), p[1], p[2])
                this.redeSocial.incluirPerfil(retrievedProfile)
            }
        }
    }

    // To be used before algorithm start
    recuperarRepositorioPostagens(): void {
        const postsData = this.postsTxt.read().split("\n");
        for (let i = 0; i < postsData.length; i++) {
            if (postsData[i] != "") {
                const p: string[] = postsData[i].split(";");
                const profileId: number = Number(p[5]);
                
                // Modificação aqui: Verifica se o perfil existe antes de tentar atribuir
                const profileExists: Perfil | null = this.redeSocial.consultarPerfil(profileId, "void", "void");
    
                if (profileExists) {
                    if (p.length == 6) {
                        const retrievedPost: Postagem = new Postagem(
                            Number(p[0]), p[1], Number(p[2]), Number(p[3]), p[4], profileExists
                        );
                        this.redeSocial.incluirPostagem(retrievedPost);
                    }
                    if (p.length > 6) {
                        const hashtagFromRowToArray: string[] = p[6].split(",");
                        const retrievedPost: PostagemAvancada = new PostagemAvancada(
                            Number(p[0]), p[1], Number(p[2]), Number(p[3]), p[4], profileExists,
                            hashtagFromRowToArray, Number(p[7])
                        );
                        this.redeSocial.incluirPostagem(retrievedPost);
                    }
                }
            }
        }
    }
    
    menu(): string {
        return `
        ===== REDE SOCIAL =====
        0. Sair

        ===== PERFIL =====
        1. incluir    2. consultar

        ===== POSTAGEM =====
        3. incluir    4. consultar    5. curtir    6. descurtir

        ===== VIEWS =====
        7. decrementar visualizações

        ===== POSTAGEM =====
        8. exibir por perfil    9. exibir por hashtag
        
        ===== CONSULTAS =====
        10. repositório de perfis    11. repositório de postagens
        12. postagens + populares    13. hashtags + populares

        ===== CONFIGURAÇÕES =====
        01. Ativar simulação de atividade
        `

        /*
        ===== FUNCIONALIDADES =====
        a. adicionar hashtag
        b. remover postagem
        c. editar postagem
        d. ver postagens (ano e mês)
        e. resetar repositório de postagens
        */
    }
    
    requisitarEntrada(sentence: string, empty: boolean=false): string {
        console.log(sentence)
        let data: string
        empty ? data = this.input("") : data = this.input(">>> ")
        return data
    }

    requisitarEntradaNumero(sentence: string, empty: boolean=false): number {
        console.log(sentence)
        let data: number
        empty ? data = Number(this.input("")) : data = Number(this.input(">>> "))
        return data
    }

    gravarUltimoValorConfigA(newValue: string): void {
        this.settingsOptionA.content = newValue 
        this.settingsOptionA.write()
    }
    
    gravarUltimoPerfilId(): void {
        this.profileLastId.content = `${this.redeSocial.repPerfis.lastId}`
        this.profileLastId.write()
    }

    gravarUltimoPostId(): void {
        this.postLastId.content = `${this.redeSocial.repPosts.lastId}`
        this.postLastId.write()
    }

    limparRepositorioPerfisDesatualizado(): void {
        this.profilesTxt.content = ""
        this.profilesTxt.write()
    }

    // Before algorithm ceases: update "new profile" content into its container file
    anexarRepositorioPerfisAtualizado(): void {
        let row: string = ""
        for (let i = 0; i < this.redeSocial.repPerfis.perfis.length; i++) {
            const profile: IPerfil = this.redeSocial.repPerfis.perfis[i]
            row = `${profile.id};${profile.nome};${profile.email}`
            this.profilesTxt.content = row + '\n'
            this.profilesTxt.append()
        }
    }

    limparRepositorioPostagensDesatualizado(): void {
        this.postsTxt.content = ""
        this.postsTxt.write()
    }

    // Before algorithm ceases: update "new post" content into its container file
    anexarRepositorioPostagensAtualizado(): void {
        /*
            ===== FOR ALL KINDS OF POSTS =====
            Instead of putting the entire profile content, insert only its id: row = `...${p.perfil.id}`
            
            ===== FOR ADVANCED POSTS =====
            The array of hashtags is improper, so the array is turned into a string
            ["#gastronomia", "#estrognofe_com_farofa"] = ;#gastronomia,#estrogonofe_com_farofa;
        */
        for (let i = 0; i < this.redeSocial.repPosts.postagens.length; i++) {
            let row: string = ""
            const p: Postagem = this.redeSocial.repPosts.postagens[i]
            
            // Regular post
            if (p instanceof Postagem && !(p instanceof PostagemAvancada)) {
                row = `${p.id};${p.texto};${p.curtidas};${p.descurtidas};${p.data};${p.perfil.id}`
            }
            
            // Advanced post
            if (p instanceof PostagemAvancada) {
                row = `${p.id};${p.texto};${p.curtidas};${p.descurtidas};${p.data};${p.perfil.id};${p.hashtags.toString()};${p.visualizacoesRestantes}`
            }

            // Creating row content and inserting it into file
            this.postsTxt.content = row + '\n'
            this.postsTxt.append()
        }
    }

    teclarEnter(): void {
        this.requisitarEntrada(new Messages().msg.inputs.pressEnter, true)
    }
    
    // Cases
    condicionais(): void {
        switch(this.operation) {
            case "1":
                console.log(new Messages().msg.operations.includeProfile)
                this.incluirPerfil()
                break
            case "2":
                console.log(new Messages().msg.operations.searchProfile)
                this.consultarPerfil()
                break
            case "3":
                console.log(new Messages().msg.operations.includePost)
                this.incluirPostagem()
                break
            case "4":
                console.log(new Messages().msg.operations.queryPost)
                this.consultarPostagem()
                break
            case "5":
                console.log(new Messages().msg.operations.likePost)
                this.curtir()
                break
            case "6":
                console.log(new Messages().msg.operations.unlikePost)
                this.descurtir()
                break
            case "7":
                console.log(new Messages().msg.operations.lessView)
                this.decrementarVisualizacoes()
                break
            case "8":
                console.log(new Messages().msg.operations.showPostsByProfile)
                this.exibirPostagensPorPerfil()
                break
            case "9":
                console.log(new Messages().msg.operations.showPostsByHashtag)
                this.exibirPostagensPorHashtag()
                break
            case "10":
                console.log(new Messages().msg.operations.showProfileRepository)
                this.verPerfis()
                break
            case "11":
                console.log(new Messages().msg.operations.showPostsRepository)
                this.verPostagens()
                break
            case "12":
                console.log(new Messages().msg.operations.queryMostPopularPosts)
                // const popularPosts: Postagem[] = this.getMostPopularPosts()
                // console.log(popularPosts);
                // (<RedeSocial> this.redeSocial).decrementarVisualizacoesPostagensAvancadas(popularPosts)
                this.getMostPopularPosts()
                this.teclarEnter()
                break
            case "13":
                console.log(new Messages().msg.operations.queryMostPopularHashtags)
                const mostPopularPosts: Postagem[][] = this.getMostPopularHashtags()
                mostPopularPosts.forEach((i:Postagem[], pos) => {
                    (<RepositorioDePostagens> this.redeSocial.repPosts).exibirPostagens(mostPopularPosts[pos]);
                    (<RedeSocial> this.redeSocial).decrementarVisualizacoesPostagensAvancadas(mostPopularPosts[pos])
                })
                this.teclarEnter()
                break
            case "a":
                console.log(new Messages().msg.operations.postHashtagAppend)
                this.addHashtag()
                break
            case "b":
                console.log(new Messages().msg.operations.postRemoval)
                this.removerPostagem()
                break
            case "c":
                console.log(new Messages().msg.operations.postContentEdit)
                this.editarPostagem()
                break
            case "d":
                console.log(new Messages().msg.operations.postQueryComplete)
                this.exibirPostagensAnoEspecifico()
                break
            case "e":
                this.apagarConteudoRepositorio()
                break
            case "01": 
               this.habilitarPostagemInteracao()
        }
    }
    
    // Case 1 (profileId descartado, pois ++ automaticamente)
    incluirPerfil(): void { 
        try {
            const inputName: string = this.requisitarEntrada("Informe seu nome")
            new self.Excecao().verificarEntrada(inputName, false)
            const inputEmail: string = this.requisitarEntrada("Informe seu email")
            new self.Excecao().verificarEntradaEmail(inputEmail)
            
            // Se os formatos forem corretos: cria
            const newProfile: Perfil = new Perfil(this.redeSocial.repPerfis.lastId, inputName, inputEmail)
            
            // (Não há exceção) "id" nunca se repete
            this.redeSocial.incluirPerfil(newProfile)
            
            this.redeSocial.repPerfis.atualizarUltimoIdPerfil()
            console.log("\nAVISO: Perfil criado...")
            this.teclarEnter()
        } 
        catch (err: any) {
            new self.Excecao().excecao(err)
            this.teclarEnter()
        }
    }
    
    // case 2
    consultarPerfil(): void {
        try {
            const profileId: number = this.requisitarEntradaNumero("Informe o id do perfil >>> ");
            
            // Exceção aqui
            const query: IPerfilCompleto | null = this.redeSocial.repPerfis.consultar(profileId)

            // if (query !== null && query !== undefined) {
                // console.log(`{ id: ${query.id} nome: ${query.nome} email: ${query.email} }`);
            // } else {
            //     console.log("Perfil não encontrado");
            // }
            console.log(`{ id: ${query?.getId()}, nome: ${query?.getNome()}, email: ${query?.getEmail()} }`)

            this.teclarEnter()
        } catch (err: any) {
            new self.Excecao().excecao(err)
            this.teclarEnter()
        }
}
    // Case 3
    incluirPostagem(): void {
        try {
            let postType: string
            let today: string
            let profileId: number
            let text: string
            let hashtag: string
            let profileHashtags: string[] = []
            let views: number
            let hashtagsAmount: number

            do {
                postType = this.requisitarEntrada("Informe o tipo da postagem (1: regular, 2: avançada)")
            } while (postType !== "1" && postType !== "2")

            today = this.requisitarEntrada("Informe a data da postagem (ex: 2023-01-01)")
            this.redeSocial.tratarData(today, "-")

            profileId = this.requisitarEntradaNumero("Informe o id do perfil")
            const profile: IPerfilCompleto | null = this.redeSocial.repPerfis.consultar(profileId)

            if (profile) {
                const profileExists: Perfil = new Perfil(profile.id, profile.nome, profile.email)
                text = this.requisitarEntrada("Informe o texto da postagem")

                if (postType === "1") {
                    const newPost: Postagem = new Postagem(this.redeSocial.repPosts.lastId, text, 0, 0, today, profileExists);

                    // Contêm exceção
                    this.redeSocial.incluirPostagem(newPost)
                    this.teclarEnter()
                } 
                else if (postType === "2") {
                    views = this.requisitarEntradaNumero("Informe a qtd. de views")
                    hashtagsAmount = this.requisitarEntradaNumero("Informe a quantidade de hashtags")

                    const newPost: PostagemAvancada = new PostagemAvancada(
                        this.redeSocial.repPosts.lastId, text, 0, 0, today, profileExists, profileHashtags, views
                    )

                    for (let i = 0; i < hashtagsAmount; i++) {
                        hashtag = this.requisitarEntrada(`Nome da ${i + 1}a hashtag (não incluir #)`)
                        // newPost.addHashtag()
                        newPost.hashtags.push("#" + hashtag)
                    }

                    // Contêm exceção
                    newPost.addHashtag()
                    this.redeSocial.incluirPostagem(newPost)
                    this.teclarEnter()
                }

                this.redeSocial.repPosts.atualizarUltimoIdPostagem()
                console.log("\nAVISO: Postagem criada...")
                this.teclarEnter()
            } 
        } 
        catch (err: any) {
            new self.Excecao().excecao(err)
            this.teclarEnter()
        }
    }

    // Case 4
    consultarPostagem(): void {
        try {
            let postType: string
            let profileId: number
            let hashtag: string
            
            do {
                postType = this.requisitarEntrada(new Messages().msg.inputs.askPostType)
            } while (postType !== "1" && postType !== "2")
            
            // Regular post: receives posts if the "post.profile.id" === profile id input
            if (postType === "1") {
                profileId = this.requisitarEntradaNumero("Informe id do perfil")
                const query: Postagem[] = this.redeSocial.consultarPostagens(profileId, "")
                // query ? this.redeSocial.repPosts.exibirPostagens(query) : `{ }`
                this.redeSocial.repPosts.exibirPostagens(query)
            }
            
            // Advanced post: receives posts if the "post.hashtags" has hashtag input included 
            else {
                hashtag = this.requisitarEntrada("Informe a hashtag (incluir #)")
                const query: Postagem[] = this.redeSocial.consultarPostagens(-1, hashtag)
                query ? this.redeSocial.repPosts.exibirPostagens(query) : `{ }`
            }
            
            this.teclarEnter()
        }
        catch (err: any) {
            new self.Excecao().excecao(err)
            this.teclarEnter()
        }
    }

    // Case 5: Aumenta curtida de uma postagem com base no ID da postagem (não decrementa views)
    curtir(): void {
        try {
            let postId: number

            postId = this.requisitarEntradaNumero("Informe o id da postagem") 

            // Contêm exceção
            const thePost: Postagem = this.redeSocial.repPosts.consultarUnico(postId)

            // Consoles servem para verificar sem ter que ir aos documentos de txt
            this.redeSocial.repPosts.exibirPostagemSolo(thePost)
            this.redeSocial.curtir(postId)
            this.redeSocial.repPosts.exibirPostagemSolo(thePost)
            console.log("\nAVISO: Postagem curtida...")
            this.teclarEnter()
        }
        catch (err: any) {
            new self.Excecao().excecao(err)
            this.teclarEnter()
        }
    }

    // Case 6: Aumenta descurtida de uma postagem com base no ID da postagem (não decrementa views)
    descurtir(): void {
        try {
            let postId: number

            postId = this.requisitarEntradaNumero("Informe o id da postagem") 

            // Contêm exceção
            const thePost: Postagem = this.redeSocial.repPosts.consultarUnico(postId)

            // Consoles servem para verificar sem ter que ir aos documentos de txt
            this.redeSocial.repPosts.exibirPostagemSolo(thePost)
            this.redeSocial.descurtir(postId)
            this.redeSocial.repPosts.exibirPostagemSolo(thePost)
            console.log("\nAVISO: Postagem recebeu dislike...")
            this.teclarEnter()
        }
        catch (err: any) {
            new self.Excecao().excecao(err)
            this.teclarEnter()
        }
    }
    
    // Case 7
    decrementarVisualizacoes(): void {
        try {
            // Motores de busca
            let profileId: number;
            let hashtag: string;

            // Tipo da busca
            let searchType: string;

            // Armazenamento da busca
            let query: PostagemAvancada[];

            do {
                searchType = this.requisitarEntrada("Informe a forma de busca:\n1. id do perfil\n2. hashtag");
            } while (searchType !== "1" && searchType !== "2");

            // Postagens capturadas via id de perfil
            if (searchType === "1") {
                profileId = this.requisitarEntradaNumero("Informe o id do perfil");
                const profile = this.redeSocial.repPerfis.consultar(profileId);
                
                // Verificando se o perfil foi encontrado
                if (profile) {
                    query = this.redeSocial.consultarPostagensPorPerfil(profileId);
                    console.log("\nAVISO: Postagens encontradas");
                    this.redeSocial.repPosts.exibirPostagens(query);
                    // Retirar views após exibir
                    this.redeSocial.decrementarVisualizacoesMultiplas(query);
                    this.teclarEnter();
                } else {
                    throw new self.PerfilInexistenteError("ERRO: perfil não encontrado... [app.ts/decrementarVisualizacoes.ts]")
                }
            }

            // Postagens capturadas via hashtag
            else {
                hashtag = this.requisitarEntrada("Informe a hashtag (incluir #)");
                query = this.redeSocial.consultarPostagensPorHashtag(hashtag);
                console.log("\nAVISO: Postagens encontradas");
                this.redeSocial.repPosts.exibirPostagens(query);
                // Retirar views após exibir
                this.redeSocial.decrementarVisualizacoesMultiplas(query);
                this.teclarEnter();
            }
        } catch (err: any) {
            new self.Excecao().excecao(err);
            console.log("catch...");
            this.teclarEnter();
        }
    }

    // Case 8
    exibirPostagensPorPerfil(): void {
        try {
            const profileId: number = this.requisitarEntradaNumero("Informe o id do perfil");

            // Exceção aqui
            const profile = this.redeSocial.repPerfis.consultar(profileId);
            
            // Verificando se o perfil foi encontrado
            if (profile) {
                this.requisitarEntrada(`Pessoa encontrada: ${profile.nome} (ver postagens = aperte ENTER)`, true);

                // Aqui têm exceção: PerfilSemPostagemError
                const postsFound: Postagem[] = this.redeSocial.exibirPostagensPorPerfil(profileId);
                this.redeSocial.repPosts.exibirPostagens(postsFound);
                this.redeSocial.decrementarVisualizacoesPostagensAvancadas(postsFound);
                this.teclarEnter();
            } else {
                throw new self.PerfilInexistenteError("ERRO: perfil não encontrado... [app.ts/exibirPostagensPorPerfil]")
            }
        } 
        catch (err: any) {
            new self.Excecao().excecao(err);
            this.teclarEnter(); 
        }
    }

    // Case 9
    exibirPostagensPorHashtag(): void {
        try {
            const hashtag: string = this.requisitarEntrada(new Messages().msg.inputs.askHashtagContent)
            
            // Aqui têm exceção: PostagemSemHashtagAlvoError
            const postsFound: Postagem[] = this.redeSocial.exibirPostagensPorHashtag(hashtag)
            this.redeSocial.repPosts.exibirPostagens(postsFound)
            this.redeSocial.decrementarVisualizacoesPostagensAvancadas(postsFound)
            this.teclarEnter()
        }
        catch(err: any) {
            new self.Excecao().excecao(err)
            this.teclarEnter() 
        }
    }

    // Case 10
    verPerfis(): void {
        console.log("Perfis registrados", this.redeSocial.repPerfis.tamanhoRepositorio())
        this.teclarEnter();
        this.redeSocial.repPerfis.verRepositorioPerfis()
        this.teclarEnter()
    }
    
    // Case 11
    verPostagens(): void {
        console.log("Postagens registradas", this.redeSocial.repPosts.tamanhoRepositorio())
        this.teclarEnter();
        this.redeSocial.repPosts.verRepositorioPostagens()
        this.teclarEnter()
    }
    
    // Case 12
    getMostPopularPosts(): void {

        // Filter the ones that fit to be popular
        let postRepository: Postagem[] = this.redeSocial.repPosts.postagens
        postRepository = postRepository.filter((i: Postagem) => {
            if (i instanceof Postagem && !(i instanceof PostagemAvancada)) {
                if (i.ehPopular()) {
                    return true
                }
            }
            if (i instanceof PostagemAvancada) {
                if (i.ehPopular() && i.visualizacoesRestantes > 0) {
                    return true
                }
            }
            return false
        })
        
        // Compare values and sort the most popular ones to the top
        postRepository = postRepository.sort((i: Postagem, i2: Postagem) => {
            if (i2.ehPopularPorcentagem() < i.ehPopularPorcentagem()) {
                return -1  
            } else if (i2.ehPopularPorcentagem() > i.ehPopularPorcentagem()) {
                return 1  
            } else {
                return 0   
            }
        })

        // Show in a form of rank
        postRepository.forEach((i: Postagem) => {
            console.log("\nÍndice de popularidade: ", Math.floor(i.ehPopularPorcentagem()), "%")
            console.log(i)
        })
    }

    // Case 13
    getMostPopularHashtags(): PostagemAvancada[][] {
        const rankAmount: number = this.requisitarEntradaNumero(new Messages().msg.inputs.askHashtagAmountForRank)
        const hashtagsBoxNonUnique: string[] = this.redeSocial.repPosts.obterHashtags(this.redeSocial.repPosts.filtrarPostagensAvancadas())
        const hashtagsBox: Hashtag = new Hashtag(hashtagsBoxNonUnique)
        const hashtagsBoxUnique: string[] = hashtagsBox.filtrarHashtagsUnicas()
        const hashtagsCountageRank: [string, number][] = hashtagsBox.ordenarCrescente()
        const rank: [string, number][] = []

        const overallPopularHashtagPosts: PostagemAvancada[][] = []
        // Put into "rank" the counting results based on the range the user provided
        // If "rankAmount" is 3 ... then ... rank = [["#saúde", 4], ["#animais", 3], ["#mundo", 2]]
        for (let i = 0; i < rankAmount; i++) {
            rank.push(hashtagsCountageRank[i])
        }
        // Based on index [0] of "rank" (the hashtag), get the posts that have it within each array of this post
        for (let i = 0; i < rank.length; i++) {
            const hashtag: string = rank[i][0]
            overallPopularHashtagPosts.push(this.redeSocial.exibirPostagensPorHashtag(hashtag))
        }
        return overallPopularHashtagPosts
    }

    /* ========== EXTRA FUNCTIONALITIES ========== */ 

    // a
    addHashtag(): void {
        
        const profileId: number = this.requisitarEntradaNumero(new Messages().msg.inputs.askProfileId)
        const postsFromThisProfile: Postagem[] = this.redeSocial.repPosts.consultar(profileId, "")
        
        const idList: number[] = []
        postsFromThisProfile.forEach((i: Postagem) => {i instanceof PostagemAvancada ? idList.push(i.id) : null})
        
        console.log(postsFromThisProfile)
        console.log("Escolha um dos ids abaixo, por favor:", "\n", idList)
        const advancedPostId: number = this.requisitarEntradaNumero(">>> ", true)
        
        idList.forEach((i: number) => {
            if (advancedPostId === i) {
                const newPost = this.redeSocial.repPosts.consultarUnico(advancedPostId)
                console.log(newPost)
                console.log("Informe o nome da hashtag (incluir #)")
                const newHashtag: string = this.requisitarEntrada(">>> ", true)
                this.teclarEnter()
                
                if (newPost instanceof PostagemAvancada) {
                    newPost.adicionarHashtag(newHashtag) 
                }
            }
        })
        this.teclarEnter()
    }
    
    // b
    removerPostagem(): void {
        const postId: number = this.requisitarEntradaNumero(new Messages().msg.inputs.askPostId)

        for (let i = 0; i < this.redeSocial.repPosts.postagens.length; i++) {
            const p: Postagem = this.redeSocial.repPosts.postagens[i]
            
            if (p.id === postId) {
                this.redeSocial.repPosts.postagens.splice(i, 1)
                console.log(new Messages().msg.warn)
                console.log(new Messages().msg.success.postRemoved)
                this.teclarEnter()
                return
            }
        }
        console.log(new Messages().msg.warn)
        console.log(new Messages().msg.fail.postNotFound)
        this.teclarEnter()
    }

    // c
    editarPostagem(): void {
        const postId: number = this.requisitarEntradaNumero(new Messages().msg.inputs.askPostId)
        const thePost: Postagem = this.redeSocial.repPosts.consultarUnico(postId)
        
        if (thePost.id != -1) {
            const thePostInfo: string = `
            ${new Messages().msg.info.postHighlight}
            Texto:
                ${thePost.texto}
                < likes: ${thePost.curtidas} >    < dislikes: ${thePost.descurtidas} >
            `
            console.log(thePostInfo)
            const newPostText: string = this.requisitarEntrada(new Messages().msg.inputs.askNewPostText)
            thePost.texto = newPostText
            console.log(new Messages().msg.warn)
            console.log(new Messages().msg.success.postContentChanged)
        } else {
            console.log(new Messages().msg.warn)
            console.log(new Messages().msg.fail.postNotFound)
        }
        this.teclarEnter()
    }

    // d
    exibirPostagensAnoEspecifico(): void {

        const monthsMenu: string[] = [
            "===== ESCOLHER MÊS =====",
            "1. Janeiro", "2. Fevereiro", "3. Março", "4. Abril", "5. Maio", "6. Junho", 
            "7. Julho", "8. Agosto", "9. Setembro", "10. Outubro", "11. Novembro", "12. Dezembro",
            "Informe um dos meses pelo seu número"
        ]
        const monthsNumber: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

        // Get posts from the year passed as input
        const year: number = this.requisitarEntradaNumero("Informe o ano da postagem (formato: yyyy)")
        let postsFromThisYear: Postagem[] = this.redeSocial.repPosts.postagens.filter((i: Postagem) => {
            if (Number(i.data.split("-")[0]) === year) {
                return true
            }
            return false
        })
        
        // Order the posts from first month until last
        postsFromThisYear = postsFromThisYear.sort((i: Postagem, i2: Postagem) => {
            if (this.calendar.obterIdadeData(i.data) < this.calendar.obterIdadeData(i2.data)) {
                return 1
            } else if (this.calendar.obterIdadeData(i.data) > this.calendar.obterIdadeData(i2.data)) {
                return -1
            }
            return 0
        })
        
        // Pick a month to show only from it
        monthsMenu.forEach((i: string) => console.log(i))
        const month: string = this.requisitarEntrada("")

        monthsNumber.forEach((monthId: string) => {
            if (month === monthId) {
                // In here, the posts with all posts from the year are reduced to a specific month
                postsFromThisYear = postsFromThisYear.filter((i: Postagem) => {
                    if (i.data.split("-")[1] === `0${monthId}`) {
                        return true
                    }
                    return false
                })
            }
        })
        
        if (postsFromThisYear.length > 0) {
            const targetMonth: string = this.calendar.converterMesParaTexto(`00-${month}-00`).split(" ")[2]
            console.log(targetMonth)
            console.log(`====== POSTAGENS DO ANO DE ${year} EM ${targetMonth.toUpperCase()} =====`)
            postsFromThisYear.forEach((i: Postagem) => {
                const postShaped: string = `{ nome: ${i.perfil.nome}, data: ${this.calendar.converterMesParaTexto(i.data)}, texto: ${i.texto} }`
                console.log(postShaped)
            })
        } else {
            console.log(new Messages().msg.warn)
            console.log(new Messages().msg.fail.postNotFound)
        }

        this.teclarEnter()
    }

    // Support
    removerPostagensAvancadasSemViews(): void {
        for (let i = 0; i < this.redeSocial.repPosts.postagens.length; i++) {
            const p: Postagem = this.redeSocial.repPosts.postagens[i]
            /*
                Access advanced posts and check if they have 0 views
                They are deleted from the virtual arrays first 
                The change will be reflexed on the text files after algorithm ends
            */
            p instanceof PostagemAvancada && p.visualizacoesRestantes == 0 
            ?  this.redeSocial.repPosts.postagens.splice(i, 1)
            : null
        }
    }

    habilitarPostagemInteracao(): void {
        console.log("===== CONFIGURAÇÕES =====")
        console.log(`1. Simular atividade nas postagens: ${this._triggerOptionA != 0 ? "ATIVADA" : "DESATIVADA"}`)
        
        let option: string
        do {
            option = this.requisitarEntrada("Deseja ativar está funcionalidade?\n0. desativar\n1. ativar\n2. sair")
            if (option === "2") {
                break
            }
        } while (option !== "0" && option !== "1" && option !== "2")
        
        if (option === "0") {
            this.gravarUltimoValorConfigA(option)
            this.triggerOptionA = 0
        }
        else if (option === "1") {
            this.gravarUltimoValorConfigA(option)
            this.triggerOptionA = 1
        } 
    }

    apagarConteudoRepositorio(): void {
        this.postsTxt.content = ""
        this.postsTxt.write()
        console.log(new Messages().msg.success.postsRepositoryErased)
        this.teclarEnter()
    }
}

