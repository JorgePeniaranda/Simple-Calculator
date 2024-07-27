import { CALCULATOR_ACTIONS } from './calculator-actions.mjs'

export const INPUT_DICTIONARY = {
  '+': CALCULATOR_ACTIONS.plus,
  '-': CALCULATOR_ACTIONS.minus,
  '×': CALCULATOR_ACTIONS.multiply,
  '÷': CALCULATOR_ACTIONS.divide,
  '=': CALCULATOR_ACTIONS.solve,
  'AC': CALCULATOR_ACTIONS.clear,
  '⌫': CALCULATOR_ACTIONS.backspace,
  ',': CALCULATOR_ACTIONS.decimal,
  '0': CALCULATOR_ACTIONS.zero,
  '1': CALCULATOR_ACTIONS.one,
  '2': CALCULATOR_ACTIONS.two,
  '3': CALCULATOR_ACTIONS.three,
  '4': CALCULATOR_ACTIONS.four,
  '5': CALCULATOR_ACTIONS.five,
  '6': CALCULATOR_ACTIONS.six,
  '7': CALCULATOR_ACTIONS.seven,
  '8': CALCULATOR_ACTIONS.eight,
  '9': CALCULATOR_ACTIONS.nine,
  "()": CALCULATOR_ACTIONS.parenthesis,
  '(': CALCULATOR_ACTIONS.openParenthesis,
  ')': CALCULATOR_ACTIONS.closeParenthesis,
  '^': CALCULATOR_ACTIONS.power,
}