/*Створіть класи Circle, Rectangle, Square і Triangle.
У кожного з них є загальнодоступний метод calculateArea.
У кожної фігури є загальнодоступні властивості - колір і назва, які не можна змінювати після створення.
У Square і Rectangle зі свого боку є ще додатковий метод print, який виводить рядок із формулою розрахунку площі */

class Shape {
    private _name: string;
    private _color: string;

    constructor(name: string, color: string) {
        this._name = name;
        this._color = color;
    }


    get name(): string {
        return this._name;
    }

    get color(): string {
        return this._color;
    }
}

type FormulaMap = {
    rectangle: 'S = a * b';
    square: 'S = a²';
};

class RectangleBase extends Shape {
    protected readonly _formula: FormulaMap = {
        rectangle: 'S = a * b',
        square: 'S = a²'
    };
    private _sideA: number;
    private _sideB: number;

    constructor(name: string, color: string, sideA: number, sideB: number) {
        super(name, color);
        this._sideA = sideA;
        this._sideB = sideB;
    }

    get formula(): FormulaMap {
        return this._formula;
    }

    calculateArea(): number {
        return this._sideA * this._sideB;
    }
}


class Rectangle extends RectangleBase {

    constructor(name: string, color: string, sideA: number, sideB: number) {
        super(name, color, sideA, sideB);
    }

    print() {
        console.log(this.formula.rectangle);
    }
}

class Square extends RectangleBase {

    constructor(name: string, color: string, side: number) {
        super(name, color, side, side);
    }

    print() {
        console.log(this.formula.square);
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
