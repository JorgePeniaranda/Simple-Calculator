import { InternalError } from "../errors/calculator-errors.mjs";

const transcriptions = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷',
  '=': '=',
  '.': ',',
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '(': '(',
  '*(': '(',
  ')': ')',
  ')*': ')',
  '**': '^',
  '^': '^',
};

/**
 * Convert equation to input text
 * @param {string} equation
 * @returns {string}
 */
export function fromCalculatorToInputText (equation) {
  let result = equation; 

  // Replace symbols with double symbols
  result = result.replace("**", '^'); // Replace ** with ^
  result = result.replace("*(", '('); // Replace *( with (
  result = result.replace(")*", ')'); // Replace )* with )

  return result.replace(/./g, (char) => {
    if(transcriptions[char] === undefined){
      throw new InternalError('Character not found in transcriptions');
    }

    return transcriptions[char] || char;
  })
}
