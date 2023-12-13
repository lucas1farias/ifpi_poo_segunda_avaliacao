interface FiguraGeometrica1 {
  calcularArea(): number;
  calcularPerimetro(): number;
}

class Quadrado1 implements FiguraGeometrica1 {
  private lado: number;

  constructor(lado: number) {
    this.lado = lado;
  }

  calcularArea(): number {
    return this.lado * this.lado;
  }

  calcularPerimetro(): number {
    return 4 * this.lado;
  }
}

class Triangulo1 implements FiguraGeometrica1 {
  private base: number;
  private altura: number;

  constructor(base: number, altura: number) {
    this.base = base;
    this.altura = altura;
  }

  calcularArea(): number {
    return (this.base * this.altura) / 2;
  }

  calcularPerimetro(): number {
    return this.base + this.altura + Math.sqrt(this.base ** 2 + this.altura ** 2);
  }
}

class Retangulo1 implements FiguraGeometrica1 {
  private base: number;
  private altura: number;

  constructor(base: number, altura: number) {
    this.base = base;
    this.altura = altura;
  }

  calcularArea(): number {
    return this.base * this.altura;
  }

  calcularPerimetro(): number {
    return 2 * (this.base + this.altura);
  }
}


// Exemplo de uso
const quadrado1: FiguraGeometrica1 = new Quadrado1(5);
console.log("Área do quadrado:", quadrado1.calcularArea());
console.log("Perímetro do quadrado:", quadrado1.calcularPerimetro());

const triangulo1: FiguraGeometrica1 = new Triangulo1(3, 4);
console.log("Área do triângulo:", triangulo1.calcularArea());
console.log("Perímetro do triângulo:", triangulo1.calcularPerimetro());

const retangulo1: Retangulo1 = new Retangulo1(5, 8);
console.log(`Área do retângulo: ${retangulo1.calcularArea()}`);
console.log(`Perímetro do retângulo: ${retangulo1.calcularPerimetro()}`);
