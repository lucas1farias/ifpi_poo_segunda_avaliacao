interface FiguraGeometrica {
  calcularArea(): number;
  calcularPerimetro(): number;
}

interface IComparavel {
    comparar(forma: FiguraGeometrica): number;
  }

class Quadrado implements FiguraGeometrica {
  private lado: number;

  constructor(lado: number) {
    this.lado = lado;
  }

  comparar(forma: FiguraGeometrica): number {
    if (this.calcularArea() < forma.calcularArea()) {
      return -1; //area menor
    } else if (this.calcularArea() === forma.calcularArea()) {
      return 0;//area igual
    } else {
      return 1;//area maior
    }
  }

  calcularArea(): number {
    return this.lado * this.lado;
  }

  calcularPerimetro(): number {
    return 4 * this.lado;
  }
}

class Triangulo implements FiguraGeometrica {
  private base: number;
  private altura: number;

  constructor(base: number, altura: number) {
    this.base = base;
    this.altura = altura;
  }
 
  
  comparar(forma: FiguraGeometrica): number {
    if (this.calcularArea() < forma.calcularArea()) {
      return -1;
    } else if (this.calcularArea() === forma.calcularArea()) {
      return 0;
    } else {
      return 1;
    }
  }

  calcularArea(): number {
    return (this.base * this.altura) / 2;
  }

  calcularPerimetro(): number {
    return this.base + this.altura + Math.sqrt(this.base ** 2 + this.altura ** 2);
  }
}

class Retangulo implements FiguraGeometrica {
  private base: number;
  private altura: number;

  constructor(base: number, altura: number) {
    this.base = base;
    this.altura = altura;
  }

  comparar(forma: FiguraGeometrica): number {
    if (this.calcularArea() < forma.calcularArea()) {
      return -1;
    } else if (this.calcularArea() === forma.calcularArea()) {
      return 0;
    } else {
      return 1;
    }
  }

  calcularArea(): number {
    return this.base * this.altura;
  }

  calcularPerimetro(): number {
    return 2 * (this.base + this.altura);
  }
}


// Exemplo de uso
const quadrado: FiguraGeometrica = new Quadrado(5);
console.log("Área do quadrado:", quadrado.calcularArea());
console.log("Perímetro do quadrado:", quadrado.calcularPerimetro());

const triangulo: FiguraGeometrica = new Triangulo(3, 4);
console.log("Área do triângulo:", triangulo.calcularArea());
console.log("Perímetro do triângulo:", triangulo.calcularPerimetro());

const retangulo: Retangulo = new Retangulo(5, 8);
console.log(`Área do retângulo: ${retangulo.calcularArea()}`);
console.log(`Perímetro do retângulo: ${retangulo.calcularPerimetro()}`);

// Testes de Comparação questão 09
const forma1: FiguraGeometrica & IComparavel = new Quadrado(5);
const forma2: FiguraGeometrica & IComparavel = new Triangulo(3, 4);
const forma3: FiguraGeometrica & IComparavel = new Retangulo(5, 8);

console.log("Comparação entre Quadrado e Triângulo:", forma1.comparar(forma2));
console.log("Comparação entre Triângulo e Retângulo:", forma2.comparar(forma3));
console.log("Comparação entre Quadrado e Retângulo:", forma1.comparar(forma3));
