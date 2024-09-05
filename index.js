

try{
    fetch("https://api.weatherapi.com/v1/current.json?key=2733231b998c430bbc1124303242908&q=Sri Lanka")
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        document.getElementById("tempC").textContent=data["current"]["temp_c"]+" C"
        document.getElementById("tempF").textContent=data["current"]["temp_f"]+" F"
        document.getElementById("hum").textContent=data["current"]["humidity"]
        document.getElementById("windS_m").textContent=data["current"]["wind_mph"]+" mph"
        document.getElementById("windS_k").textContent=data["current"]["wind_kph"]+" kpm"
        document.getElementById("pressure_mbar").textContent=data["current"]["pressure_mb"]+" mbar"
    })
    }
    catch(error){
        console.log("Error : "+error)
    }




const toggle = document.getElementById("darkmode-toggle");

    toggle.addEventListener("change", function() {
        if (toggle.checked) {
            document.querySelector("body").classList.add("bg");
            console.log("Dark mode enabled");
        } else {
            document.querySelector("body").classList.remove("bg");
            console.log("Dark mode disabled");
        }
        });

function setBody(){
    const days=document.getElementById("SelectDays").value
    let body=``;
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=2733231b998c430bbc1124303242908&q=Sri Lanka&days=${days}`)
    .then(res=>res.json())
    .then(data=>{
        data["forecast"]["forecastday"].forEach(e => {
            body+=`<tr>
                <th id="TH">${e["date"]}</th>
                <td>${e["day"]["avgtemp_c"]} C , ${e["day"]["avgtemp_f"]} F</td>
                <td>${e["day"]["avghumidity"]}</td>
                <td>${e["day"]["maxwind_mph"]} mph , ${e["day"]["maxwind_kph"]} kph</td>
                <td>${e["day"]["totalprecip_mm"]} mbar</td>

                </tr>`
    })
    document.getElementById("tableBody").innerHTML=body;

        })
    }
window.onload=setBody();

document.getElementById("popup").classList.add("hide");
document.getElementById("btnPreviousWeather").onclick=function(){
    document.getElementById("popup").classList.remove("hide")

}
document.getElementById("btnClose").onclick=function(){
    document.getElementById("popup").classList.add("hide")

}

document.getElementById("getDate").onclick=function(){
    const date=document.getElementById("txtDate").value
    try{
        fetch(`https://api.weatherapi.com/v1/history.json?key=2733231b998c430bbc1124303242908&q=Sri Lanka&dt=${date}`)
        .then(res=>res.json())
        .then(data=>{
            document.getElementById("Htemp_C").textContent=data["forecast"]["forecastday"][0]["day"]["avgtemp_c"]+" C , "
            document.getElementById("Htemp_F").textContent=data["forecast"]["forecastday"][0]["day"]["avgtemp_f"]+" F"
            document.getElementById("Hhum").textContent=data["forecast"]["forecastday"][0]["day"]["avghumidity"]
            document.getElementById("HwindS_m").textContent=data["forecast"]["forecastday"][0]["day"]["maxwind_mph"]+" mph , "
            document.getElementById("HwindS_k").textContent=data["forecast"]["forecastday"][0]["day"]["maxwind_kph"]+" kph"
            document.getElementById("Hpre").textContent=data["forecast"]["forecastday"][0]["day"]["totalprecip_mm"]+" mbar"
        })
    }
    catch(error){
        alert("Invalid Date. Please try again !")
        console.log("Error : "+error);
        
    }
}
document.getElementById("btnMap").onclick=function(){
    window.open("https://zoom.earth/");
}

