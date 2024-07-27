import { InternalError } from "../errors/calculator-errors.mjs";
import { fromInputToCalculatorAction } from "../mappers/fromInputToCalculatorAction.mjs";

/**
 * Generate a calculator action based on the action and value with the calculator instance
 * @param {Calculator} calculator
 * @param {string} action
 * @param {string} value
 * @returns {Function}
 */
export function generateCalculatorAction(calculator, action, value) {
  const actionKey = fromInputToCalculatorAction[action]
  let needParametters = false;
  let needToParseInt = false;

  if(actionKey === undefined){
    throw new InternalError('Action is not found in key dictionary');
  }

  if(actionKey === 'addSymbol' || actionKey === 'addNumber'){
    needParametters = true;
  }

  if(actionKey === 'addNumber'){
    needToParseInt = true;
  }

  if(actionKey === 'solve'){
    return () => {
      calculator.solve();
    }
  }

  
  return () => {
    if(calculator[actionKey] === undefined){
      throw new InternalError('Action is not found in calculator instance');
    }

    if(needToParseInt && !isNaN(parseInt(value)) && needParametters){
      calculator[actionKey](parseInt(value));
    } else if(needParametters){
      calculator[actionKey](value);
    } else {
      calculator[actionKey]();
    }
  }
}