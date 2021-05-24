
// GET Display ELEMENTS 
class Display {
    constructor() {
        this.incomeFeedback = document.querySelector(".income-feedback");
        this.expenseFeedback = document.querySelector(".expense-feedback");
        this.incomeForm = document.getElementById("income-form");
        this.incomeInput = document.getElementById("income-input");
        this.incomeAmount = document.getElementById("income-amount");
        this.expenseAmount = document.getElementById("expense-amount");
        this.balance = document.getElementById("balance");
        this.balanceAmount = document.getElementById("balance-amount");
        this.expenseForm = document.getElementById("expense-form");
        this.expenseInput = document.getElementById("expense-input");
        this.amountInput = document.getElementById("amount-input");
        this.expenseList = document.getElementById("expense-list");
        this.itemList = [];
        this.itemID = 0;
    }

    // ENTER INCOME
    submitIncome() {
        const value = this.incomeInput.value;

        if (value === '' || value < 0) {
            this.incomeFeedback.classList.add('showItem');
            this.incomeFeedback.innerHTML = '<p>value cannot be empty or negative</p>';

            setTimeout(() => {
                this.incomeFeedback.classList.remove('showItem');
            }, 4000);
        } else {
            this.incomeAmount.textContent = value;
            this.incomeInput.value = '';
            this.showBalance();
        }
    }

    // SHOW BALANCE
    showBalance() {
        const expense = this.totalExpense();
        const total = parseInt(this.incomeAmount.textContent) - expense;

        this.balanceAmount.textContent = total;

        if (total < 0) {
            this.balance.classList.remove('showGreen', 'showBlack');
            this.balance.classList.add('showRed');
        }

        if (total > 0) {
            this.balance.classList.remove('showRed', 'showBlack');
            this.balance.classList.add('showGreen');
        }

        if (total === 0) {
            this.balance.classList.remove('showRed', 'showGreen');
            this.balance.classList.add('showBlack');
        }
    }

    // ENTER EXPENSES
    submitExpenseForm() {
        const expenseValue = this.expenseInput.value;
        const amountValue = this.amountInput.value;

        if (expenseValue === '' || amountValue === '' || amountValue < 0) {
            this.expenseFeedback.classList.add('showItem');
            this.expenseFeedback.innerHTML = '<p>value cannot be empty or negative</p>';

            setTimeout(() => {
                this.expenseFeedback.classList.remove('showItem');
            }, 4000);
        } else {
            const amount = parseInt(amountValue);

            this.expenseInput.value = '';
            this.amountInput.value = '';

            // add to expense list
            const expense = {
                id: this.itemID,
                title: expenseValue,
                amount
            };

            this.itemID++;
            this.itemList.push(expense);

            this.addExpense(expense);
            this.showBalance();
        }
    }

    // ADD EXPENSE
    addExpense(expense) {
        const div = document.createElement('div');
        div.classList.add('expense');
        div.innerHTML = `
        <div class="expense-item d-flex justify-content-between ">
          <h6 class="expense-title d-flex justify-content-between   ">- ${expense.title}</h6>
          <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
          
        </div>
      `;
        this.expenseList.appendChild(div);
    }

    // TOTAL EXPENSES
    totalExpense() {
        let total = 0;

        if (this.itemList.length > 0) {
            total = this.itemList.reduce((accumulator, current) => {
                console.log(`total: ${accumulator}, value: ${current.amount}`);
                accumulator += current.amount;

                return accumulator;
            }, 0);
        }

        this.expenseAmount.textContent = total;

        return total;
    }
}

// EVENTS
function eventListeners() {
    const incomeForm = document.getElementById('income-form');
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    const display = new Display();

    // income form submit
    incomeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        display.submitIncome();
    });

    // expense form submit
    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        display.submitExpenseForm();
    });

    // expense list click
    expenseList.addEventListener('click', function () {

    });
}

document.addEventListener('DOMContentLoaded', function () {
    eventListeners();
});


