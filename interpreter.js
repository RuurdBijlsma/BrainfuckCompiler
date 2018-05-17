brainfuck = input => {
    let cells = { 0: 0 };
    let index = 0;
    let output = '';
    let actions = {
        '>': () => cells[++index] = cells[index] || 0,
        '<': () => cells[--index] = cells[index] || 0,
        '+': () => cells[index]++,
        '-': () => cells[index]--,
        '.': () => output += String.fromCharCode(cells[index]),
        ',': () => cells[index] = prompt().charCodeAt(),
        '[': (input, i) => {
            if (!cells[index]) {
                let ignores = 0;
                for (let n = i + 1; n < input.length; n++) {
                    if (input[n] === '[')
                        ignores++;
                    if (input[n] === ']' && ignores-- === 0)
                        return n;
                }
            }
        },
        ']': (input, i) => {
            if (cells[index]) {
                let ignores = 0;
                for (let n = i - 1; n >= 0; n--) {
                    if (input[n] === ']')
                        ignores++;
                    if (input[n] === '[' && ignores-- === 0)
                        return n;
                }
            }
        }
    }

    input = input.split('').filter(char => actions[char]).join('');

    let iterationsLeft = 10000;
    for (let i = 0; i < input.length; i++) {
        let char = input[i];
        if (!actions[char])
            continue;

        let newIndex = actions[char](input, i);
        if ((char === ']' || char === '[') && newIndex) {
            i = newIndex;
        }

        if (iterationsLeft-- <= 0) {
            break;
        }
    }
    return output;
}

brainfuck(`++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.`)
