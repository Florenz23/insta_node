function postImage(){
  console.log(new Date())
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startTimer(from,to) {}

(function loop() {
    var rand = getRandomInt(1*1000,3*1000);
    setTimeout(function() {
            startTimer();
            loop();
            postImage()
    }, (1000*1+rand));
}());
//Mili, Sekunden, Minuten
