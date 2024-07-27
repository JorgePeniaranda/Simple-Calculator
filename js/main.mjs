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
const $buttons = document.querySelectorAll(".buttonClass");
const $inputUser = document.getElementById("userInput");
const $inputResult = document.getElementById("result");

// Handlers
const lastInputHandler = new InputHandler($inputUser, false);
const currentInputHandler = new InputHandler($inputResult, false);

$buttons.forEach((button) => {
  button.addEventListener("click", (button) => {
    const calculatorAction = INPUT_DICTIONARY[button.target.textContent]

    // Handle solve action (=)
    if(calculatorAction === CALCULATOR_ACTIONS.solve){
      const prevEquation = calculator.equation;

      // Solve equation
      calculator.solve();

      // Add equation to history
      history.addEquation(calculator.equation);

      // Update inputs
      currentInputHandler.changeInput(fromCalculatorToInputText(prevEquation));
      lastInputHandler.changeInput(calculator.result);

      return;
    }
    
    // Handle clear action (AC)
    if(calculatorAction === CALCULATOR_ACTIONS.clear){
      // Clear calculator
      calculator.clearAll();

      // Update inputs
      lastInputHandler.changeInput("");
      currentInputHandler.changeInput("");

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
    lastInputHandler.changeInput(fromCalculatorToInputText(calculator.equation));
  });
});
