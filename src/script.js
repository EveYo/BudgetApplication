
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
const list = document.getElementById("list");

//Variable
let myBudget = 0;
let myTotalExpense = 0;
let myBalance = 0;

setBudgetButton.addEventListener("click", ()=>{
    myBudget = totalBudget.value;
    if (myBudget === null || myBudget < 0){
        budgetErrorMessage.classList.remove("hide");
        // element.classList will return a list of class names of the element
        // and by using add or remove, we can add class on the element
    }else{
        budgetErrorMessage.classList.add("hide"); //hide error message
        budget.innerHTML = myBudget; // set the text in the budget html element to whatever
        myBalance = myBudget - myTotalExpense;
        balance.innerHTML = myBalance;  //Update balance
        
        //clear input
        totalBudget.value = "";
    }
})

setExpenseButton.addEventListener("click", ()=>{
    if (newTitle.value === null || newCost.value === null || newCost.value < 0){
        expenseErrorMessage.classList.remove("hide");
        // element.classList will return a list of class names of the element
        // and by using add or remove, we can add class on the element
    }else{
        disableButtons(false); //allow editing

        expenseErrorMessage.classList.add("hide"); //hide error message
        myTotalExpense += parseInt(newCost.value);
        expense.innerHTML = myTotalExpense;
        myBalance = myBudget - myTotalExpense;
        balance.innerHTML = myBalance;  //Update balance

        //create new item that will be displayed on List
        createListItem(newTitle.value, newCost.value);

        //clear input
        newTitle.value = "";
        newCost.value = "";
    }
})

const createListItem = (title, cost) => {
    let item = document.createElement("div");
    item.classList.add("list-item", "flex-space");
    item.innerHTML = `<p class="product">${title}</p><p class="cost">${cost}</p>`;

    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "1.2em";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize = "1.2em";
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
    });
    item.appendChild(editButton);
    item.appendChild(deleteButton);
    list.appendChild(item)
}

const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach( (element) => {
        element.disabled = bool;
    })
}

const modifyElement = (element, edit= false) => {
    let parentDiv = element.parentElement;
    let parentAmount = parentDiv.querySelector(".cost").innerText;
    
    if (edit){
        let parentText = parentDiv.querySelector(".product").innerText;
        newTitle.value = parentText;
        newCost.value = parentAmount;
        disableButtons(true); //while editing, it's not allow to click edit/ delete
    }

    // Roll Back before this expense
    myBalance += parseInt(parentAmount);
    myTotalExpense -= parseInt(parentAmount);
    balance.innerText = myBalance;
    expense.innerText = myTotalExpense;
    
    parentDiv.remove();
}