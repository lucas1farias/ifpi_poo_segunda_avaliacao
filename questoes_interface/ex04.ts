/*abstract class FiguraGeometrica {
  abstract calcularArea1(): number;
  abstract calcularPerimetro1(): number;
}

class Quadrado1 extends FiguraGeometrica {
  constructor(private lado: number) {
    super();
  }

  calcularArea1(): number {
    return this.lado * this.lado;
  }

  calcularPerimetro1(): number {
    return 4 * this.lado;
  }
}

class Triangulo1 extends FiguraGeometrica {
  constructor(private base: number, private altura: number) {
    super();
  }

  calcularArea1(): number {
    return (this.base * this.altura) / 2;
  }

  calcularPerimetro1(): number {
    //Estou assumindo que é um triângulo retângulo e usando o teorema de Pitágoras
    const ladoHipotenusa = Math.sqrt(this.base ** 2 + this.altura ** 2);
    return this.base + this.altura + ladoHipotenusa;
  }
}

class Retangulo extends FiguraGeometrica {
  constructor(private base: number, private altura: number) {
    super();
  }

  calcularArea1(): number {
    return this.base * this.altura;
  }

  calcularPerimetro1(): number {
    return 2 * (this.base + this.altura);
  }
}*/
