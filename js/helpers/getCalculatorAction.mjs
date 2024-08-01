import { CALCULATOR_ACTIONS_REQUIRE_PARSEINT } from "../constants/calculator-metadata.mjs";
import { InternalError } from "../errors/calculator-errors.mjs";
import { fromInputToCalculatorAction } from "../mappers/fromInputToCalculatorAction.mjs";
import { CALCULATOR_ERRORS_MESSAGES } from "../messages/calculator-errors.mjs";
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
    throw new InternalError(CALCULATOR_ERRORS_MESSAGES.ACTION_NOT_FOUND_IN_KEY_DICTIONARY);
  }
  
  if(isEmpty(calculator[actionKey])){
    throw new InternalError(CALCULATOR_ERRORS_MESSAGES.ACTION_NOT_FOUND_IN_CALCULATOR_INSTANCE);
  }

  if(calculator[actionKey].length === 1 && isEmpty(value)){
    throw new InternalError(CALCULATOR_ERRORS_MESSAGES.ACTION_NEEDS_VALUE);
  }

  if(calculator[actionKey].length > 1){
    throw new InternalError(CALCULATOR_ERRORS_MESSAGES.ACTION_NEEDS_TWO_VALUES);
  }
  
  return () => {
    if(needToParseInt && needParametters){
      if(isNaN(parseInt(value))){
        throw new InternalError(CALCULATOR_ERRORS_MESSAGES.VALUE_NOT_NUMBER);
      }

      calculator[actionKey](parseInt(value));
    } else if(needParametters){
      calculator[actionKey](value);
    } else {
      calculator[actionKey]();
    }
  }
}