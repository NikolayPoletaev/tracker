class ExpenseTrackerLite extends HTMLElement { 
    constructor() { 
    super(); 
    this.expenses = []; 
    this.total = 0; 

    this.attachShadow({ mode: 'open' }); 
    this.render(); 
    this.setupEventListeners(); 
    } 

    render() { 
    this.shadowRoot.innerHTML = ` 
        <div id="app"> 
            <label for="expense-name">Название покупки:</label> 
            <input type="text" id="expense-name" required> 

            <label for="expense-amount">Стоимость:</label> 
            <input type="number" id="expense-amount" required> 
            <button id="add-expense">Добавить покупку</button> 

            <ul id="expense-list"></ul> 
            <p>Общая сумма: <span id="total-amount">0</span></p> 
        </div> `; 
    } 

    setupEventListeners() { 
    const addButton = this.shadowRoot.getElementById('add-expense'); 

    addButton.addEventListener('click', () => { 
        this.addExpense(); 
    }); 
    } 

    addExpense() { 
    const nameInput = this.shadowRoot.getElementById('expense-name'); 
    const amountInput = this.shadowRoot.getElementById('expense-amount'); 
    const expenseList = this.shadowRoot.getElementById('expense-list'); 
    const totalAmount = this.shadowRoot.getElementById('total-amount'); 

    const name = nameInput.value; 
    const amount = parseFloat(amountInput.value); 

    if (name && !isNaN(amount)) { 
        this.expenses.push({ name, amount }); 
        this.total += amount; 

        this.renderExpenses(); 
        totalAmount.textContent = this.total.toFixed(2); 

        nameInput.value = ''; 
        amountInput.value = ''; 
    } 
    } 

    renderExpenses() { 
    const expenseList = this.shadowRoot.getElementById('expense-list'); 
    const li = document.createElement('li'); 
    const lastExpense = this.expenses[this.expenses.length - 1]; 
    li.textContent = `${lastExpense.name}: ${lastExpense.amount.toFixed(2)}`; 
    expenseList.appendChild(li); 
    } 
} 

customElements.define('expense-tracker-lite', ExpenseTrackerLite);