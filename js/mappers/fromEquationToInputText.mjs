import { InternalError } from "../errors/calculator-errors.mjs";
import { DOUBLE_CALCULATOR_TRANSCRIPTIONS, SIMPLE_CALCULATOR_TRANSCRIPTIONS } from "../data/calculator_transcriptions.mjs";

/**
 * Convert equation to input text
 * @param {string} equation
 * @returns {string}
 */
export function fromCalculatorToInputText (equation) {
  if(typeof equation !== 'string'){
    throw new InternalError('Equation is not a string');
  }

  let result = equation; 

  // Replace symbols with double symbols
  for(const [key, value] of Object.entries(DOUBLE_CALCULATOR_TRANSCRIPTIONS)){
    result = result.replace(key, value);
  }

  // Replace symbols with simple symbols
  for(const [key, value] of Object.entries(SIMPLE_CALCULATOR_TRANSCRIPTIONS)){
    result = result.replace(key, value);
  }

  return result;
}
