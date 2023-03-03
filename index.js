city=document.querySelector("[city]")
state_code=document.querySelector("[state_code]")
country_code=document.querySelector("[country_code]")
search_button=document.querySelector("[search_button]")
city_checkbox=document.querySelector("[city_checkbox]")
state_checkbox=document.querySelector("[state_checkbox]")
country_checkbox=document.querySelector("[country_checkbox]")

//fetchign the final_result container elements

let temprature=document.querySelector("[temprature]")
let feels_like=document.querySelector("[feels_like]")
let humidity=document.querySelector("[humidity]")
let pressure=document.querySelector("[pressure]")
//special
let wind_speed=document.querySelector("[wind_speed]")
let wind_direction=document.querySelector("[wind_direction]")

let cloud=document.querySelector("[cloud]")
let visibility=document.querySelector("[visibility]")
let precipitation=document.querySelector("[precipitation]")
let weather=document.querySelector("[weather]")
let last_update=document.querySelector("[last_update]")
let lat=document.querySelector("[lat]")
let lon=document.querySelector("[lon]")


//API key
let API="0fbb7f86934ccf487afff16655db9a70";

//fetching the container
let display_container=document.querySelector("[display_container]")
let search_container=document.querySelector("[search_container]")

//by default it will be hidden
let display_container_class=display_container.classList
display_container_class.toggle("hidden")

//search continer classList
let search_container_class=search_container.classList

//setting this to false as the call has not been made once
let results_inserted=false;

//capturing the rest of the two buttons
let result_button=document.querySelector("[result_button]")
let search_button_1=document.querySelector("[search_button_1]")

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


//function for hiding search container and bringing result container
function bring_search_container(){
    display_container_class.toggle("hidden")
    search_container_class.remove("hidden")
}

//function for hiding result container and bringing search container
function bring_display_container(){
    if(results_inserted==false){
        alert("kindly enter the details so the result can be displayed")
        return;
    }else{
        search_container_class.toggle("hidden")
        display_container_class.remove("hidden");
    }
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
    console.log(data_obtained)
    temprature.textContent+=data_obtained.main.temp
    feels_like.textContent+=data_obtained.main.temp
    humidity.textContent+=data_obtained.main.humidity
    pressure.textContent+=data_obtained.main.pressure
//special
    wind_speed.textContent+=data_obtained.wind.speed
    wind_direction.textContent+=data_obtained.wind.deg

    cloud.textContent+=data_obtained.weather[0].description
    visibility+=data_obtained.visibility+" meteres"
    console.log(data_obtained.coord.lat)
    console.log(lat)
    lat.textContent+=data_obtained.coord.lat
    lon.textContent+=data_obtained.coord.lon
    //check that there is some info to display
    results_inserted=true;

    bring_display_container();
})

//result button even listener 
result_button.addEventListener('click',bring_display_container);

search_button_1.addEventListener('click',bring_search_container);


