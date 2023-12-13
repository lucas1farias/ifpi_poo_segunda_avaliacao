interface ITributavel {
    calcularTributos(): number
  }
  
  class Conta implements ITributavel {
    constructor(private saldo: number, private nome: string) {}
  
    calcularTributos(): number {
      return this.saldo * 0.1 // 10% do saldo
    }
  }
  
  class SeguroDeVida implements ITributavel {

    calcularTributos(): number {
    
      return 50 // Valor fixo de 50 reais
    }
  }
  
  class AuditoriaInterna {
    tributaveis: ITributavel[] = []
  
    // Método para adicionar Tributaveis ao array
    adicionar(tributavel: ITributavel): void {
      this.tributaveis.push(tributavel)
    }
  
    // Método para calcular tributos de todos os Tributaveis
    calcularTributos(): number {
      let totalTributos = 0
      for (const tributavel of this.tributaveis) {
        totalTributos += tributavel.calcularTributos()
      }
      return totalTributos
    }
  }
  
  const auditoria = new AuditoriaInterna()
  
  // Instanciando várias classes ContaCorrente e SeguroDeVida
  const conta1 = new Conta(1000, 'Conta1')
  const conta2 = new Conta(2000, 'Conta2')
  const seguroVida = new SeguroDeVida()
  
  // Adicionando as instâncias à classe AuditoriaInterna
  auditoria.adicionar(conta1)
  auditoria.adicionar(conta2)
  auditoria.adicionar(seguroVida)
  
  const totalTributos = auditoria.calcularTributos()
  console.log('Total de tributos a pagar:', totalTributos)
  