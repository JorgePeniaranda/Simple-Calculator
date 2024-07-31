export class CalculatorHistory{
  #history;

  /**
   * Create a calculator history
   * @param {Array<string>} prevHistory - The history to start with
   */
  constructor(prevHistory){
    this.#history = prevHistory ?? [];
  }

  get history(){
    return this.#history;
  }

  /**
   * Add equation to history
   * @param {string} equation - The equation to add to history
   * @returns {void}
   */
  addEquation(equation){
    if(typeof equation !== 'string'){
      throw new InternalError('Equation is not a string');
    }

    this.#history.push(equation);
  }

  /**
   * Clear history
   * @returns {void}
   */
  clearHistory(){
    this.#history = [];
  }

  /**
   * Get last equation from history
   * @returns {string}
   */
  getLastEquation(){
    return this.#history?.[this.#history.length - 1];
  }
}