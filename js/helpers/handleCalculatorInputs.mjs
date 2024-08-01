import { InternalError } from '../errors/calculator-errors.mjs';
import { fromCalculatorToInputText } from '../mappers/fromEquationToInputText.mjs';

/**
 * @typedef InputHandler
 * @property {function} changeInput - Change the input of the handler
 */

/**
 * @typedef Calculator
 * @property {string} result - The result of the calculator
 */

/**
 * @typedef CalculatorHistory
 * @property {function} getLastEquation - Get the last equation in the history
 */

/**
 * Create a handler for inputs
 * @param {InputHandler} currentInputHandler 
 * @param {InputHandler} lastInputHandler 
 * @param {Calculator} calculator
 * @param {CalculatorHistory} history 
 */
export function CreateHandlerInputs(currentInputHandler, lastInputHandler, calculator, history){
  /**
   * Handle the input of the calculator
   * @param {string} currentValue - The current value of the calculator
   * @param {string} lastValue - The last value of the calculator
   */
  return function handleInput(currentValue, lastValue){
    const currentText = currentValue !== undefined ? currentValue : String(calculator.result);
    const lastText = lastValue !== undefined ? lastValue : history.getLastEquation();
  
    if(typeof currentText !== 'string'){
      throw new InternalError('Current text is not a string');
    }
  
    if(typeof lastText !== 'string'){
      throw new InternalError('Last text is not a string');
    }

    currentInputHandler.changeInput(fromCalculatorToInputText(currentText));
    lastInputHandler.changeInput(fromCalculatorToInputText(lastText));
  }
}
