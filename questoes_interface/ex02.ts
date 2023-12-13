/*Uma classe concreta que herda de uma classe abstrata precisa implementar todos os métodos abstratos da classe "pai",
logo, Para que a compilação da ClasseConcreta ocorra sem erros, é necessário que a classe concreta forneça uma implementação para o método abstrato imprimaAlgo()
definido na classe abstrata ClasseAbstrata.*/

//EX:

abstract class ClasseAbstrata {
    abstract imprimaAlgo(): void;
  }
  
  class ClasseConcreta extends ClasseAbstrata {
    // Implementação do método abstrato
    imprimaAlgo(): void {
      console.log("Olá");
    }
  
    // Outros métodos podem ser adicionados aqui
  }
  