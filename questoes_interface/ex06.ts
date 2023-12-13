abstract class Funcionario {
  constructor(protected salario: number) {}

  abstract getBonificacao(): number;
}

class Gerente extends Funcionario {
  getBonificacao(): number {
    return this.salario * 0.4;
  }
}

class Diretor extends Funcionario {
  getBonificacao(): number {
    return this.salario * 0.6;
  }
}

class Presidente extends Funcionario {
  getBonificacao(): number {
    return this.salario + 1000;
  }
}


const gerente = new Gerente(5000);
const diretor = new Diretor(8000);
const presidente = new Presidente(12000);

console.log("Bonificação do Gerente:", gerente.getBonificacao());
console.log("Bonificação do Diretor:", diretor.getBonificacao());
console.log("Bonificação do Presidente:", presidente.getBonificacao());
