city=document.querySelector("[city]")
state_code=document.querySelector("[state_code]")
country_code=document.querySelector("[country_code]")
search_button=document.querySelector("[search_button]")
city_checkbox=document.querySelector("[city_checkbox]")
state_checkbox=document.querySelector("[state_checkbox]")
country_checkbox=document.querySelector("[country_checkbox]")

//API key
let API="0fbb7f86934ccf487afff16655db9a70";

//array of checkboxes elements
let checkboxes=[city_checkbox,country_checkbox,state_code]


//function for respective api-calls based on the boxes checked

//function for city
async function city_call(){
    try{
        let data=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${API}`)
        return await data.json()
    }catch(e){
        console.log(e);
    }
}

//function for country_code
async function country_call(){
    try{
        let data=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value},${country_code.value}&appid=${API}`)
        let res=await data.json()
        return res
    }catch(e){
        console.log(e);
    }
}

//function for state_code
async function state_call(){
    try{
        let data=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value},${state_code.value},${country_code.value}&appid=${API}`)
        let res=await data.json()
        return res
    }catch(e){
        console.log(e);
    }
}


//function call of the WeatherApp API
function main_weather_function(temp_checkbox){
    let len=temp_checkbox.length;
    if(len==0){
        alert("Please check one of the boxes");
        return;
    }
    if(len==1){
        return city_call();
    }
    if(len==2){
        return state_call();
    }
    return country_call();
}

// function for the search button
search_button.addEventListener('click',async function(){
    let cnt=0;
    let temp_checkbox=[];
    for(let i=0;i<checkboxes.length;i++){
        if(checkboxes[i].checked){
            cnt++;
            temp_checkbox.push(i);
            if(cnt!=i+1){
                alert("Please check the previous checkBoxes else the request cannot be fullfilled")
                return;
            }
        }
    }
    if(cnt==0){
        alert("Please tick at least one Check-box to know the weather of desired location");
        return;
    }
    let data_obtained=await main_weather_function(temp_checkbox)
})