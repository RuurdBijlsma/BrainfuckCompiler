compile = input => {
	let result = `
() => {
    let cells = {0:0};
    let index = 0;
    let output = '';
	let shift = delta => {
		index += delta;
		cells[index] = cells[index] || 0;
	};
	let add = delta => {
		cells[index] += delta;
	};
	let assign = value => {
		cells[index] = value;
	}
`;

	let allowedTokens = '<>+-.,[]';

	let actions = {
        '.': () => `output += String.fromCharCode(cells[index])`,
        ',': () => `cells[index] = prompt().charCodeAt()`,
        '[': () => `while(cells[index]){`,
        ']': () => '}',
		'0': () => 'assign(0)',
    }

	input = input.split('').filter(char => allowedTokens.includes(char)).join('');
	input = input.replace(/\[\-\]/g, '0');

	let indentation = 1;
	for(let i = 0; i < input.length; i++){
		if(input[i] === ']')
			indentation--;
		let line = '\t'.repeat(indentation);
		if(input[i] === '[')
			indentation++;

		if(input[i] === '+' || input[i] === '-'){

            let addition = 0;
            while(input[i] === '+' || input[i] === '-'){
                if(input[i] === '+')
                    addition++;
                if(input[i] === '-')
                    addition--;
                i++;
            }

			line += `add(${addition})`;

			i--;

        }
		else if(input[i] === '<' || input[i] === '>'){

            let shift = 0;
            while(input[i] === '<' || input[i] === '>'){
                if(input[i] === '>')
                    shift++;
                if(input[i] === '<')
                    shift--;
                i++;
            }

			line += `shift(${shift})`;

			i--;

        } else {
			line += actions[input[i]]();
        }

		result += line + '\n';
    }

	result += `
    return output;
}
	`;

	return eval(result);
}

p = compile(`++++++++++[>++++++++++<-]>>++++++++++>->>>>>>>>>>>>>>>>-->+++++++[->++
++++++++<]>[->+>+>+>+<<<<]+++>>+++>>>++++++++[-<++++<++++<++++>>>]++++
+[-<++++<++++>>]>>-->++++++[->+++++++++++<]>[->+>+>+>+<<<<]+++++>>+>++
++++>++++++>++++++++[-<++++<++++<++++>>>]++++++[-<+++<+++<+++>>>]>>-->
---+[-<+]-<[+[->+]-<<->>>+>[-]++[-->++]-->+++[---++[--<++]---->>-<+>[+
+++[----<++++]--[>]++[-->++]--<]>++[--+[-<+]->>[-]+++++[---->++++]-->[
->+<]>>[.>]++[-->++]]-->+++]---+[-<+]->>-[+>>>+[-<+]->>>++++++++++<<[-
>+>-[>+>>]>[+[-<+>]>+>>]<<<<<<]>>[-]>>>++++++++++<[->-[>+>>]>[+[-<+>]>
+>>]<<<<<]>[-]>>[>++++++[-<++++++++>]<.<<+>+>[-]]<[<[->-<]++++++[->+++
+++++<]>.[-]]<<++++++[-<++++++++>]<.[-]<<[-<+>]+[-<+]->>]+[-]<<<.>>>+[
-<+]-<<]`);

p();
