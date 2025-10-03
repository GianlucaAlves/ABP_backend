// --- Script para o PRIMEIRO carrossel ---
let count1 = 1;
document.getElementById("radio1").checked = true;

setInterval(function() {
    nextImage1();
}, 3000); 

function nextImage1() {
    count1++;
    if (count1 > 4) {
        count1 = 1;
    }
    document.getElementById("radio" + count1).checked = true;
}


// --- Script para o SEGUNDO carrossel ---
let count2 = 1;
document.getElementById("radio1-2").checked = true; 

setInterval(function() {
    nextImage2();
},3000);

function nextImage2() {
    count2++;
    if (count2 > 6) {
        count2 = 1;
    }
    document.getElementById("radio" + count2 + "-2").checked = true;
}