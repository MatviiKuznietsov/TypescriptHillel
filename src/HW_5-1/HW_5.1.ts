/*Створіть класи Circle, Rectangle, Square і Triangle.
У кожного з них є загальнодоступний метод calculateArea.
У кожної фігури є загальнодоступні властивості - колір і назва, які не можна змінювати після створення.
У Square і Rectangle зі свого боку є ще додатковий метод print, який виводить рядок із формулою розрахунку площі */

/*Shape - це щось чого реально не існує
Я не бачу обовʼязку мати calculateArea
RectangleBase також не може мати інстансів*/

abstract class Shape {

    protected constructor(public readonly name: string, public readonly color: string) {}

    abstract calculateArea(): number;
}

type FormulaMap = {
    rectangle: 'S = a * b';
    square: 'S = a²';
};

abstract class RectangleBase extends Shape {
    protected readonly _formula: FormulaMap = {
        rectangle: 'S = a * b',
        square: 'S = a²'
    };

    protected readonly sideA: number;
    protected readonly sideB: number;

    protected constructor(name: string, color: string, sideA: number, sideB: number) {
        super(name, color);
        this.sideA = sideA;
        this.sideB = sideB;
    }

    get formula(): FormulaMap {
        return this._formula;
    }
}


class Rectangle extends RectangleBase {

    constructor(name: string, color: string, sideA: number, sideB: number) {
        super(name, color, sideA, sideB);
    }

    print() {
        console.log(this.formula.rectangle);
    }

    calculateArea(): number {
        return this.sideA*this.sideB;
    }
}

class Square extends RectangleBase {

    constructor(name: string, color: string, side: number) {
        super(name, color, side, side);
    }

    print() {
        console.log(this.formula.square);
    }

    calculateArea(): number {
        return this.sideA*this.sideA;
    }
}

class Circle extends Shape {
    private _radius: number;
    private readonly _pi: number = Math.PI;

    constructor(name: string, color: string, radius: number) {
        super(name, color);
        this._radius = radius;
    }

    calculateArea(): number {
        return this._pi * this._radius ** 2;
    }
}

class Triangle extends Shape {
    private _base: number;
    private _height: number;

    constructor(name: string, color: string, base: number, height: number) {
        super(name, color);
        this._base = base;
        this._height = height;
    }

    calculateArea(): number {
        return (this._base * this._height) / 2;
    }
}

let box1 = new Square('Box1', 'red', 3)
console.log(box1.calculateArea())
box1.print()
let rect1 = new Rectangle('Box1', 'red', 3, 4)
console.log(rect1.calculateArea())
rect1.print()
let circle1 = new Circle('Box1', 'red', 3)
console.log(circle1.calculateArea())
let triangle1 = new Triangle('Box1', 'red', 3, 4)
console.log(triangle1.calculateArea())
