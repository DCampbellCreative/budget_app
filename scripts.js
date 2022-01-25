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

		if (isNaN(budgetValue)) {
			userBudget.classList.add('warning');
			// alert('Invalid Input, Please Enter A Number')
			userBudget.value = 'Invalid Input, Please Enter A Number';
		} else if (budgetValue === '') {
			userBudget.classList.add('warning');
			// alert('Please Enter A Number')
			userBudget.value = 'Please Enter A Number';
		} else if (expenseList.length < 1) {
			userBudget.classList.remove('warning');
			userBudgetDisplay.innerText = budgetValue;
			userBalance.innerText = budgetValue;
			updateBalance();
			checkBalance();
			userBudget.value = '';
		} else {
			userBudget.classList.remove('warning');
			userBudgetDisplay.innerText = budgetValue;
			updateBalance();
			checkBalance();
			userBudget.value = '';
		}
	});

	// submits user's expense
	submitExpense.addEventListener('click', () => {
		let expenseValue = parseInt(userExpense.value);

		if (isNaN(expenseValue) || expenseValue === '' || expenseDescription.value === '') {
			alert('Invalid Input, Please enter a $ amount & a description')
		} else {
			addListObject();
			updateBalance();
			checkBalance();
			// addListItem();
			// console.log(sumAmount());
			userExpenseDisplay.innerHTML = sumAmount();
			userExpense.value = '';
			expenseDescription.value = '';
		}
	});

	// updates users balance with values submitted
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

	// creates an object to hold expenses and descriptions
	const addListObject = () => {
		const expense = {}

		expense['amount'] = parseInt(userExpense.value);
		expense['description'] = expenseDescription.value;

		expenseList.push(expense);

		// creates list item in expense list
		const addListItem = () => {
			const renderedExpenseList = document.querySelector("#expense-list");
			const listItem = document.createElement("li");
			const deleteButton = document.createElement("button");

			listItem.innerText = '$' + expense.amount + ': ' + expense.description;

			deleteButton.innerHTML = "X";
			deleteButton.classList.add("delete-expense-item")
			deleteButton.addEventListener('click', () => {
				const index = expenseList.findIndex((item) => item.description === expense.description && item.amount === expense.amount);
				expenseList.splice(index, 1);
				document.querySelectorAll('.expense-list-item')[index].remove();
				userExpenseDisplay.innerHTML = sumAmount();
				updateBalance();
			});

			listItem.classList.add("expense-list-item");
			listItem.appendChild(deleteButton);
			renderedExpenseList.appendChild(listItem);
		}

		addListItem()
		// console.log(expenseList);
	}

	// const sumAmount = expenseList.map(expense => ({ value: expense.amount }));

	// const sumAmount = () => expenseList.forEach(expense => {
	// 	for (let key in expense) {
	// 		console.log(expense);
	// 	}
	// });

	// const sumAmount = () => expenseList.map(expense =>
	// 	console.log(expense.amount));

	// adds up expense list values to update expense amount
	const sumAmount = () => expenseList.reduce((acc, val) =>
		acc + val.amount, 0);

	let currentExpense = Object.keys(expenseList).forEach(function (amount) {
		// `prop` is the property name
		// `data[prop]` is the property value
		console.log(amount);
	});

	// .reduce((prev, curr) => prev + curr, 0);

}
