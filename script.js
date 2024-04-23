let currentCurrency = document.querySelectorAll(".left .buttons div");
let selectedCurrency = document.querySelectorAll(".right .buttons div");
let inputRight = document.querySelector(".right input");
let inputLeft = document.querySelector(".left input");
let pLeft = document.querySelector(".left .content p");
let pRight = document.querySelector(".right .content p");

let currentValue = "RUB";
let selectedValue = "USD";
let isActive = "inputLeft";

function updateConversion() {
    if(isActive == "inputLeft" ){
    fetch(`https://v6.exchangerate-api.com/v6/79761deae2c772e1188646a0/latest/${currentValue}`)
    .then(res => res.json())
    .then(data => {
        inputRight.value = data.conversion_rates[selectedValue] * inputLeft.value;
    });
}else{
    fetch(`https://v6.exchangerate-api.com/v6/79761deae2c772e1188646a0/latest/${selectedValue}`)
        .then(res => res.json())
        .then(data => {
        inputLeft.value = data.conversion_rates[currentValue] * inputRight.value;
    });
}
}

currentCurrency.forEach(item => {
    item.addEventListener("click", () => {
        currentCurrency.forEach(el => {
            el.style.backgroundColor = "";
            el.style.color = ""}); 
        item.style.backgroundColor = "rgb(131, 58, 224)";
        item.style.color = "white";
        currentValue = item.innerHTML;
        updateConversion();
        fetch(`https://v6.exchangerate-api.com/v6/79761deae2c772e1188646a0/latest/${currentValue}`)
        .then(res => res.json())
        .then(data => {
         pLeft.innerHTML= `1 ${currentValue} = ${data.conversion_rates[selectedValue]} ${selectedValue} `
       })
       fetch(`https://v6.exchangerate-api.com/v6/79761deae2c772e1188646a0/latest/${selectedValue}`)
        .then(res => res.json())
        .then(data => {
         pRight.innerHTML= `1 ${selectedValue} = ${data.conversion_rates[currentValue]} ${currentValue} `
       })

    });
    
});

selectedCurrency.forEach(item => {
    item.addEventListener("click", () => {
        selectedCurrency.forEach(el => {
            el.style.backgroundColor = "";
            el.style.color = ""}); 
        item.style.backgroundColor = "rgb(131, 58, 224)";
        item.style.color = "white";
        selectedValue = item.innerHTML;
        updateConversion();
        fetch(`https://v6.exchangerate-api.com/v6/79761deae2c772e1188646a0/latest/${currentValue}`)
        .then(res => res.json())
        .then(data => {
         pLeft.innerHTML= `1 ${currentValue} = ${data.conversion_rates[selectedValue]} ${selectedValue} `
       })
       fetch(`https://v6.exchangerate-api.com/v6/79761deae2c772e1188646a0/latest/${selectedValue}`)
        .then(res => res.json())
        .then(data => {
         pRight.innerHTML= `1 ${selectedValue} = ${data.conversion_rates[currentValue]} ${currentValue} `
       })
    });
});
inputLeft.addEventListener("input",()=>{
    if( /^(\d*\.?\d*|\d*,?\d*)$/.test(inputLeft.value)){
      if(inputLeft.value.indexOf(',') != -1){
        inputLeft.value = inputLeft.value.split(",").join(".");
        console.log(inputLeft.value);
        isActive = "inputLeft";
      }
      updateConversion();

    }else{
        inputLeft.value=inputLeft.value.slice(0, inputLeft.value.length-1);
    }
    
})
inputRight.addEventListener("input",()=>{
    isActive = "inputRight";
    updateConversion();
})

updateConversion();