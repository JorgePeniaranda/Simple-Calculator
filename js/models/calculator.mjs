import { CALCULATOR_OPERATIONS_WITH_DOUBLE_CHAR } from "../constants/calculator-metadata.mjs";
import { CALCULATOR_DICTIONARY } from "../data/calculator-dictionary.mjs";
import { EQUATIONS_SYMBOLS } from "../data/equations-symbols.mjs";
import { ErrorOnTryToInput, ErrorOnTryToSolve } from "../errors/calculator-errors.mjs";
import { CALCULATOR_ERRORS_MESSAGES } from "../messages/calculator-errors.mjs";

export class Calculator{
  #result;
  #equation;

  constructor(){
    this.#result = 0;
    this.#equation = '0';
  }

  get result(){
    return this.#result;
  }

  get equation(){
    return this.#equation;
  }
  
  /**
   * Check if the last character of the equation is a symbol or empty
   * @returns {boolean}
   */
  #isLastCharSymbol(){
    const equationLastChar = this.#equation[this.#equation.length - 1];

    if(this.#equation === ''){
      return true;
    }

    if(EQUATIONS_SYMBOLS.includes(equationLastChar)){
      return true;
    }

    return false;
  }

  /**
   * Add symbol to equation
   * @param {string} symbol
   * @returns {void}
   * @throws {ErrorOnTryToInput}
   * @example addSymbol('+'), addSymbol('-'), addSymbol('*'), addSymbol('/'), addSymbol('**')
   */
  addSymbol(symbol){
    const lastChar = this.#equation[this.#equation.length - 1];

    if(!EQUATIONS_SYMBOLS.includes(symbol)){
      throw new ErrorOnTryToInput(CALCULATOR_ERRORS_MESSAGES.CANNOT_ADD_SYMBOL_NOT_ALLOWED);
    }

    if(lastChar === CALCULATOR_DICTIONARY.openParenthesis){
      throw new ErrorOnTryToInput(CALCULATOR_ERRORS_MESSAGES.CANNOT_ADD_SYMBOL_LAST_IS_OPEN_PARENTHESIS);
    }

    if(this.equation === ''){
      return;
    }

    if(this.#isLastCharSymbol() && lastChar !== CALCULATOR_DICTIONARY.closeParenthesis){
      this.removeLastCharacter()
    }

    this.#equation += symbol;
  }

  /**
   * Add parenthesis to equation
   * @returns {void}
   */
  addParenthesis(){
    const lastChar = this.#equation[this.#equation.length - 1];

    if(lastChar === CALCULATOR_DICTIONARY.decimal){
      throw new ErrorOnTryToInput(CALCULATOR_ERRORS_MESSAGES.CANNOT_ADD_SYMBOL_LAST_IS_DECIMAL);
    }

    if(lastChar === CALCULATOR_DICTIONARY.openParenthesis){
      this.#equation += CALCULATOR_DICTIONARY.openParenthesis;
      return;
    }

    if(lastChar === CALCULATOR_DICTIONARY.closeParenthesis){
      this.#equation += CALCULATOR_DICTIONARY.multiply;
      this.#equation += CALCULATOR_DICTIONARY.openParenthesis;
      return;
    }

    let openParenthesisCound = 0;
    let closeParenthesisCount = 0;

    for(let symbol of this.#equation){
      if(symbol === CALCULATOR_DICTIONARY.openParenthesis){
        openParenthesisCound++;
      }

      if(symbol === CALCULATOR_DICTIONARY.closeParenthesis){
        closeParenthesisCount++;
      }
    }

    if(Number.isInteger(parseInt(lastChar)) && openParenthesisCound === closeParenthesisCount){
      this.#equation += CALCULATOR_DICTIONARY.multiply;
      this.#equation += CALCULATOR_DICTIONARY.openParenthesis;
      return;
    }

    if(openParenthesisCound === closeParenthesisCount){
      this.#equation += CALCULATOR_DICTIONARY.openParenthesis;
      return;
    }

    if(openParenthesisCound > closeParenthesisCount){
      this.#equation += CALCULATOR_DICTIONARY.closeParenthesis;
      return;
    }
  }

  /**
   * Add number to equation
   * @param {number} number
   * @returns {void}
   */
  addNumber(number){
    if(!Number.isInteger(number)){
      throw new ErrorOnTryToInput(CALCULATOR_ERRORS_MESSAGES.ADD_NUMBER_REQUIRES_NUMBER);
    }

    if(this.#equation === "0"){
      this.#equation = number.toString();
      return;
    }

    const validateZeroEquation = this.#equation.split('').every((char) => char === '0');
    if(number === 0 && (this.#equation === '' || validateZeroEquation)){
      return;
    }
    
    this.#equation += number;
  }

  /**
   * Add decimal to equation
   * @returns {void}
   */
  addDecimal(){
    if(this.#isLastCharSymbol()){
      if(this.#equation === ''){
        throw new ErrorOnTryToInput(CALCULATOR_ERRORS_MESSAGES.CANNOT_ADD_DECIMAL_EMPTY_EQUATION);
      }
      
      throw new ErrorOnTryToInput(CALCULATOR_ERRORS_MESSAGES.CANNOT_ADD_DECIMAL_LAST_IS_SYMBOL);
    }

    this.#equation += CALCULATOR_DICTIONARY.decimal;
  }

  /**
   * Remove last character from equation
   * @returns {void}
   */
  removeLastCharacter(){
    if (this.#equation === '') {
      throw new ErrorOnTryToInput(CALCULATOR_DICTIONARY.CANNOT_REMOVE_LAST_CHARACTER_EMPTY_EQUATION);
    }

    if (CALCULATOR_OPERATIONS_WITH_DOUBLE_CHAR.includes(this.#equation.slice(-2))) { // If the last two characters are **
      this.#equation = this.#equation.slice(0, this.#equation.length - 2);
      return;
    }

    this.#equation = this.#equation = this.#equation.slice(0, this.#equation.length - 1);
  }

  /**
   * clear equation
   * @returns {void}
   */
  clearEquation(){
    this.#equation = '0';
  }

  /**
   * clear result
   * @returns {void}
   */
  clearResult(){
    this.#result = 0;
  }

  /**
   * clear all
   * @returns {void}
   */
  clearAll(){
    this.clearEquation();
    this.clearResult();
  }

  /**
   * Calculate result and set it to the result property
   */
  solve(){
    try {
      this.#result = eval(this.#equation);
      this.#equation = this.#result.toString();
    } catch(_) {
      throw new ErrorOnTryToSolve(CALCULATOR_DICTIONARY.CANNOT_SOLVE_EQUATION);
    }
  }
}