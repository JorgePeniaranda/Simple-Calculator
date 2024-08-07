import { CALCULATOR_ACTIONS } from "./data/calculator-actions.mjs";
import { CALCULATOR_DICTIONARY } from "./data/calculator-dictionary.mjs";
import { INPUT_DICTIONARY } from "./data/input-dictionary.mjs";
import { ErrorOnTryToSolve, InternalError } from "./errors/calculator-errors.mjs";
import { isEmpty } from "./helpers/isEmpty.mjs";
import { generateCalculatorAction } from "./helpers/getCalculatorAction.mjs";
import { CalculatorHistory } from "./models/calculator-history.mjs";
import { Calculator } from "./models/calculator.mjs";
import { InputHandler } from "./models/input-handler.mjs";
import { ShowErrorInNotification } from "./errors/handler.mjs";
import { NotificationService } from "./services/notifications.mjs";
import { BUTTON_CLASSNAMES, CURRENT_INPUT_ID, LAST_INPUT_ID } from "./constants/dom.mjs";
import { LocalStorage } from "./services/storage.mjs";
import { CALCULATOR_HISTORY_STORAGE_KEY } from "./constants/storage.mjs";
import { CreateHandlerInputs } from "./helpers/handleCalculatorInputs.mjs";
import { CreateHandlerHistory } from "./helpers/handleCalculatorHistoryWithStorage.mjs";
import { CALCULATOR_ERRORS_MESSAGES } from "./messages/calculator-errors.mjs";

// Instances
const calculator = new Calculator();
const lastHistory = JSON.parse(localStorage.getItem(CALCULATOR_HISTORY_STORAGE_KEY)) ?? [];
const history = new CalculatorHistory(lastHistory);
const localStorageService = new LocalStorage();

// DOM
const $buttons = document.querySelectorAll(`.${BUTTON_CLASSNAMES}`);
const $lastInput = document.getElementById(LAST_INPUT_ID);
const $currentInput = document.getElementById(CURRENT_INPUT_ID);

// Handlers
const currentInputHandler = new InputHandler($currentInput, false);
const lastInputHandler = new InputHandler($lastInput, false);
const handleInput = CreateHandlerInputs(currentInputHandler, lastInputHandler, calculator, history);
const handleHistory = CreateHandlerHistory(history, localStorageService);

/**
 * Handle click event on button
 * @param {MouseEvent} button
 * @returns {void}
 */
function handleClickButton(button) {
  try {
    const textButton = button.target.textContent;

    if(typeof textButton !== 'string'){
      throw new InternalError(CALCULATOR_ERRORS_MESSAGES.BUTTON_TEXT_NOT_STRING);
    }

    const buttonValue = textButton.trim();
    const calculatorAction = INPUT_DICTIONARY[buttonValue]

    if(typeof calculatorAction !== 'string'){
      throw new InternalError(CALCULATOR_ERRORS_MESSAGES.BUTTON_VALUE_INVALID_ACTION);
    }

    // Handle solve action (=)
    if(calculatorAction === CALCULATOR_ACTIONS.solve){
      const prevEquation = calculator.equation;

      // Solve equation
      calculator.solve();

      // Add equation to history
      handleHistory.push(prevEquation);

      // Update inputs
      handleInput();

      return;
    }
    
    // Handle clear action (AC)
    if(calculatorAction === CALCULATOR_ACTIONS.clear){
      // Clear calculator
      calculator.clearAll();

      // Update inputs
      handleInput("", "");

      return;
    }

    // Handle other actions
    const action = generateCalculatorAction(
      calculator,
      calculatorAction, 
      CALCULATOR_DICTIONARY[calculatorAction]
    );

    if(isEmpty(action) || typeof action !== 'function'){
      throw new InternalError(CALCULATOR_ERRORS_MESSAGES.GENERATED_ACTION_NOT_FUNCTION);
    }
    
    action();
    handleInput(calculator.equation, "");
  } catch (error) {
    if(error instanceof ErrorOnTryToSolve){
      calculator.clearAll();
      handleInput("Error", "");
    }
    else {
      ShowErrorInNotification(error, NotificationService);
    }
  }
}

// Add event listener to buttons
$buttons.forEach((button) => {
  if(!(button instanceof HTMLElement)){
    throw new InternalError(CALCULATOR_ERRORS_MESSAGES.BUTTON_NOT_HTML_ELEMENT);
  }

  button.addEventListener("click", handleClickButton)
});
