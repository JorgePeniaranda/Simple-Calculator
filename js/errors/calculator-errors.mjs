/**
 * Custom error class for input symbol errors.
 * @param {string} name - The name of the error.
 */
const createErrorFactory = function (name) {
  /**
   * Custom error class for input symbol errors.
   * @extends Error
   * @param {string} message - The error message.
   */
  return class CustomizedError extends Error {
    constructor (message) {
      super(message)
      this.name = name
    }
  }
}

export const InternalError = createErrorFactory('FatalInternalError')
export const ErrorOnTryToInput = createErrorFactory('InputSymbolError') // Used on add symbol in calculator.js
export const ErrorOnTryToSolve = createErrorFactory('CalculateError') // Used on solve in calculator.js
export const ErrorOnTryToShow = createErrorFactory('ShowError') // Used on show in input-handler.js
