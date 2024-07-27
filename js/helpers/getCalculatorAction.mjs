import { CALCULATOR_ACTIONS_REQUIRE_PARSEINT } from "../constants/calculator-actions-metadata.mjs";
import { InternalError } from "../errors/calculator-errors.mjs";
import { fromInputToCalculatorAction } from "../mappers/fromInputToCalculatorAction.mjs";
import { isEmpty } from "./isEmpty.mjs";

/**
 * Generate a calculator action based on the action and value with the calculator instance
 * @param {Calculator} calculator
 * @param {string} action
 * @param {string} value
 * @returns {Function}
 */
export function generateCalculatorAction(calculator, action, value) {
  const actionKey = fromInputToCalculatorAction[action]
  const needParametters = calculator[actionKey].length > 0;
  const needToParseInt = CALCULATOR_ACTIONS_REQUIRE_PARSEINT.includes(actionKey);
  
  if(isEmpty(actionKey)){
    throw new InternalError('Action is not found in key dictionary');
  }
  
  if(isEmpty(calculator[actionKey])){
    throw new InternalError('Action is not found in calculator instance');
  }

  if(calculator[actionKey].length === 1 && isEmpty(value)){
    throw new InternalError('Action need a value');
  }

  if(calculator[actionKey].length > 1){
    throw new InternalError('Action need two value, but only one can be provided automatically');
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