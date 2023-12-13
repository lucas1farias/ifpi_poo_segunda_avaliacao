

// Importando a interface IPerfil do arquivo perfil.ts
import { IPerfil } from "./perfil";

// Definindo a interface IPostagem que descreve a estrutura de uma postagem
export interface IPostagem {
    id: number;
    texto: string;
    curtidas: number;
    descurtidas: number;
    data: string;
    perfil: IPerfil;
}

// Definindo a interface IPopularidade que descreve métodos relacionados à popularidade
export interface IPopularidade {
    curtir(): void;
    descurtir(): void;
    ehPopular(): boolean;
    ehPopularPorcentagem(): number;
}

// Implementação da classe Postagem que implementa as interfaces IPostagem e IPopularidade
export class Postagem implements IPostagem, IPopularidade {
    // Propriedades privadas da classe
    private _id: number;
    private _texto: string;
    private _curtidas: number;
    private _descurtidas: number;
    private _data: string;
    private _perfil: IPerfil;

    // Construtor da classe que inicializa as propriedades
    constructor(id: number, texto: string, curtidas: number, descurtidas: number, data: string, perfil: IPerfil) {
        this._id = id;
        this._texto = texto;
        this._curtidas = curtidas;
        this._descurtidas = descurtidas;
        this._data = data;
        this._perfil = perfil;
    } 

    // Métodos de acesso para as propriedades
    get id(): number {
        return this._id;
    }

    get texto(): string {
        return this._texto;
    }

    set texto(newContent: string) {
        this._texto = newContent;
    }

    get curtidas(): number {
        return this._curtidas;
    }

    set curtidas(newValue: number) {
        this._curtidas = newValue;
    }

    get descurtidas(): number {
        return this._descurtidas;
    }

    set descurtidas(newValue: number) {
        this._descurtidas = newValue;
    }

    get data(): string {
        return this._data;
    }

    get perfil(): IPerfil {
        return this._perfil;
    }

    // Métodos da interface IPopularidade
    curtir(): void {
        this.curtidas++;
    }

    descurtir(): void {
        this.descurtidas++;
    }

    ehPopular(): boolean {
        if (this.curtidas >= this.descurtidas) {
            const operation: number = ((this._curtidas - this.descurtidas) / this.descurtidas) * 100;
            return operation >= 50;
        }
        return false;
    }

    ehPopularPorcentagem(): number {
        if (this.curtidas >= this.descurtidas) {
            const operation: number = ((this._curtidas - this.descurtidas) / this.descurtidas) * 100;
            return operation;
        }
        return 0;
    }
}

