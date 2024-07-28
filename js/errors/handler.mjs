import { isEmpty } from "../helpers/isEmpty.mjs";
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
    throw new InternalError('Notification service is not an object');
  }

  if(!(error instanceof Error) || isEmpty(error)){
    return notificationService.error('Fatal Unknown Error', 'An error occurred. Please, contact the developer.')
  }

  if(isEmpty(error.message) || typeof error.message !== 'string'){
    return notificationService.error('Fatal Error', 'An error occurred. Please, contact the developer.')
  }

  if(error instanceof InternalError || error instanceof ErrorOnTryToShow){
    return notificationService.error('Internal Error', error.message)
  }

  if(error instanceof ErrorOnTryToInput){
    return notificationService.warning('Input Error', error.message)
  }

  if(error instanceof ErrorOnTryToSolve){
    return notificationService.warning('Calculation Error', error.message)
  }

  return notificationService.warning("Error", error.message)
}