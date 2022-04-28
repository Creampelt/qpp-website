export default class Color {
  private readonly red: number;
  private readonly green: number;
  private readonly blue: number;

  public constructor(r: number, g: number, b: number) {
    this.red = r;
    this.green = g;
    this.blue = b;
  }

  public getRed() {
    return this.red;
  }

  public getGreen() {
    return this.green;
  }

  public getBlue() {
    return this.blue;
  }

  public toRGB() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  public toHex() {
    return `#${this.red.toString(16)}${this.green.toString(16)}${this.blue.toString(16)}`;
  }

  private static colorFromThreshold(o: number, start: number, end: number): number {
    if (o > end) o -= 1;
    const middle = (end - start) / 2;
    return Math.max(0, 255 - Math.abs(o - start - middle) * 255 / middle);
  };

  public static colorFromOffset(o: number): Color {
    console.log("o", o);
    return new Color(
      Color.colorFromThreshold(o, -1/3, 1/3),
      Color.colorFromThreshold(o, 0, 2/3),
      Color.colorFromThreshold(o, 1/3, 1)
    );
  }
}