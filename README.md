# BrainfuckCompiler
A script to compile Brainfuck to Javascript and a script to interpret Brainfuck

## Usage

### Interpreter.js

```brainfuck(`++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.`);```

This will interpret the brainfuck code and log its output, in this case it's `Hello world!`.

### Compiler.js

```compile(`++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.`);```

This will produce the following Javascript code:

```js
input => {
    let cells = { 0: 0 };
    let index = 0;
    let output = '';

    let shift = delta => {
        index += delta;
        cells[index] = cells[index] || 0;
    };

    let add = delta => {
        cells[index] += delta;
    };

    add(8)
    while (cells[index]) {
        shift(1)
        add(4)
        while (cells[index]) {
            shift(1)
            add(2)
            shift(1)
            add(3)
            shift(1)
            add(3)
            shift(1)
            add(1)
            shift(-4)
            add(-1)
        }
        shift(1)
        add(1)
        shift(1)
        add(1)
        shift(1)
        add(-1)
        shift(2)
        add(1)
        while (cells[index]) {
            shift(-1)
        }
        shift(-1)
        add(-1)
    }
    shift(2)
    output += String.fromCharCode(cells[index])
    shift(1)
    add(-3)
    output += String.fromCharCode(cells[index])
    add(7)
    output += String.fromCharCode(cells[index])
    output += String.fromCharCode(cells[index])
    add(3)
    output += String.fromCharCode(cells[index])
    shift(2)
    output += String.fromCharCode(cells[index])
    shift(-1)
    add(-1)
    output += String.fromCharCode(cells[index])
    shift(-1)
    output += String.fromCharCode(cells[index])
    add(3)
    output += String.fromCharCode(cells[index])
    add(-6)
    output += String.fromCharCode(cells[index])
    add(-8)
    output += String.fromCharCode(cells[index])
    shift(2)
    add(1)
    output += String.fromCharCode(cells[index])
    shift(1)
    add(2)
    output += String.fromCharCode(cells[index])

    console.log(output);
}
```
