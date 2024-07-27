import { ErrorOnTryToShow, InternalError } from "../errors/calculator-errors.mjs";

export class InputHandler {
  #input;
  #isNumberInput;

  /**
   * @param {HTMLElement} input 
   * @param {boolean} isNumber
   */
  constructor(input, isNumberInput = false) {
    if (!(input instanceof HTMLElement)) {
      throw new InternalError(`Cannot create InputHandler, invalid input`);
    }

    this.#input = input;
    this.#isNumberInput = isNumberInput
  }

  #isValidText(text) {
    if (this.#isNumberInput && typeof text !== "number") {
      return false;
    }

    if (typeof text !== "string" && typeof text !== "number") {
      return false;
    }

    return true;
  }

  /**
   * Change input value
   * @param {string} newText
   * @returns {void}
   */
  changeInput(newText) {
    const isValidText = this.#isValidText(newText);

    if (!isValidText && this.#isNumberInput) {
      throw new ErrorOnTryToShow(`Cannot change input, invalid text. Maybe you passed a string instead of a number`);
    }
    
    if (!isValidText) {
      throw new ErrorOnTryToShow(`Cannot change input, invalid text`);
    }

    this.#input.value = newText;
  }
}