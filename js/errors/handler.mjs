import { isEmpty } from "../helpers/isEmpty.mjs";
import { CALCULATOR_ALERTS_MESSAGES } from "../messages/calculator-alerts.mjs";
import { CALCULATOR_ERRORS_MESSAGES } from "../messages/calculator-errors.mjs";
import { ErrorOnTryToInput, ErrorOnTryToShow, ErrorOnTryToSolve, InternalError } from "./calculator-errors.mjs";

/**
 * @typedef {Object} NotificationService
 * @property {function(string, string): void} warning
 * @property {function(string, string): void} error
 */

/**
 * Handles errors with alert.
 * @param {Error} error 
 * @param {NotificationService} notificationService
 */
export function ShowErrorInNotification(error, notificationService){
  if(isEmpty(notificationService) || typeof notificationService !== 'object'){
    throw new InternalError(CALCULATOR_ERRORS_MESSAGES.NOTIFICATION_SERVICE_NOT_OBJECT);
  }

  if(!(error instanceof Error) || isEmpty(error)){
    return notificationService.error(CALCULATOR_ALERTS_MESSAGES.FATAL_UNKNOWN_ERROR, CALCULATOR_ERRORS_MESSAGES.AN_ERROR_OCCURRED_CONTACT_DEVELOPER)
  }

  if(isEmpty(error.message) || typeof error.message !== 'string'){
    return notificationService.error(CALCULATOR_ALERTS_MESSAGES.FATAL_ERROR, CALCULATOR_ERRORS_MESSAGES.AN_ERROR_OCCURRED_CONTACT_DEVELOPER)
  }

  if(error instanceof InternalError || error instanceof ErrorOnTryToShow){
    return notificationService.error(CALCULATOR_ALERTS_MESSAGES.INTERNAL_ERROR, error.message)
  }

  if(error instanceof ErrorOnTryToInput){
    return notificationService.warning(CALCULATOR_ALERTS_MESSAGES.INPUT_ERROR, error.message)
  }

  if(error instanceof ErrorOnTryToSolve){
    return notificationService.warning(CALCULATOR_ALERTS_MESSAGES.CALCULATION_ERROR, error.message)
  }

  return notificationService.warning(CALCULATOR_ALERTS_MESSAGES.ERROR, error.message)
}