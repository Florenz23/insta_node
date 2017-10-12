function postImage(){
  console.log("moin")
}
function start() {
  let i = 0;
  var interval = setInterval(function(str1, str2) {
    i++
    console.log(str1 +i+ " " + str2);
    postImage()
  }, 1000*1*1, "Hello.", "How are you?");
}
start()
//Mili, Sekunden, Minuten
