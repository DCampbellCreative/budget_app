window.onload = function () {

	const userBudget = document.querySelector('#budget-field');
	const userBudgetDisplay = document.querySelector('#budget-display');
	const submitBudget = document.querySelector('#submit-budget');
	const userExpense = document.querySelector('#expense-field');
	const expenseDescription = document.querySelector('#expense-description-field')
	const userExpenseDisplay = document.querySelector('#expense-display');
	const submitExpense = document.querySelector('#submit-expense');
	const userBalance = document.querySelector('#balance-display');
	// const warningText = document.querySelector('#warning-text')

	// initiates empty array to store expense values
	const expenseList = [];

	// submits user's budget
	submitBudget.addEventListener('click', () => {
		let budget = parseInt(userBudget.value);

		if (isNaN(budget)) {
			alert('Invalid Input, Please Enter A Number')
		} else if (budget === '') {
			alert('Please Enter A Number')
		} else {
			userBudgetDisplay.innerText = budget;
			userBudget.value = '';
			// updateBalance()
		}
	});

	// submits user's expense
	submitExpense.addEventListener('click', () => {
		let expenseValue = userExpense.value

		if (isNaN(expenseValue) || expenseValue === '' || expenseDescription.value === '') {
			alert('Invalid Input, Please enter a $ amount & a description')
		} else {
			addListObject();
			addListItem();
			// console.log(sumAmount());
			userExpenseDisplay.innerHTML = sumAmount();
			userExpense.value = '';
			expenseDescription.value = '';
		}
	});

	// renders expense list
	const addListItem = (e) => {
		let renderedExpenseList = document.querySelector("#expense-list");
		let listItem = document.createElement("li");
		let deleteButton = document.createElement("button");
		listItem.innerText = '$' + userExpense.value + ': ' + expenseDescription.value
		deleteButton.innerHTML = "X";
		deleteButton.classList.add("delete-expense-item")
		listItem.classList.add("expense-list-item");
		listItem.appendChild(deleteButton);
		renderedExpenseList.appendChild(listItem);
	}

	// creates an object to hold expenses and descriptions
	const addListObject = (e) => {
		const expense = {}
		// id: Date.now(),
		expense['amount'] = parseInt(userExpense.value),
			expense['description'] = expenseDescription.value,

			expenseList.push(expense);
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

	const sumAmount = () => expenseList.reduce((acc, val) =>
		acc + val.amount, 0);

	let currentExpense = Object.keys(expenseList).forEach(function (amount) {
		// `prop` is the property name
		// `data[prop]` is the property value
		console.log(amount);
	});

	// .reduce((prev, curr) => prev + curr, 0);

}
