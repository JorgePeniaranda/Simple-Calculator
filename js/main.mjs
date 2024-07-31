import { CALCULATOR_ACTIONS } from "./data/calculator-actions.mjs";
import { CALCULATOR_DICTIONARY } from "./data/calculator-dictionary.mjs";
import { INPUT_DICTIONARY } from "./data/input-dictionary.mjs";
import { ErrorOnTryToSolve, InternalError } from "./errors/calculator-errors.mjs";
import { isEmpty } from "./helpers/isEmpty.mjs";
import { generateCalculatorAction } from "./helpers/getCalculatorAction.mjs";
import { fromCalculatorToInputText } from "./mappers/fromEquationToInputText.mjs";
import { CalculatorHistory } from "./models/calculator-history.mjs";
import { Calculator } from "./models/calculator.mjs";
import { InputHandler } from "./models/input-handler.mjs";
import { ShowErrorInNotification } from "./errors/handler.mjs";
import { NotificationService } from "./services/notifications.mjs";
import { BUTTON_CLASSNAMES, CURRENT_INPUT_ID, LAST_INPUT_ID } from "./constants/dom.mjs";

// Instances
const calculator = new Calculator();
const history = new CalculatorHistory();

// DOM
const $buttons = document.querySelectorAll(`.${BUTTON_CLASSNAMES}`);
const $lastInput = document.getElementById(LAST_INPUT_ID);
const $currentInput = document.getElementById(CURRENT_INPUT_ID);

// Handlers
const lastInputHandler = new InputHandler($lastInput, false);
const currentInputHandler = new InputHandler($currentInput, false);

$buttons.forEach((button) => {
  if(!(button instanceof HTMLElement)){
    throw new InternalError('Button is not an HTMLElement');
  }

  button.addEventListener("click", (button) => {
    try {
      const textButton = button.target.textContent;

      if(typeof textButton !== 'string'){
        throw new InternalError('Button text content is not a string');
      }

      const buttonValue = textButton.trim();
      const calculatorAction = INPUT_DICTIONARY[buttonValue]

      // Handle solve action (=)
      if(calculatorAction === CALCULATOR_ACTIONS.solve){
        const prevEquation = calculator.equation;

        // Solve equation
        calculator.solve();

        // Add equation to history
        history.addEquation(prevEquation);

        // Update inputs
        UpdateInputs();

        return;
      }
      
      // Handle clear action (AC)
      if(calculatorAction === CALCULATOR_ACTIONS.clear){
        // Clear calculator
        calculator.clearAll();

        // Update inputs
        UpdateInputs("", "");

        return;
      }

      // Handle other actions
      const action = generateCalculatorAction(
        calculator,
        calculatorAction, 
        CALCULATOR_DICTIONARY[calculatorAction]
      );

      if(isEmpty(action) || typeof action !== 'function'){
        throw new InternalError('Generated action is not a function');
      }
      
      action();
      currentInputHandler.changeInput(fromCalculatorToInputText(calculator.equation));
    } catch (error) {
      if(error instanceof ErrorOnTryToSolve){
        calculator.clearAll();
        UpdateInputs("Error", "");
      }
      else {
        ShowErrorInNotification(error, NotificationService);
      }
    }
  });
});

function UpdateInputs(currentValue, lastValue){
  const currentText = currentValue ?? String(calculator.result);
  const lastText = lastValue ?? history.getLastEquation();

  if(typeof lastText !== 'string'){
    throw new InternalError('Last text is not a string');
  }

  if(typeof currentText !== 'string'){
    throw new InternalError('Current text is not a string');
  }

  currentInputHandler.changeInput(fromCalculatorToInputText(currentText));
  lastInputHandler.changeInput(fromCalculatorToInputText(lastText));
}
