import { CALCULATOR_ACTIONS_REQUIRE_PARSEINT } from "../constants/calculator-actions-metadata.mjs";
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
  let needParametters = calculator[actionKey].length > 0;
  
  if(actionKey === undefined){
    throw new InternalError('Action is not found in key dictionary');
  }
  
  if(calculator[actionKey] === undefined){
    throw new InternalError('Action is not found in calculator instance');
  }

  if(calculator[actionKey].length === 1 && value === undefined){
    throw new InternalError('Action need a value');
  }

  if(calculator[actionKey].length > 1){
    throw new InternalError('Action need two value, but only one can be provided automatically');
  }
  let needToParseInt = false;

  if(CALCULATOR_ACTIONS_REQUIRE_PARSEINT.includes(actionKey)){
    needToParseInt = true;
  }

  if(actionKey === 'solve'){
    return () => {
      calculator.solve();
    }
  }

  
  return () => {
    if(needToParseInt && needParametters){
      if(isNaN(parseInt(value))){
        throw new InternalError('Value is not a number');
      }

      calculator[actionKey](parseInt(value));
    } else if(needParametters){
      calculator[actionKey](value);
    } else {
      calculator[actionKey]();
    }
  }
}