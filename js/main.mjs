import { CALCULATOR_ACTIONS } from "./data/calculator-actions.mjs";
import { CALCULATOR_DICTIONARY } from "./data/calculator-dictionary.mjs";
import { INPUT_DICTIONARY } from "./data/input-dictionary.mjs";
import { InternalError } from "./errors/calculator-errors.mjs";
import { generateCalculatorAction } from "./helpers/getCalculatorAction.mjs";
import { fromCalculatorToInputText } from "./mappers/fromEquationToInputText.mjs";
import { CalculatorHistory } from "./models/calculator-history.mjs";
import { Calculator } from "./models/calculator.mjs";
import { InputHandler } from "./models/input-handler.mjs";

// Instances
const calculator = new Calculator();
const history = new CalculatorHistory();

// DOM
const $buttons = document.querySelectorAll(".calculator__button");
const $lastInput = document.getElementById("input__last-equation");
const $currentInput = document.getElementById("input__current-equation");

// Handlers
const lastInputHandler = new InputHandler($lastInput, false);
const currentInputHandler = new InputHandler($currentInput, false);

$buttons.forEach((button) => {
  button.addEventListener("click", (button) => {
    if(typeof button.target.textContent !== 'string'){
      throw new InternalError('Button text content is not a string');
    }

    const buttonValue = button.target.textContent.trim();
    const calculatorAction = INPUT_DICTIONARY[buttonValue]

    // Handle solve action (=)
    if(calculatorAction === CALCULATOR_ACTIONS.solve){
      const prevEquation = calculator.equation;

      // Solve equation
      calculator.solve();

      // Add equation to history
      history.addEquation(calculator.equation);

      // Update inputs
      lastInputHandler.changeInput(fromCalculatorToInputText(prevEquation));
      currentInputHandler.changeInput(calculator.result);

      return;
    }
    
    // Handle clear action (AC)
    if(calculatorAction === CALCULATOR_ACTIONS.clear){
      // Clear calculator
      calculator.clearAll();

      // Update inputs
      currentInputHandler.changeInput("");
      lastInputHandler.changeInput("");

      return;
    }

    // Handle other actions
    const action = generateCalculatorAction(
      calculator,
      calculatorAction, 
      CALCULATOR_DICTIONARY[calculatorAction]
    );

    if(action === undefined || typeof action !== 'function'){
      throw new InternalError('Generated action is not a function');
    }
    
    action();
    currentInputHandler.changeInput(fromCalculatorToInputText(calculator.equation));
  });
});
