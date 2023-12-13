



export class AplicacaoError extends Error {
    constructor(message: string) {
        super(message);
    }
}

/* ================================================================================================ */

export class AnoSemSentidoError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class MesSemSentidoError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class DiaBisextoSemSentidoError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class DiaFevereiroSemSentidoError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class DiaSemSentidoError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class DataIncompletaError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class EntradaEmailSemFinalError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class EntradaMalFormatadaError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class EntradaPequenaError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class EntradaSemArrobaError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class EntradaVaziaError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class PerfilExistenteError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class PerfilInexistenteError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class NumeroInvalidoError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class NomeInvalidoError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class EmailInvalidoError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class PostagemVaziaError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class PostagemExcedeTamanhoError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class HashtagInapropriadaError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class HashtagGiganteError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class HashtagInexistenteError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class HashtagPequenaError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class HashtagPossuiAlgumaLetraError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class HashtagRepetidaError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class PostagemInexistenteError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class PostagemSemSentidoError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class PostagemRegularError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class PostagemVencidaError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class HashtagSemSentidoError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class HashtagTemSimboloError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class HashtagVaziaError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class PerfilSemPostagemError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class PerfilSemPostagemAvancadaError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class PerfilSemPostagemRegularError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class PostagemSemHashtagAlvoError extends AplicacaoError {
    constructor(message: string) {
        super(message)
    }
}

export class Excecao {

    percorrer(sentence: string) {
        const stringArray: string[] = []
        for (let i = 0; i < sentence.length; i++) {
            stringArray.push(sentence[i])
        }
        return stringArray
    }
    
    entradaSemEspacos(inputData: string): boolean {
        return !this.percorrer(inputData).includes(" ") 
    }

    entradaNaoNegativa(inputData: number): boolean {
        return Number(inputData) > 0
    }

    entradaNaoVazia(inputData: string): boolean {
        return inputData !== ""
    }

    charEhNumero(item: string): boolean {
        const n: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        for (let i = 0; i < n.length; i++) {
            if (n[i] === Number(item)) {
                return true
            }
        }
        return false
    }
    
    entradaEhApenasNumero(inputData: string): boolean {
        for (let i = 0; i <= inputData.length; i++) {
            if (!this.charEhNumero(inputData[i])) {
                return false
            }
            console.log('--o', this.charEhNumero(inputData[i]), inputData, inputData[i])
        }
        return true
    }

    // Tratamentos p/ textos e email (exceção: entradaSomenteLetras)
    entradaSomenteEspaco(inputData: string): boolean {
        return inputData === " "
    }
    
    verificarEntrada(inputData: string, isEmail: boolean): void {
        if (inputData.length === 0) {
            throw new EntradaVaziaError("\nERRO: não é permitido dados de entrada vazios...")
        }
        if (inputData.length < 3) {
            throw new EntradaPequenaError("\nERRO: texto possui menos de 3 caracteres...")
        }
        if (!isEmail) {
            this.entradaPossuiAlgumaLetra(inputData)
        }
    }

    verificarEntradaEmail(inputData: string): void {
        this.verificarEntrada(inputData, true)

        if (!inputData.includes("@")) {
            throw new EntradaSemArrobaError("\nERRO: texto de email deve ter um arroba...")
        }

        if (!inputData.includes(".com")) {
            throw new EntradaEmailSemFinalError("\nERRO: texto de email deve terminar com: .com")
        }
    }

    entradaPossuiAlgumaLetra(inputData: string): void {
        for (let i = 0; i < inputData.length; i++) {
            const letter = inputData[i].charCodeAt(0)
            if (letter < 65 || letter > 122) {
                throw new EntradaMalFormatadaError("\nERRO: texto possui caracteres inelegíveis...")
            }
        }
    }
    
    /*
    numeroInvalido(inputData: number): void {
        console.log("A", this.entradaNaoNegativa(inputData))
        console.log("B", this.entradaNaoVazia(inputData.toString()))
        console.log("C", this.entradaSemEspacos(inputData.toString()))
        console.log("D", this.entradaEhApenasNumero(inputData.toString()))
        if (
            !this.entradaNaoNegativa(inputData) ||
            !this.entradaNaoVazia(inputData.toString()) ||
            !this.entradaSemEspacos(inputData.toString()) ||
            !this.entradaEhApenasNumero(inputData.toString()) 
        ) {
            throw new NumeroInvalidoError("ERRO: Número inválido...")
        }
    }
    */

    excecao(error: any) {
        if (
            // Data
            error instanceof AnoSemSentidoError ||
            error instanceof MesSemSentidoError ||
            error instanceof DiaBisextoSemSentidoError ||
            error instanceof DiaFevereiroSemSentidoError ||
            error instanceof DiaSemSentidoError ||
            error instanceof DataIncompletaError ||

            // Entrada
            error instanceof EntradaVaziaError ||
            error instanceof EntradaEmailSemFinalError ||
            error instanceof EntradaMalFormatadaError || 
            error instanceof EntradaPequenaError || 
            error instanceof EntradaSemArrobaError ||

            // Perfil
            error instanceof PerfilExistenteError ||
            error instanceof PerfilExistenteError ||
            error instanceof PerfilInexistenteError || 
            error instanceof NumeroInvalidoError ||
            error instanceof NomeInvalidoError ||
            error instanceof EmailInvalidoError ||
            error instanceof PerfilSemPostagemRegularError ||
            error instanceof PerfilSemPostagemAvancadaError ||
            error instanceof PerfilSemPostagemError || 
            
            // Hashtag
            error instanceof HashtagInapropriadaError || 
            error instanceof HashtagInexistenteError ||
            error instanceof HashtagRepetidaError ||
            error instanceof  HashtagGiganteError || 
            error instanceof  HashtagPequenaError || 
    
            // Postagem
            error instanceof PostagemVaziaError ||
            error instanceof PostagemExcedeTamanhoError ||
            error instanceof PostagemSemSentidoError ||
            error instanceof PostagemInexistenteError ||
            error instanceof PostagemRegularError ||
            error instanceof PostagemVencidaError ||
            error instanceof PostagemSemHashtagAlvoError
        ) {
            console.log(error.message)
        }
    }
}

