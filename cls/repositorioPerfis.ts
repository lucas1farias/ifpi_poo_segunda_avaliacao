

// Importando exceção necessária
import { PerfilInexistenteError } from "./excecoes";

// Definindo a interface IPerfil que representa a estrutura básica de um perfil
export interface IPerfil {
  id: number;
  nome: string;
  email: string;
}

// Definindo a interface IPerfilCompleto que estende IPerfil e adiciona métodos
export interface IPerfilCompleto extends IPerfil {
  getId(): number;
  getNome(): string;
  getEmail(): string;
}

// Implementação da classe Perfil que implementa a interface IPerfilCompleto
export class Perfil implements IPerfilCompleto {
  constructor(public id: number, public nome: string, public email: string) {}

  // Implementação dos métodos da interface IPerfilCompleto
  getId(): number {
      return this.id;
  }

  getNome(): string {
      return this.nome;
  }

  getEmail(): string {
      return this.email;
  }
}

// Definindo a interface IRepositorioDePerfis que especifica operações em um repositório de perfis
export interface IRepositorioDePerfis {
  incluir(perfil: IPerfilCompleto): void;
  consultar(id?: number, nome?: string, email?: string): IPerfilCompleto | null;
  tamanhoRepositorio(): number;
  verRepositorioPerfis(): void;
  atualizarUltimoIdPerfil(): void;
}

// Implementação da classe RepositorioDePerfis que implementa a interface IRepositorioDePerfis
export class RepositorioDePerfis implements IRepositorioDePerfis {
    // Use IPerfilCompleto para incluir métodos getId(), getNome(), getEmail()
    private _perfis: IPerfilCompleto[]; 
    lastId: number;

    constructor(perfis: IPerfilCompleto[]) {
        this._perfis = perfis;
        this.lastId = 0;
    }

  // Métodos da interface IRepositorioDePerfis
  get perfis(): IPerfilCompleto[] {
      return this._perfis;
  }

  incluir(perfil: IPerfilCompleto): void {
      this.perfis.push(perfil);
  }

  consultar(id?: number, nome?: string, email?: string): IPerfilCompleto | null {
      const perfilEncontrado = this.perfis.find(perfil => perfil.getId() === id)
      if (!perfilEncontrado) {
          throw new PerfilInexistenteError("ERRO: Perfil não encontrado... [repositorioPerfis.ts/consultar]")
      }
      return perfilEncontrado || null
  }

  tamanhoRepositorio(): number {
      return this.perfis.length;
  }

  verRepositorioPerfis(): void {
      console.log("\n[");
      for (let i = 0; i < this.tamanhoRepositorio(); i++) {
          const thisProfile = this.perfis[i];
          console.log(thisProfile);
      }
      console.log("]");
  }

  atualizarUltimoIdPerfil(): void {
      this.lastId++;
  }
}

