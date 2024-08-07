import { CALCULATOR_ACTIONS } from "../data/calculator-actions.mjs";

export const fromInputToCalculatorAction = {
  [CALCULATOR_ACTIONS.plus]: 'addSymbol',
  [CALCULATOR_ACTIONS.minus]: 'addSymbol',
  [CALCULATOR_ACTIONS.multiply]: 'addSymbol',
  [CALCULATOR_ACTIONS.divide]: 'addSymbol',
  [CALCULATOR_ACTIONS.solve]: 'solve',
  [CALCULATOR_ACTIONS.clear]: 'clearAll',
  [CALCULATOR_ACTIONS.backspace]: 'removeLastCharacter',
  [CALCULATOR_ACTIONS.decimal]: 'addDecimal',
  [CALCULATOR_ACTIONS.zero]: 'addNumber',
  [CALCULATOR_ACTIONS.one]: 'addNumber',
  [CALCULATOR_ACTIONS.two]: 'addNumber',
  [CALCULATOR_ACTIONS.three]: 'addNumber',
  [CALCULATOR_ACTIONS.four]: 'addNumber',
  [CALCULATOR_ACTIONS.five]: 'addNumber',
  [CALCULATOR_ACTIONS.six]: 'addNumber',
  [CALCULATOR_ACTIONS.seven]: 'addNumber',
  [CALCULATOR_ACTIONS.eight]: 'addNumber',
  [CALCULATOR_ACTIONS.nine]: 'addNumber',
  [CALCULATOR_ACTIONS.parenthesis]: 'addParenthesis',
  [CALCULATOR_ACTIONS.openParenthesis]: 'addParenthesis',
  [CALCULATOR_ACTIONS.closeParenthesis]: 'addParenthesis',
  [CALCULATOR_ACTIONS.power]: 'addSymbol',
}
