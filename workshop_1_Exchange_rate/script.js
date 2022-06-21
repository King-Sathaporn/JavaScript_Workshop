const base_url = `https://v6.exchangerate-api.com/v6/954d7ca4d0b0b212ab57dba0/latest`;

const currency_one = document.getElementById('currency-one');
const currency_two = document.getElementById('currency-two');

const amount_one = document.getElementById('amount-one');
const amount_two = document.getElementById('amount-two');

const rateText = document.getElementById('rate');
const swap = document.getElementById('btn');

currency_one.addEventListener('change',calculate);
currency_two.addEventListener('change',calculate);
amount_one.addEventListener('input',calculate);
amount_two.addEventListener('input',calculate);



function calculate(){
    const cur_one = currency_one.value;
    const cur_two = currency_two.value;
    fetch(`${base_url}/${cur_one}`)
    .then(res=>res.json()).then(data=>{
        const rate = data.conversion_rates[cur_two];
        rateText.innerText=`1 ${cur_one} = ${rate} ${cur_two}`;
        amount_two.value = (amount_one.value * rate).toFixed(2);
    })
}
swap.addEventListener('click',()=>{
    const temp = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = temp;
    calculate();
})

calculate();