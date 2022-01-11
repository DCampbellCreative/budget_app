window.onload = function () {

	const userBudget = document.querySelector('#budget-field');
	const userBudgetDisplay = document.querySelector('#budget-display');
	const submitBudget = document.querySelector('#submit-budget');
	const userExpense = document.querySelector('#expense-field');
	const userExpenseDisplay = document.querySelector('#expense-display');
	const submitExpense = document.querySelector('#submit-expense');
	const userBalance = document.querySelector('#balance-display');
	// const warningText = document.querySelector('#warning-text')

	submitBudget.addEventListener('click', () => {
		let budget = userBudget.value

		if (isNaN(budget)) {
			alert('Invalid Input, Please Enter A Number')
		} else if (budget === '') {
			alert('Please Enter A Number')
		} else {
			userBudgetDisplay.innerText = userBudget.value
			userBudget.value = '';
			updateBalance()
		}

	});

	submitExpense.addEventListener('click', () => {
		let expense = userExpense.value

		if (isNaN(expense)) {
			alert('Invalid Input, Please Enter A Number')
		} else if (expense === '') {
			alert('Please Enter A Number')
		} else {
			userExpenseDisplay.innerText = userExpense.value
			userExpense.value = '';
			updateBalance()
		}

	});

	function updateBalance() {
		let balance = userBudgetDisplay.innerHTML - userExpenseDisplay.innerHTML;
		userBalance.innerHTML = balance;
	}

}


