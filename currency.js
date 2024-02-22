
const main_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector('button');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const mssg = document.querySelector('.msg');
for(let select of dropdowns){
    for(let code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        if(select.name === "from" && code === "USD"){
            newOption.selected = "selected"
        } else if (select.name === "to" && code === "INR"){
            newOption.selected = "selected"
        }
        select.appendChild(newOption);
    }
    select.addEventListener("change",(event)=>{
        updateFlag(event.target)
    });
}
function updateFlag(element){
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentNode.querySelector('img')
    img.src = newSrc;
}
btn.addEventListener("click", async (event)=>{
    event.preventDefault();
    let amount = document.querySelector('.amount input');
    let amountVal = amount.value;
    if(amount.value === "" || amount.value < 1) {
        amount.value = 1;
    }
    const url = `${main_url}${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()] 
    let finalAmount = Math.floor(amountVal * rate)
    mssg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})