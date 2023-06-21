/* Buttons events */
var inputArray = new Array();
const equationSimbols = ["^", "÷", "×", "-", "+"];
for (let i = 0; i < document.getElementsByClassName("buttonClass").length; i++) document.getElementsByClassName("buttonClass").item(i).addEventListener("click", click);
function click(buttonValue){
    let value = buttonValue.target.innerHTML;
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
        alert("nel"); // modify later
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
        let realSimbols = ["^", "/", "*", "-", "+"];
        this.transcription = this.equation.split("").map(item => equationSimbols.includes(item) ? realSimbols[equationSimbols.indexOf(item)] : item).join("");
    }
}

/* Function and Record */
var equationList = new Array();
function math(input) {
    let equation = new calculator(input.join(""));
    equationList.push(equation);
    console.log(input.join(""))
    equation.solve();
    return equation.result;
}

array.forEach(element => {
    
});



/* test 


let sadpiod = "1+23^32+1";
sadpiod.split(/(\D)/).forEach(element => {
    if (element == "^") {
        sadpiod.split(/(\D)/).indexOf("^")
    }
})
console.log(sadpiod);

"1+23×32a+1".split(/(\D)/)

"1+23×32a+1".split(/(\b)/)
*/