document.addEventListener("DOMContentLoaded", function() {
    function createFlower() {
        const flower = document.createElement("div");
        flower.classList.add("flower");
        flower.innerHTML = "🌸"; 
        document.body.appendChild(flower);


        flower.style.left = Math.random() * 100 + "vw";
        flower.style.animationDuration = Math.random() * 3 + 3 + "s"; 

     
        setTimeout(() => {
            flower.remove();
        }, 6000);
    }


    setInterval(createFlower, 500);
});

