var Client = require('instagram-private-api').V1;
var device = new Client.Device('realegon');
var storage = new Client.CookieFileStorage('../cookies/file.json');

let counter_quote_normal = 0
let counter_quote_bam = 0
let counter_post = 0

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uploadImageToInstagram(caption, image_url) {

  Client.Session.create(device, storage, 'realegon', 'asdfasdf')
    .then(function(session){
    return [Client.Upload.photo(session, image_url), session]
    })
    .spread(function(upload, session) {
    return Client.Media.configurePhoto(session, upload.params.uploadId, caption)
    })
    .then(function(medium) {
    // console.log(medium) // -> return Instance of Client.Media
    })

}
function setImageUrl() {
  let image_url
  image_url = ""
  if (counter_post == 0 || counter_post == 2 || counter_post == 6 || counter_post == 8){
    image_url = `../img/quote_normal/quote_normal_${counter_quote_normal}.jpg`;
  }
  if (counter_post == 1){
    image_url = `../img/image_ready/regular/doit.jpg`;
  }
  if (counter_post == 3){
    image_url = `../img/image_ready/regular/teach.jpg`;
  }
  if (counter_post == 5){
    image_url = `../img/image_ready/regular/read.jpg`;
  }
  if (counter_post == 7){
    image_url = `../img/image_ready/regular/live.jpg`;
  }
  if (counter_post == 4){
    image_url = `../img/quote_bam/quote_bam${counter_quote_bam}.jpg`;
  }
  return image_url
}

function post(){
  var image_url = setImageUrl();
  var caption = '\n•\n•\n•\n•\n•\n•\n#work #success #working #grind #founder #startup #money #motivationquotes #moneymaker #motivationdaily #startuplife #successful #motivationiskey #inspiredaily #hardwork #hardworkpaysoff #desire #motivation #motivational #lifestyle #happiness #entrepreneur #entrepreneurs #entrepreneurship #entrepreneurlife #business #businessman #quoteoftheday #businessowner #businesswoman'

  console.log(image_url)
  // uploadImageToInstagram(caption,image_url)

}

function manageCounter(){
  if (counter_post == 9) {
    counter_post = 0
  }
  counter_quote_normal ++
  counter_quote_bam ++
  counter_post ++
  console.log(counter_quote_normal)
}
(function loop() {
    var rand = getRandomInt(1*1000,3*1000);
    setTimeout(function() {
            loop()
            post()
            manageCounter()
    }, (1000*1+rand))
}());
