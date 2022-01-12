window.onload = function () {

	const userBudget = document.querySelector('#budget-field');
	const userBudgetDisplay = document.querySelector('#budget-display');
	const submitBudget = document.querySelector('#submit-budget');
	const userExpense = document.querySelector('#expense-field');
	const userExpenseDisplay = document.querySelector('#expense-display');
	const submitExpense = document.querySelector('#submit-expense');
	const userBalance = document.querySelector('#balance-display');
	// const warningText = document.querySelector('#warning-text')

	const reducer = (previousValue, currentValue) => previousValue + currentValue;

	// function reducer(total, num) {
	// 	return total + num;
	// }


	const expenseList = [];

	submitBudget.addEventListener('click', () => {
		let budget = parseInt(userBudget.value);

		if (isNaN(budget)) {
			alert('Invalid Input, Please Enter A Number')
		} else if (budget === '') {
			alert('Please Enter A Number')
		} else {
			userBudgetDisplay.innerText = budget;
			userBudget.value = '';
			updateBalance()
		}

	});

	submitExpense.addEventListener('click', () => {
		let expense = parseInt(userExpense.value)
		// let expenseTotal = expenseList.reduce(reducer);

		if (isNaN(expense)) {
			alert('Invalid Input, Please Enter A Number')
		} else if (expense === '') {
			alert('Please Enter A Number')
		} else if (expenseList.length > 0) {
			// expense = expenseList.reduce(reducer)
			// userExpenseDisplay.innerText = sum(expenseList);
			userExpenseDisplay.innerText = expense;
			expenseList.push(expense);
			addListItem(expense);
			console.log(expenseList);
			userExpense.value = '';
			updateBalance();

		} else {
			expenseList.push(expense);
			addListItem(expense);
			userExpenseDisplay.innerText = expenseList.reduce(reducer);
			console.log(expenseList);
			userExpense.value = '';
			updateBalance();
		}

	});

	function updateBalance() {
		let balance = parseInt(userBudgetDisplay.innerHTML) - parseInt(userExpenseDisplay.innerHTML);
		userBalance.innerHTML = balance;
	}

	function addListItem() {
		let expenseList = document.querySelector("#expense-list")
		let listItem = document.createElement("li")
		listItem.innerText = userExpenseDisplay.innerText;
		listItem.classList.add("expense-list-item");
		expenseList.appendChild(listItem);
	}

}


