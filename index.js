city=document.querySelector("[city]")
state_code=document.querySelector("[state_code]")
country_code=document.querySelector("[country_code]")
search_button=document.querySelector("[search_button]")
city_checkbox=document.querySelector("[city_checkbox]")
state_checkbox=document.querySelector("[state_checkbox]")
country_checkbox=document.querySelector("[country_checkbox]")

//API key
let API="40fc26f8deafa1f4e81aa304dd5685fc";

//array of checkboxes elements
let checkboxes=[city_checkbox,state_code,country_checkbox]

// function for the search button
search_button.addEventListener('click',function(){
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
    main_weather_function(temp_checkbox)
})

//function call of the WeatherApp API
async function main_weather_function(temp_checkbox){
    let len=temp_checkbox.length;
    if(len==0){
        alert("Please check one of the boxes");
        return;
    }
    if()
}