import { CALCULATOR_HISTORY_STORAGE_KEY } from "../constants/storage.mjs";
import { InternalError } from "../errors/calculator-errors.mjs";

/**
 * @typedef CalculatorHistory
 * @property {Array<string>} history - The history of equations
 * @property {function} addEquation - Add an equation to the history
 * @property {function} clearHistory - Clear the history
 */

/**
 * @typedef LocalStorage
 * @property {function} setItem - Set an item in the local storage
 * @property {function} removeItem - Remove an item from the local storage
 */

/**
 * @typedef HandlerHistory
 * @property {function} push - Add an equation to the history
 * @property {function} remove - Remove an equation from the history
 * @property {function} clear - Clear the history
 */

/**
 * Create a handler for calculator history
 * @param {CalculatorHistory} history - The calculator history
 * @param {LocalStorage} localStorageService - The local storage service
 * @returns {HandlerHistory} The handler for calculator history
 */ 
export function CreateHandlerHistory(history, localStorageService){
  return {
    push(equation){
      history.addEquation(equation);
      localStorageService.setItem(CALCULATOR_HISTORY_STORAGE_KEY, JSON.stringify(history.history));
    },
    remove(){
      throw new InternalError('Not implemented');
    },
    clear(){
      history.clearHistory();
      localStorageService.removeItem(CALCULATOR_HISTORY_STORAGE_KEY);
    },
  }
}