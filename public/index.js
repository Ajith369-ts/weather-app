
document.addEventListener("DOMContentLoaded", function(event) { 
    
    const d = new Date();
    hour = d.getHours();


    if(hour >6 && hour < 18){
        document.body.style.backgroundImage = "url(./images/light.svg)";
        document.body.style.backgroundColor = "#c78787";

        for(var i=0; i<4; i++){
            document.getElementsByClassName("box")[i].style.backgroundImage = "linear-gradient(215deg, #f4c280, #b97979)";
            document.getElementsByClassName("box")[i].style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
        }

    }
    else{
        document.body.style.backgroundImage = "url(./images/dark.svg)";
        document.body.style.backgroundColor = "#2c2c56";

        for(var i=0; i<4; i++){
            document.getElementsByClassName("box")[i].style.backgroundImage = "linear-gradient(215deg, #23234a, #718fcc)";
            document.getElementsByClassName("box")[i].style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
        }
    }
});