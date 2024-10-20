let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
let expenseCat = document.getElementById("selectCat");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("expense-descr");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("expense-descr-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const dropDown = document.getElementById("dropdown-content");
const list = document.getElementById("list");
const quitButton = document.getElementById("quit-button");
const categories = ["food","clothing","household","housing","debt","pets","transportation","other"];
let tempAmount = 0;

//Set Quit
quitButton.addEventListener("click", () => {
  // Add local storage
  let currentBudget = amount.innerText;
  let currentBalance = balanceValue.innerText;
  let currentExpense = expenditureValue.innerText;
  localStorage.setItem("budgetAmt", currentBudget);
  localStorage.setItem("expenseAmt", currentExpense);
  localStorage.setItem("balanceAmt", currentBalance);
  //console.log("currentBudget: "+currentBudget);
  //console.log("currentBalance: "+currentBalance);
  //console.log("currentExpense: "+currentExpense);

  const listElement = document.getElementById("list"); 
  const prodElements = listElement.querySelectorAll('.product');
  const catElements = listElement.querySelectorAll('.category');
  const amtElements = listElement.querySelectorAll('.amount');
  const prodArray=[];
  const catArray=[];
  const amtArray=[];
  for (const prod of prodElements) {
    //console.log(prod.textContent);
    prodArray.push(prod.textContent);
    //console.log(prodArray);
  }
  for (const cat of catElements) {
    //console.log(cat.textContent);
    catArray.push(cat.textContent);
    //console.log(catArray);
  }
  for (const amt of amtElements) {
    //console.log(amt.textContent);
    amtArray.push(amt.textContent);
    //console.log(amtArray);
  }
  const prodString  = JSON.stringify(prodArray);
  const catString = JSON.stringify(catArray);
  const amtString = JSON.stringify(amtArray);

  localStorage.setItem("prodArray",prodString);
  localStorage.setItem("catArray",catString);
  localStorage.setItem("amtArray",amtString);

  console.log("Data stored.");
})

function loadFromStorage() {
  // Clear local storage for testing only
  //localStorage.clear();
  let allFound = false;
  let prodArray = [];
  let catArray = [];
  let amtArray = [];

  // Retrieve Product array from local storage
  const prodString = localStorage.getItem("prodArray");
  // Check if the array exists in local storage
  if (prodString) {
    //console.log(prodString);
    // Parse the string back into array
    prodArray = JSON.parse(prodString);
    //console.log(prodArray);

    // Retrieve the Category array from local storage
    const catString = localStorage.getItem("catArray");
    // Check if the array exists in local storage
    if (catString) {
      //console.log(catString);
      // Parse the string back into array
      catArray = JSON.parse(catString);
      //console.log(catArray);

      // Retrieve the Amount array from local storage
      const amtString = localStorage.getItem("amtArray");
      // Check if the array exists in local storage
      if (amtString) {
        //console.log(amtString);
        allFound = true;
        // Parse the string back into an array
        amtArray = JSON.parse(amtString);
        //console.log(amtArray); // Output the retrieved array
      } else {
        console.log('Amount array not found in local storage.');
      }
    } else {
      console.log("Category array not found in local storage");
    }
  } else {
    console.log("Product array not found in local storage");
  }
  if (allFound) {
    for (var i = 0; i < prodArray.length; i++) {
        let sublistContent = document.createElement("div");
        sublistContent.classList.add("sublist-content", "flex-space", catArray[i]);
        list.appendChild(sublistContent);
        sublistContent.innerHTML = `<p class="product">${prodArray[i]}</p><p class="category">${catArray[i]}</p><p class="amount">${amtArray[i]}</p>`;
        let editButton = document.createElement("button");
        editButton.classList.add("edit");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
          modifyElement(editButton, true);
        });
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.textContent = "Delete"; 
        deleteButton.addEventListener("click", () => {
          modifyElement(deleteButton);
        });
        sublistContent.appendChild(editButton);
        sublistContent.appendChild(deleteButton);
        document.getElementById("list").appendChild(sublistContent);
    }
    amount.innerText = localStorage.getItem("budgetAmt");
    expenditureValue.innerText = localStorage.getItem("expenseAmt");
    balanceValue.innerText = localStorage.getItem("balanceAmt");
  } else {
    amount.innerText = 0;
    expenditureValue.innerText = 0;
    balanceValue.innerText = 0;
  }
  localStorage.clear();
}
//Set Budget Part
loadFromStorage();
totalAmountButton.addEventListener("click", () => {
  tempAmount = totalAmount.value;
  //empty or negative input
  if (tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    //Set Budget
    amount.innerHTML = tempAmount;
    //Set Balance
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    //Clear Input Box
    totalAmount.value = "";
  }
});
var select = document.getElementById("selectCat");
console.log(categories);
for(var i = 0; i < categories.length; i++) {
    var cat = categories[i];
    //console.log("cat: "+cat);
    var el = document.createElement("option");
    //console.log("option created");
    el.textContent = cat;
    el.value = cat;
    select.appendChild(el);
}


//Function To Disable Edit and Delete Button
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

//Function To Modify List Elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = balanceValue.innerText;
  let currentExpense = expenditureValue.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  //console.log("parentAmount: "+parentAmount);
  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    console.log("parentText: "+parentText);
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }
  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureValue.innerText =
    parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();
};

//Function To Create List
//const listCreator = (expenseName, expenseValue) => {
const listCreator = (expenseName, expenseCat, expenseValue) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space", expenseCat);
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="category">${expenseCat}</p><p class="amount">${expenseValue}</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("edit");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "Delete"; 
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublistContent);
};

//Function To Add Expenses
checkAmountButton.addEventListener("click", () => {
  //empty checks
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }
  //Enable buttons
  productTitleError.classList.add("hide");
  disableButtons(false);
  //Expense
  let expenditure = parseInt(userAmount.value);
  //let category = expenseCat.value;
  //console.log("category: "+category);
  //Total expense (existing + new)
  let sum = parseInt(expenditureValue.innerText) + expenditure;
  expenditureValue.innerText = sum;
  //Total balance(budget - total expense)
  const totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;
  //Create list
  //listCreator(productTitle.value, userAmount.value);
  listCreator(productTitle.value, expenseCat.value, userAmount.value );
  //Empty inputs
  productTitle.value = "";
  userAmount.value = "";
});