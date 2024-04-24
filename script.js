let currentCurrency = document.querySelectorAll(".left .buttons div");
let selectedCurrency = document.querySelectorAll(".right .buttons div");
let inputRight = document.querySelector(".right input");
let inputLeft = document.querySelector(".left input");
let pLeft = document.querySelector(".left .content p");
let pRight = document.querySelector(".right .content p");
let errMessage = document.querySelector(".err");

let currentValue = "RUB";
let selectedValue = "USD";
let isActive = "inputLeft";
inputLeft.value = 1;

fetch(`https://v6.exchangerate-api.com/v6/9e7d284ce57596813ba6df0a/latest/${currentValue}`)
        .then(res => res.json())
        .then(data => {
         pLeft.innerHTML= `1 ${currentValue} = ${data.conversion_rates[selectedValue]} ${selectedValue} `
       })
       fetch(`https://v6.exchangerate-api.com/v6/9e7d284ce57596813ba6df0a/latest/${selectedValue}`)
        .then(res => res.json())
        .then(data => {
         pRight.innerHTML= `1 ${selectedValue} = ${data.conversion_rates[currentValue]} ${currentValue} `
       })

function updateConversion() {
    console.log("A request is sent to the server");
    if(isActive == "inputLeft" ){
    fetch(`https://v6.exchangerate-api.com/v6/9e7d284ce57596813ba6df0a/latest/${currentValue}`)
    .then(res => {
        if (res.ok) {
            errMessage.style.display="none";
        }
        return res.json()})
    .then(data => {
        let x = (data.conversion_rates[selectedValue] * inputLeft.value).toString();
        let decimalIndex = x.indexOf('.');
        if (decimalIndex === -1) {
            inputRight.value = (data.conversion_rates[selectedValue] * inputLeft.value).toFixed(5);
        } else {
            inputRight.value = x.slice(0, decimalIndex + 6);
        }
        pLeft.innerHTML= `1 ${currentValue} = ${data.conversion_rates[selectedValue]} ${selectedValue} `
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        errMessage.style.display="block";
    });
}else{
    fetch(`https://v6.exchangerate-api.com/v6/9e7d284ce57596813ba6df0a/latest/${selectedValue}`)
        .then(res => res.json())
        .then(data => {
            let x = (data.conversion_rates[currentValue] * inputRight.value).toString();
        let decimalIndex = x.indexOf('.');
        if (decimalIndex === -1) {
            inputLeft.value = (data.conversion_rates[currentValue] * inputRight.value).toFixed(5);
        } else {
            inputLeft.value = x.slice(0, decimalIndex + 6);
        }
        pLeft.innerHTML= `1 ${currentValue} = ${data.conversion_rates[selectedValue]} ${selectedValue} `
    });
}
}
function updateInfo(){
    fetch(`https://v6.exchangerate-api.com/v6/9e7d284ce57596813ba6df0a/latest/${currentValue}`)
    .then(res => res.json())
    .then(data => {
     pLeft.innerHTML= `1 ${currentValue} = ${data.conversion_rates[selectedValue]} ${selectedValue} `
   })
   fetch(`https://v6.exchangerate-api.com/v6/9e7d284ce57596813ba6df0a/latest/${selectedValue}`)
    .then(res => res.json())
    .then(data => {
     pRight.innerHTML= `1 ${selectedValue} = ${data.conversion_rates[currentValue]} ${currentValue} `
   })
}

currentCurrency.forEach(item => {
    item.addEventListener("click", () => {
        currentCurrency.forEach(el => {
            el.classList.remove("purple-button")}); 
        item.classList.add("purple-button");
        currentValue = item.innerHTML;
        if(currentValue != selectedValue){
            updateConversion();
            updateInfo();
        }else{
            console.log("No request is sent to the server");
            if(isActive == "inputLeft"){
            inputRight.value = inputLeft.value;
            }else{
                inputLeft.value = inputRight.value;
            }
            pLeft.innerHTML= `1 ${currentValue} = 1 ${selectedValue} `;
            pRight.innerHTML = pLeft.innerHTML;
           }
        
    });
    
});

selectedCurrency.forEach(item => {
    item.addEventListener("click", () => {
        selectedCurrency.forEach(el => {
            el.classList.remove("purple-button")}); 
        item.classList.add("purple-button");
        selectedValue = item.innerHTML;
    if(currentValue != selectedValue){
        updateConversion();
        updateInfo();
    }else{
        console.log("No request is sent to the server");
        if(isActive == "inputLeft"){
        inputRight.value = inputLeft.value;
        }else{
            inputLeft.value = inputRight.value;
        }
        pLeft.innerHTML= `1 ${currentValue} = 1 ${selectedValue} `;
        pRight.innerHTML = pLeft.innerHTML;
       }
    });
});
inputLeft.addEventListener("input",()=>{
    if( /^(\d*\.?\d*|\d*,?\d*)$/.test(inputLeft.value)){
        isActive = "inputLeft";
        console.log(inputLeft.value[0]);
    if(inputLeft.value[0] == 0){
        if(/^[0-9]+$/.test(inputLeft.value[1])){
            inputLeft.value=inputLeft.value.slice(0, inputLeft.value.length-1);
        }
    }else if(inputLeft.value[0] == "." || inputLeft.value[0] == "," ){
        inputLeft.value = 0 + ".";
    }
      if(inputLeft.value.indexOf(',') != -1){
        inputLeft.value = inputLeft.value.split(",").join(".");
        console.log(inputLeft.value);
      }
      updateConversion();
    }else{
        inputLeft.value=inputLeft.value.slice(0, inputLeft.value.length-1);
    }
})

inputRight.addEventListener("input",()=>{
    if( /^(\d*\.?\d*|\d*,?\d*)$/.test(inputRight.value)){
        isActive = "inputRight";
        if(inputRight.value.indexOf(',') != -1){
          inputRight.value = inputRight.value.split(",").join(".");
          console.log(inputRight.value);
        }
        updateConversion();
      }else{
        inputRight.value=inputRight.value.slice(0, inputRight.value.length-1);
      }
})

// async function exampleAsyncFunction() {
//     try {
//         // Asynchronously fetch data from an API
//         const response = await fetch('https://v6.exchangerate-api.com/v6/9e7d284ce57596813ba6df0a/latest/**');
        
//         // If the response is successful, parse the JSON data
//         if (response.ok) {
//             const data = await response.json();
//             console.log(data);
//         } else {
//             throw new Error(`API Error: ${response.status}`);
//         }
//     } catch (error) {
//         console.error(error.message);
//     }
// }
// exampleAsyncFunction();


updateConversion();