interface ITributavel1 {
    calcula_tributos(): number;
  }
  
  class Conta1 {
    private _saldo: number;
    private _nome: string;
  
    constructor(saldo: number, nome: string) {
      this._saldo = saldo;
      this._nome = nome;
    }
  
    // Getter para o saldo
    get saldo(): number {
      return this._saldo;
    }
  
    // Setter para o saldo
    set saldo(valor: number) {
      this._saldo = valor;
    }
  
    // Getter para o nome
    get nome(): string {
      return this._nome;
    }
  
    // Setter para o nome
    set nome(nome: string) {
      this._nome = nome;
    }
}

class ContaCorrente1 extends Conta1 implements ITributavel1 {
    constructor(saldo: number, nome: string) {
     
      super(saldo, nome);
    }
  
    calcula_tributos(): number {
      //tributos como 10% do saldo
      return this.saldo * 0.1;
    }
  }

  class SeguroVida1 implements ITributavel1 {
    
    calcula_tributos(): number {
     
      return 50;
    }
  }

  const seguroVida1 = new SeguroVida1();

const tributosSeguroVida = seguroVida1.calcula_tributos();
console.log("Tributos do Seguro de Vida a pagar:", tributosSeguroVida);

const minhaContaCorrente = new ContaCorrente1(2000, "Conta Corrente");
console.log("Saldo inicial:", minhaContaCorrente.saldo);
console.log("Nome da conta:", minhaContaCorrente.nome);

const tributosContaCorrente = minhaContaCorrente.calcula_tributos();
console.log("Tributos a pagar:", tributosContaCorrente);
  