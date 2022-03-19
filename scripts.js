window.onload = function () {

	// declaration of variable to target HTML elements
	const userBudget = document.querySelector('#budget-field');
	const userBudgetDisplay = document.querySelector('#budget-display');
	const submitBudget = document.querySelector('#submit-budget');
	const userExpense = document.querySelector('#expense-field');
	const expenseDescription = document.querySelector('#expense-description-field')
	const userExpenseDisplay = document.querySelector('#expense-display');
	const submitExpense = document.querySelector('#submit-expense');
	const userBalance = document.querySelector('#balance-display');

	// initiates empty array to store expense values
	const expenseList = [];

	// initiates display fields with a value of 0
	userBudgetDisplay.innerText = parseInt('0');
	userExpenseDisplay.innerText = parseInt('0');

	// submits user's budget
	submitBudget.addEventListener('click', () => {
		const budgetValue = parseInt(userBudget.value);
		const warning = document.getElementById('budget-warning');

		// removes warning when user types in field
		userBudget.oninput = () => {
			warning.classList.add('hidden');
			userBudget.classList.remove('field-warning');
		}

		// validates input & submits user's budget for calculation
		if (isNaN(budgetValue) || budgetValue === '') {
			warning.classList.remove('hidden');
			userBudget.classList.add('field-warning');
			userBudget.value = '';
		} else if (expenseList.length < 1) {
			userBudgetDisplay.innerText = budgetValue;
			userBalance.innerText = budgetValue;
			updateBalance();
			checkBalance();
			userBudget.value = '';
		} else {
			userBudgetDisplay.innerText = budgetValue;
			updateBalance();
			checkBalance();
			userBudget.value = '';
		}
	});

	// submits user's expense
	submitExpense.addEventListener('click', () => {
		let expenseValue = parseInt(userExpense.value);
		const warning = document.getElementById('expense-warning')

		// removes warning when user types in field
		userExpense.oninput = () => {
			warning.classList.add('hidden');
			userExpense.classList.remove('field-warning');
			expenseDescription.classList.remove('field-warning');
		}

		// validates input & submits user's expense for calculation
		if (isNaN(expenseValue) || expenseValue === '' || expenseDescription.value === '') {
			warning.classList.remove('hidden');
			userExpense.classList.add('field-warning');
			expenseDescription.classList.add('field-warning');
			userExpense.value = '';
			expenseDescription.value = '';
		} else {
			addListObject();
			updateBalance();
			checkBalance();
			userExpenseDisplay.innerHTML = sumAmount();
			userExpense.value = '';
			expenseDescription.value = '';
		}
	});

	// updates user balance with values submitted
	const updateBalance = () => {
		if (expenseList.length < 1) {
			userBalance.innerText = userBudgetDisplay.innerText;
		} else {
			userBalance.innerText = parseInt(userBudgetDisplay.innerText) - sumAmount();
		}
	}

	// adds style to user balance based upon amount
	const checkBalance = () => {
		if (userBalance.innerText < 0) {
			userBalance.style.color = "red";
		} else {
			userBalance.style.color = "green";
		}
	}

	// creates object and uses values to create list item in DOM
	const addListObject = () => {
		// creates an object to hold expenses and descriptions
		const expense = {}

		expense['amount'] = parseInt(userExpense.value);
		expense['description'] = expenseDescription.value;

		expenseList.push(expense);

		// creates list item in expense list
		const addListItem = () => {
			const renderedExpenseList = document.querySelector("#expense-list");
			const listItem = document.createElement("li");
			const deleteButton = document.createElement("button");

			// displays values for list item from created object
			listItem.innerText = '$' + expense.amount + ': ' + expense.description;

			deleteButton.innerHTML = "X";
			deleteButton.classList.add("delete-expense-item")
			deleteButton.addEventListener('click', () => {
				// finds list item index but checking for strict equality in amount and description
				const index = expenseList.findIndex((item) => 
				item.description === expense.description && item.amount === expense.amount);
				// removes expense from expense list array
				expenseList.splice(index, 1);
				// removes list item from DOM
				document.querySelectorAll('.expense-list-item')[index].remove();
				// updates calculated expenses with new values after removing items
				userExpenseDisplay.innerHTML = sumAmount();
				updateBalance();
			});

			listItem.classList.add("expense-list-item");
			listItem.appendChild(deleteButton);
			renderedExpenseList.appendChild(listItem);
		}

		addListItem()
	}

	// adds up expense list values to update expense amount
	const sumAmount = () => expenseList.reduce((acc, val) =>
		acc + val.amount, 0);

}
