import { ErrorOnTryToShow, InternalError } from "../errors/calculator-errors.mjs";
import { CALCULATOR_ERRORS_MESSAGES } from "../messages/calculator-errors.mjs";

export class InputHandler {
  #input;
  #isNumberInput;

  /**
   * @param {HTMLElement} input 
   * @param {boolean} isNumber
   */
  constructor(input, isNumberInput = false) {
    if (!(input instanceof HTMLElement)) {
      throw new InternalError(CALCULATOR_ERRORS_MESSAGES.CANNOT_CREATE_INPUT_HANDLER_INVALID_INPUT);
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
      throw new ErrorOnTryToShow(CALCULATOR_ERRORS_MESSAGES.CANNOT_CHANGE_INPUT_INVALID_TEXT);
    }
    
    if (!isValidText) {
      throw new ErrorOnTryToShow(CALCULATOR_ERRORS_MESSAGES.CANNOT_CHANGE_INPUT_INVALID_TEXT);
    }

    this.#input.value = newText;
  }
}