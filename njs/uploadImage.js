process.env.TZ = 'Europe/Amsterdam'

var Client = require('instagram-private-api').V1;
var device = new Client.Device('realegon');
var storage = new Client.CookieFileStorage('../cookies/file.json');
var jsonfile = require('jsonfile');


let counter_quote_normal = 0;
let counter_quote_bam = 0;
let counter_post = 0;

function writeFile(filePath,data) {
  jsonfile.writeFile(filePath, data, function (err) {
    if(err){
      console.error(err);
    } else {
      // console.log("json saved");
    }
  })
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uploadImageToInstagram(caption, image_url) {

  Client.Session.create(device, storage, 'realegon', 'asdfasdf')
    .then(function(session){
    return [Client.Upload.photo(session, image_url), session];
    })
    .spread(function(upload, session) {
    return Client.Media.configurePhoto(session, upload.params.uploadId, caption);
    })
    .then(function(medium) {
    // console.log(medium) // -> return Instance of Client.Media
    })

}
function setImageUrl() {
  let image_url;
  let root_url = "../img/post_images";
  image_url = "";
  if (counter_post == 0 || counter_post == 2 || counter_post == 6 || counter_post == 8){
    image_url = `${root_url}/quote/quote_normal_${counter_quote_normal}.jpg`;
    counter_quote_normal ++;
  }
  if (counter_post == 1){
    image_url = `${root_url}/regular/regular/reg_0.jpg`;
  }
  if (counter_post == 3){
    image_url = `${root_url}/regular/regular/reg_1.jpg`;
  }
  if (counter_post == 5){
    image_url = `${root_url}/regular/regular/reg_2.jpg`;
  }
  if (counter_post == 7){
    image_url = `${root_url}/regular/regular/reg_3.jpg`;
  }
  if (counter_post == 4){
    image_url = `${root_url}/quote_bam/quote_bam__${counter_quote_bam}.jpg`;
    counter_quote_bam ++;
  }
  return image_url
}

function post(){
  var image_url = setImageUrl();
  var caption = '\n•\n•\n•\n•\n•\n•\n#work #success #working #grind #founder #startup #money #motivationquotes #moneymaker #motivationdaily #startuplife #successful #motivationiskey #inspiredaily #hardwork #hardworkpaysoff #desire #motivation #motivational #lifestyle #happiness #entrepreneur #entrepreneurs #entrepreneurship #entrepreneurlife #business #businessman #quoteoftheday #businessowner #businesswoman';

  manageCounter();
  saveCounter();
  saveLastPostToLog(image_url)
  // uploadImageToInstagram(caption,image_url)

}

function saveLastPostToLog(image_url) {
  let obj = {
    "time" : new Date(),
    "img_name" : image_url
  };
  obj = JSON.stringify(obj);
  obj = obj + "\n";
  var fs = require('fs');
  fs.appendFileSync('post_log.json', obj);
}

function saveCounter(){
    let obj = {
      "counter_post" : counter_post,
      "counter_quote_bam" : counter_quote_bam,
      "counter_quote_normal": counter_quote_normal,
      "time" : new Date()
    }
    writeFile('./counter_log.json',obj)
}
function readCounter() {
  let obj = require ('./counter_log.json');
  return obj;
}
function setCounterFromJson() {
  let obj = readCounter();
  if (obj.counter_post && obj.counter_quote_bam && obj.counter_quote_normal) {
    counter_post = obj.counter_post
    counter_quote_bam = obj.counter_quote_bam
    counter_quote_normal = obj.counter_quote_normal
  }
}

function manageCounter(){
  counter_post ++;
  if (counter_post == 9) {
    counter_post = 0;
  }
  console.log(counter_post);
}
function start(){
  setCounterFromJson();
  post();
  (function loop() {
      var rand = getRandomInt(1000*60*1,1000*60*3);
      setTimeout(function() {
              loop();
              if (new Date().getHours() > 4){
                post();
              }
      // }, (1000*60*60*3+rand))
    }, (1000*1))
  }());
}
start();
