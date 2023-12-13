



export class Messages {
    msg

    constructor() {
        this.msg = {
            warn: "\n===== AVISO =====",
            info: {
                postHighlight: "===== POSTAGEM  =====",
                postsFound: "===== POSTAGENS ENCONTRADAS ====="
            },
            operations: {
                includeProfile: "===== OPERAÇÃO 1: INCLUSÃO DE PERFIL =====",
                searchProfile: "===== OPERAÇÃO 2: PROCURAR PERFIL =====",
                includePost: "===== OPERAÇÃO 3: INCLUSÃO DE POSTAGEM =====",
                queryPost: "===== OPERAÇÃO 4: CONSULTA DE POSTAGEM =====",
                likePost: "===== OPERAÇÃO 5: CURTIR POSTAGEM =====",
                unlikePost: "===== OPERAÇÃO 6: DESCURTIR POSTAGEM =====",
                lessView: "===== OPERAÇÃO 7: DECREMENTAR VIEWS =====",
                showPostsByProfile: "===== OPERAÇÃO 8: EXIBIR POSTAGENS POR PERFIL =====",
                showPostsByHashtag: "===== OPERAÇÃO 9: EXIBIR POSTAGENS POR HASHTAG =====",
                showProfileRepository: "===== OPERAÇÃO 10: VER BANCO DE PERFIS =====",
                showPostsRepository: "===== OPERAÇÃO 11: VER BANCO DE POSTAGENS =====",
                queryMostPopularPosts: "===== OPERAÇÃO 12: CONSULTAR POSTS MAIS POPULARES ======",
                queryMostPopularHashtags: "===== OPERAÇÃO 13: CONSULTAR HASHTAGS MAIS POPULARES =====",
                postHashtagAppend: "===== OPERAÇÃO 14: ADIÇÃO DE HASHTAG EM POSTAGEM EXISTENTE =====",
                postRemoval: "===== OPERAÇÃO 15: REMOÇÃO DE POSTAGEM =====",
                postContentEdit: "===== OPERAÇÃO 16: ALTERAÇÃO DE CONTEÚDO DE POSTAGEM =====",
                postQueryComplete: "===== OPERAÇÃO 17: PESQUISAR POSTAGENS (MÊS E ANO) ====="
            },
            success: {
                appClosed: "Aplicação encerrada!\n",
                hashtagAdded: "Hashtag adicionada!\n",
                postLiked: "Postagem curtida! aperte ENTER e verifique.\n",
                postDisliked: "Postagem descurtida! aperte ENTER e verifique.\n",
                profileCreated: "Perfil criado!\n",
                postCreated: "Postagem criada!\n",
                postRemoved: "Postagem removida!\n",
                postContentChanged: "Conteúdo da postagem alterada!\n",
                postsRepositoryErased: "Conteúdo do repositório das postagens limpado!\n"
            },
            fail: {
                invalidOptionsMainSwitch: "Opções permitidas: 1 a 11!\n",
                invalidOptionSwitchPostInclusion: "Opções válidas: 1 ou 2\n",
                hashtagExists: "Hashtag repetida detectada!\n",
                postNotCreated: "Postagem não criada!\n",
                postNotFound: "Postagem não encontrada!\n",
                postIsRegular: "Postagens comuns não recebem hashtag\n",
                profileNotCreated: "Perfil não criado!\n"
            },
            inputs: {
                pressEnter: "\n>>> Pressione ENTER <<<",
                askOperationValue: "Digite o valor da operação",
                askPersonName: "Nome da pessoa:",
                askPersonEmail: "Email da pessoa:",
                askProfileId: "Informe o id do perfil",
                askPostType: "Informe o tipo de postagem:\n1. regular\n2. avançada",
                askPostContent: "Texto da postagem",
                askDateAsTutorial: "Informe ano, mês e o dia da postagem (ex: 2023-02-20)",
                askPostViewsRange: "Defina uma qtd. limite de views p/ a postagem",
                askHashtagsAmount: "Informe a qtd. de hashtags",
                askHashtagContent: "Informe a hashtag dessa postagem (incluir #)",
                askHashtagContentNoHash: "Informe a hashtag dessa postagem (não incluir #)",
                askPostId: "Informe o id da postagem dessa postagem",
                askSearchingMethod: "Informe sua forma de procura:\n1. id de perfil\n2. hashtag",
                askHashtagAmountForRank: "Informe a qtd. de hashtags para fazer o rank",
                askNewPostText: "Informe o novo texto desta postagem",
                choosePostId: "Escolha e informe o id da postagem a receber nova hashtag",
            },
            tutorial: {
                askWhichId: "\nEscolha entre os id aquele que deseja add uma hashtag: ",
                chooseAdvancedPost: "OBS: Observe as postagens e escolha a que for avançada"
            }
        }
    }
}

