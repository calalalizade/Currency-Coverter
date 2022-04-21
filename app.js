let from = 'RUB';
let to = 'USD';

// Convert from currency (Selection)
let fromOption = document.querySelectorAll('.currency__from>li');
fromOption.forEach(button => {
    button.addEventListener('click', function () {
        fromOption.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');    
        from = this.textContent;    
    });
});

// To currency (Selection)
let toOption = document.querySelectorAll('.currency__to>li');
toOption.forEach(button => {
    button.addEventListener('click', function () {
        toOption.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        to = this.textContent;
    });
});

// Conversion calculation
let inputFrom = document.getElementById("from");
let inputTo = document.getElementById("to");
inputFrom.addEventListener("input", (e) => {
    fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
    .then(res => res.json())
    .then(data => {
            inputTo.value = inputFrom.value * data.rates[`${to}`];
            inputTo.value = parseFloat(inputTo.value).toFixed(3);
        })
});

inputTo.addEventListener("input", (e) => {
    fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
    .then(res => res.json())
    .then(data => {
            inputFrom.value = inputTo.value / data.rates[`${to}`];
            inputFrom.value = parseFloat(inputFrom.value).toFixed(3);
        })
});



let test = document.querySelector("#signIn");
test.addEventListener('click', ()=>{
    console.log('from: ' + from);
    console.log("to: " + to);
})