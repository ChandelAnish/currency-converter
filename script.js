//update flag function
function updateFlag(select)
{
    if(select.name==="from")
    {
        let country=countryList[select.value];
        let img=document.getElementById("imgfrom");
        img.src=`https://flagsapi.com/${country}/flat/64.png`
    }
    else if(select.name==="to")
    {
        let country=countryList[select.value];
        let img=document.getElementById("imgto");
        img.src=`https://flagsapi.com/${country}/flat/64.png`
    }
}


//option for dropdown
let dropdowns=document.querySelectorAll(".dropdown select")
for(let select of dropdowns)
{
    for(let currency in countryList)
    {
        let newOption=document.createElement("option");
        newOption.innerText=currency;
        newOption.value=currency;
        if(select.name==="from" && currency==="USD")
        {
            newOption.selected="selected"
        }
        else if(select.name==="to" && currency==="INR")
        {
            newOption.selected="selected"
        }
        select.appendChild(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

//button click
let btn=document.querySelector(".btn")
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.getElementById("amtp");
    let amtval=amount.value;
    if(amtval==="" || amtval<0)
    {
        amtval=1;
        amount.value=1;
    }


    let curry1=document.querySelectorAll(".dropdown select")[0].value;
    let curry2=document.querySelectorAll(".dropdown select")[1].value;
    curry1=curry1.toLowerCase()
    curry2=curry2.toLowerCase()
    let response= await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${curry1}/${curry2}.json`)
    let data=await response.json();
    let rate=data[curry2]
    let exchangevalue =amtval*rate;
    let msg=document.querySelector(".msg");
    curry1=curry1.toUpperCase()
    curry2=curry2.toUpperCase()
    msg.innerText=`${amtval} ${curry1} = ${exchangevalue} ${curry2}`
})

document.addEventListener('load',reload())
async function reload()
{
    let response= await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json`)
    let data=await response.json();
    let rate=data.inr;
    let exchangevalue =100*rate;
    let msg=document.querySelector(".msg");
    msg.innerText=`100 USD = ${exchangevalue} INR`
}