function getHistory() {
    return document.getElementById("history-value").innerText;
}
//alert("history-value");

function printHistory(num)
{
    document.getElementById("history-value").innerText = num;
}
function getOutput()
{
   return  document.getElementById("output-value").innerText;
}

function printOutput(num)
{
    //condition to clear the values
    if(num == "")
    {
        document.getElementById("output-value").innerText = num;
    } else {
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
}
//this function get a number and format it
function getFormattedNumber(num)
{
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;

}
//printOutput("45454588");
function reverseNumformat(num)
{
   return Number(num.replace(/, /g, '')); 
}
//alert(reverseNumformat(getOutput()))

var operator = document.getElementsByClassName("operator");
{
    for(var i = 0; i<operator.length; i++)
    {
        operator[i].addEventListener('click', function(){
            //alert("the operator clicked: " + this.id)
            //for backspace
            if(this.id == "claer")
            {
                printHistory("");
                printOutput("")
            }
            if(this.id == "backspace"){
                var output = reverseNumformat(getOutput).toString();
                if(output){
                    output = output.substr(0, output.length-1);
                    printOutput(output);
                }
            }

        });
    }
}
//
var number = document.getElementsByClassName("number");
{
    for(var i = 0; i<number.length; i++)
    {
        number[i].addEventListener('click', function(){
           // alert("the number clicked: " + this.id)
           var output = reverseNumformat(getOutput());
           if(output != NaN){
               output = output+this.id;
               printOutput(output);
           }

        });
    }
}