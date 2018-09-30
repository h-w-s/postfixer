const ops = { '+': 1, '-': 1, '*': 2, '/': 2 };
const validOps = ['(', ')', '+', '-', '*', '/'];
const alphaNumRegex = /([0-9\.]+[a-z]+[a-z0-9]*|[a-z]+[0-9\.]+[a-z0-9]*|[a-zA-Z]+|[0-9\.]+)/gi

let checkForUnary = (currOp, prevOp) => {
	if (currOp == '-') {
		if (!prevOp) return true;
		if (validOps.includes(prevOp) && prevOp !== ')') return true;
	} else return false;
}


let infixStrToArr = (infixStr) => {
	const str = infixStr.replace(/\s+/g, ''); // remove whitespaces
	let operands = str.match(alphaNumRegex);
	let start = 0;
	let arr = [];
	while (start < str.length) {
		let char = null;
		let unaryFound = false;
		if (validOps.includes(str[start])) {
			if (checkForUnary(str[start], str[start - 1])) {
				char = operands[0];
				operands = operands.slice(1); // deque operand which succeeds the unary
				unaryFound = true;
			}
			else char = str[start];
		} else {
			char = operands[0];
			operands = operands.slice(1); // deque operand which was found
		}
		start += char.length;
		// console.log("char", char);
		arr.push(char);
		if (unaryFound) {
			start += 1; //this is to account for the unary sign
			arr.push('*'); // this will conver the unary 
			arr.push('-1'); // to a binary exp
		}
	}
	return arr;
}

  /**
 * Converts <tt>infix string</tt> to postfix array using Shunting yard algorithm.
 * @param {infix} string The infix to convert.
 * @returns {postfix} array
 * @link http://web.archive.org/web/20130702040830/http://en.literateprograms.org/Shunting_yard_algorithm_(Python)
 */

let yard = (infix) => {
	let peek = (a) => a[a.length - 1];
	let stack = [];
	const infixArr = infixStrToArr(infix);
	console.log("infix", infixArr.toString());
	return infixArr.reduce((output, token) => {
		if (!validOps.includes(token)) {
			// operand found
			output.push(token);
		}

		if (token in ops) {
			while (peek(stack) in ops && ops[token] <= ops[peek(stack)])
				output.push(stack.pop());
			stack.push(token);
		}

		if (token == '(') {
			stack.push(token);
		}

		if (token == ')') {
			while (peek(stack) != '(')
				output.push(stack.pop());
			stack.pop();
		}

		return output;
	}, [])
		.concat(stack.reverse())
};

/**
Sample infix expressions 
rtnAsts+4*6
(-mrktCapf/52wHigh)-5
rtnAsts-pr1d+45
infixToPostfix("A*(B+C*D)+ E")
**/

module.exports = function (infixStr) {
	if (typeof infixStr == 'string' && infixStr.length) {
		var str = infixStr.replace(/\s+/g, ''); // remove whitespaces
		var filters = str.match(alphaNumRegex);
		return {
			postfix: yard(str),
			filters: filters
		};
	} else return null;
};



