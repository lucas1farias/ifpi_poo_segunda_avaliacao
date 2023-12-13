



export interface IPerfil {
    id: number
    nome: string
    email: string
}

// Interface que estende IPerfil para fornecer métodos adicionais
export interface IPerfilCompleto extends IPerfil {
    getId(): number
    getNome(): string
    getEmail(): string
}

// Implementação da classe Perfil que implementa a interface IPerfilCompleto
export class Perfil implements IPerfilCompleto {
    constructor(
      public id: number, public nome: string, public email: string
    ) {
      
    }

    // Implementação dos métodos da interface IPerfilCompleto
    getId(): number {
        return this.id
    }

    getNome(): string {
        return this.nome
    }

    getEmail(): string {
        return this.email
    }
}

