let from = 'RUB';
let to = 'USD';

let inputFrom = document.getElementById("from");
let inputTo = document.getElementById("to");

let labelFrom = document.querySelector(".mini-info-from")
let labelTo = document.querySelector(".mini-info-to")


// Convert from currency to currency (selection and conversion)
let fromOption = document.querySelectorAll('.currency__from>li');
fromOption.forEach(button => {
    button.addEventListener('click', function () {
        fromOption.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');    
        from = this.textContent;
        convert(inputFrom,inputTo);
    });
});
let toOption = document.querySelectorAll('.currency__to>li');
toOption.forEach(button => {
    button.addEventListener('click', function () {
        toOption.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        to = this.textContent;
        convert(inputFrom,inputTo);
    });
});
function convert(f,t){
    fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
    .then(res => res.json())
    .then(data => {
            t.value = f.value * data.rates[`${to}`];
            t.value = parseFloat(t.value).toFixed(3);

            // Bottom info currency change
            labelFrom.textContent = "1 " + from + " = " + Math.round((data.rates[`${to}`]) * 10000) / 10000 + " " + to;
            labelTo.textContent = "1 " + to + " = " + Math.round((1 / data.rates[`${to}`]) * 10000) / 10000 + " " + from;
        })
    offlineMode();
}

// Conversion calculation on value changed
inputFrom.addEventListener("input", (e) => {
    fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
    .then(res => res.json())
    .then(data => {
            inputTo.value = inputFrom.value * data.rates[`${to}`];
            inputTo.value = parseFloat(inputTo.value).toFixed(3);
            if(inputFrom.value === "") inputTo.value = "";
        })
});
inputTo.addEventListener("input", (e) => {
    fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
    .then(res => res.json())
    .then(data => {
            inputFrom.value = inputTo.value / data.rates[`${to}`];
            inputFrom.value = parseFloat(inputFrom.value).toFixed(3);
            if(inputTo.value === "") inputFrom.value = "";
        })
});

function offlineMode(){
    if(!navigator.onLine){
        document.querySelector(".converter").style.display = "none";
        document.querySelector(".offline").style.display = "block";
    }
}