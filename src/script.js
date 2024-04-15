
// Set Button
const setBudgetButton = document.getElementById("totalBudgetButton");
const setExpenseButton = document.getElementById("addExpenseButton"); //checkAmount

// Set initialization of input
let totalBudget = document.getElementById("totalBudget");
let newTitle = document.getElementById("productName"); //product-title
let newCost = document.getElementById("productCost"); //user-amount

// Set Error message
const budgetErrorMessage = document.getElementById("budgetError");
const expenseErrorMessage = document.getElementById("expenseError");

// Set initialization of displayed value
const budget = document.getElementById("budget");
const expense = document.getElementById("expense");
const balance = document.getElementById("balance");
const list = document.getElementById("listItem");

//Variable
let myBudget = 0;
let myTotalExpense = 0;
let myBalance = 0;

setBudgetButton.addEventListener("click", ()=>{
    myBudget = totalBudget.value; 
    console.log(myBudget);
    if (myBudget === null || myBudget < 0){
        budgetErrorMessage.classList.remove("hide");
        // element.classList will return a list of class names of the element
        // and by using add or remove, we can add class on the element
    }else{
        budgetErrorMessage.classList.add("hide"); //hide error message
        budget.innerHTML = myBudget; // set the text in the budget html element to whatever
        balance.innerHTML = myBudget - expense.innerText;  //Update balance

        //clear input
        totalBudget.value = "";
    }
})