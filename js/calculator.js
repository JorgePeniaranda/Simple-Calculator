/* Key events */
document.addEventListener('keydown', (event) => {
    let keyList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "+", "-", "x", "^", "(", ")"];
    if (keyList.includes(event.key)) {
        click(event.key);
    }else if (event.key === "Delete") {
        click("AC");
    }else if (event.key === "Backspace") {
        click("⌫");
    }else if (event.key === "Enter") {
        click("=");
    }else if (event.key === "*") {
        click("×");
    }else if (event.key === "/") {
        click("÷");
    }
}, false);

/* Buttons events */
var inputArray = new Array();
const equationSimbols = ["^", "÷", "×", "-", "+", ","];
for (let i = 0; i < document.getElementsByClassName("buttonClass").length; i++) document.getElementsByClassName("buttonClass").item(i).addEventListener("click",(e) => click(e.target.innerHTML));
function click(value){
    if (value === "AC") clearInput();
    else if (value === "⌫") {
        inputArray.pop();
        changeInput(value);
    }else if (value === ",") {
        if (inputArray.length === 0){
            document.getElementById("userInput").value = "0";
            inputArray.push("0" + value);
        }else inputArray.push(value);
        changeInput(value);
    }else if (value === "=" && equationSimbols.includes(inputArray[inputArray.length - 1])) {
        alert("no"); // modify later
    }else if (value === "=") {
        document.getElementById("result").value = inputArray.join("");
        document.getElementById("userInput").value = math(inputArray);
        inputArray.length = 0;
    }else{
        if (inputArray.length === 0) document.getElementById("userInput").value = "";
        inputArray.push(value);
        changeInput(value);
    }
}
function changeInput(userInput = null){
    let input = document.getElementById("userInput");
    if (userInput === "⌫") {
        input.value = inputArray.join("");
    }else{
        input.value += userInput;
    }
}
function clearInput() {
    document.getElementById("result").value = "";
    document.getElementById("userInput").value = 0;
    inputArray.length = 0;
}

/* Class */
class calculator{
    equation;
    transcription;
    result = 0;
    constructor(equation){
        this.equation = equation;
    }
    solve(){
        this.getTranscription();
        this.result = eval(this.transcription);
    }
    getTranscription(){
        let realSimbols = ["^", "/", "*", "-", "+", "."];
        
        // General symbols
        this.transcription = this.equation.split(/(\D)/).map(item => equationSimbols.includes(item) ? realSimbols[equationSimbols.indexOf(item)] : item);

        // Special symbols
        for (let i = 0; i < this.transcription.length; i++) {
            if (this.transcription[i] === '^') {
                this.transcription[i-1] = 'Math.pow(' + this.transcription[i-1];
                this.transcription[i] = ',';
                this.transcription[i+1] = this.transcription[i+1] + ')';
            }
        }
        this.transcription = this.transcription.join("");
    }
}

/* Function and Record */
var equationList = new Array();
function math(input) {
    let equation = new calculator(input.join(""));
    equationList.push(equation);
    equation.solve();
    return equation.result.toString().split("").map(item => item === '.' ? ',' : item).join(""); //funcion reescribir y agregar . cada 3
}




/* test */