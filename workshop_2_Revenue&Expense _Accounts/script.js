const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount');

const dataTransactions = []

let transactions = dataTransactions

function init(){
    list.innerHTML = '';
    transactions.forEach(addDataToList);
    calculateBalance();
}
function formatNumber(n){
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function generateID(){
    return Math.floor(Math.random() * 100000000);
}

function addDataToList(transactions){
    const symbol = transactions.amount < 0 ? '-': '+';
    const item = document.createElement('li');
    item.className = transactions.amount < 0 ? 'minus': 'plus';
    item.innerHTML = `${transactions.text}<span>฿ ${symbol}${formatNumber(Math.abs(transactions.amount))}</span> <button class="delete-btn" onClick="deleteData(${transactions.id})">x</button>`;
    list.appendChild(item);
}

function calculateBalance(){
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const revenue = amounts.filter(item=>item>0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = amounts.filter(item=>item<0).reduce((acc, item)=>(acc += item),0).toFixed(2);
    balance.innerText = `฿` +formatNumber(total);
    money_plus.innerText = `฿` +formatNumber(revenue);
    money_minus.innerText = `฿` +formatNumber(expense);
}

function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === "" || amount.value.trim() === ""){
        alert('Please fill in all fields');
    }else{
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: parseInt(amount.value)
        }
        transactions.push(transaction);
        addDataToList(transaction);
        calculateBalance();
        text.value = "";
        amount.value = "";
    }
}

function deleteData(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}

form.addEventListener('submit', addTransaction);

init();