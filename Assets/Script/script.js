const searchBtn = document.querySelector("#search");
const searchInput = document.querySelector("#text");


searchBtn.addEventListener("click", ()=>{
    console.log(searchInput.value);
    const location = searchInput.value;
    if(location!= ""){
        // Get data
        fetchWeather(location).then((data)=>{
            // Update data inside DOM
            if(data != null){
                updateDOM(data);
            }
            
        })
        
    }
})

function updateDOM(data){
    console.log("I'll Update data");
    const temprature = document.querySelector("#temperature");
    const name = document.querySelector(".location");
    const time = document.querySelector(".time");
    const date = document.querySelector(".date");
    const condition = document.querySelector(".condition");
    const icon = document.querySelector(".icon");
    temprature.textContent = data.current.temp_c + "°C";
    name.textContent = data.location.name;

    // Split data and time using split function
    const [dateData,timeData] = data.location.localtime.split(" ");
    time.textContent = timeData;
    date.textContent = dateData;

    condition.textContent = data.current.condition.text;

    const iconImg = data.current.condition.icon;
    icon.src = iconImg;
    searchInput.value = null;
}

async function fetchWeather(location){
    const url = `https://api.weatherapi.com/v1/current.json?key=b4c12b7b484c4a94995182829251802&q=${location}&aqi=no`;

    const response = await fetch(url);
    console.log(response);
    
    if(response.status == 200){
        const json = await response.json();
        console.log(json);
        return json;
    }else if(response.status ==404){
        alert("Data not found.");
        searchInput.value = null;

        return null;
    }else{
        alert("Invalid Location!");
        searchInput.value = null;

        return null;
    }
}

