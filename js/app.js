class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement)
    {
        this.currentOperandTextElement = currentOperandTextElement;
        this.previousOperandTextElement = previousOperandTextElement;
        this.clearValues();
        this.readytoReset = false;
    }
        
    
    clearValues()
    {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = null;

    }

    delet()
    {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }
    appendNumber(number) {
        
        //condition to check for periods
        if (number === '.' && this.currentOperand.includes('.')) return
         this.currentOperand = this.currentOperand.toString() + number.toString();
      }
    chooseOperation(operation)
    {
        if (this.currentOperand === '') return;
        // if(this.currentOperand)
        // {
        //     this.operation = operation;
        //     this.previousOperand = this.currentOperand;
        // }else{
        //     this.compute()
        // }
        if (this.previousOperand !== ''){
            this.compute();
        } 
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
       
    }
    compute()
    {
        let computation = '';
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
          //
          if(isNaN(prev) || isNaN(current)) return;
          //
          switch(this.operation)
          {
              case '+':
                  computation = prev + current;
                  break;
              case '-':
                  computation = prev - current;
                  break;
              case '*':
                  computation = prev * current;
                  break;
              case '÷':
                  computation = prev / current;
                  break;
              default:
                  //for equal button - to increase the
                   return computation;
          }
          
          this.currentOperand = computation;
          this.operation = null;
          this.previousOperand = "";
          this.readytoReset = true;

    }
    // getDisplay(number)
    // {
    //     const stringNumber = number.toString();
    //     const integerNumber = parseFloat(stringNumber.split('.')[0]);
    //     const decimalValues = stringNumber.split('.')[1];
    //     let integerDisplay;
    //     if(isNaN(integerNumber))
    //     {
    //         integerDisplay = '0';

    //     }else {
    //         integerDisplay =  integerNumber.toLocaleString('en', {
    //             maximumFractionDigits: 0
    //         })
    //     }
    //     if (decimalValues != null){
    //         return `${integerDisplay}.${decimalValues}`
    //     }else {
    //         return integerNumber;
    //     }
    // }
    getDisplay(number)
    {
        const floatNumber = parseFloat(number)
        if(isNaN(floatNumber)) return '0';
        return floatNumber.toLocaleString('en')
    }
    updateDisplay()
    {
        this.currentOperandTextElement.innerText = this.getDisplay(this.currentOperand);
        if(this.operation != null)
        {
            this.previousOperandTextElement.innerText = `${this.getDisplay(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = '';

        }

    }
}
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(calculator.previousOperand === "" && calculator.currentOperand !== "" &&
        calculator.readytoReset){
            calculator.currentOperand = "";
            calculator.readytoReset = false;
        }
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

//operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay(); //update the display
    })
})
equalsButton.addEventListener('click', button => {
    
    calculator.compute();     
    
    calculator.updateDisplay();

})
//clear button
allClearButton.addEventListener('click', button => {
    calculator.clearValues();
    calculator.updateDisplay();

})

//delet  button
deleteButton.addEventListener('click', button => {
    calculator.delet();
    calculator.updateDisplay();

})