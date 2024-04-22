let currentCurrency = document.querySelectorAll(".left .buttons div");
let selectedCurrency = document.querySelectorAll(".right .buttons div");
let inputRight = document.querySelector(".right input");
let inputLeft = document.querySelector(".left input");

fetch("https://v6.exchangerate-api.com/v6/333b1f550ae7d8a0c7fc6f9a/latest/RUB")
.then(res => res.json())
.then(data => console.log(data.conversion_rates.USD));

currentCurrency.forEach((item)=>{
    item.addEventListener("click",()=>{
        item.style.backgroundColor="purple";
        fetch( `https://v6.exchangerate-api.com/v6/333b1f550ae7d8a0c7fc6f9a/latest/${item.innerHTML}`)
        .then(res => res.json())
        .then(data =>{
            inputRight.value=(data.conversion_rates.USD*(inputLeft.value))
            selectedCurrency.forEach((x)=>{
                x.addEventListener("click",()=>{
                    x.style.backgroundColor="purple";
                    let z = x.innerHTML;
                    console.log(z);
                    console.log(data.conversion_rates.x.innerHTML);
                    inputRight.value = data.conversion_rates.z*(inputLeft.value);
        })
            
    })      

})
    })
})


// selectedCurrency.forEach((item)=>{
//     item.addEventListener("click",()=>{

//         fetch( https://api.exchangerate.host/latest?base=${item.innerHTML}&symbols=RUB)
//         .then(res => res.json())
//         .then(data => input.innerHTML=data);

//         console.log(item.innerHTML);
//         currentCurrency.forEach((x)=>{
//             x.addEventListener("click",()=>{
    
//         fetch( https://api.exchangerate.host/latest?base=${item.innerHTML}&symbols=${x.innerHTML})
//         .then(res => res.json())
//         .then(data => input.innerHTML=data);

//     })      

//     })
// })

// })