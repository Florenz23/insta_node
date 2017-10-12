var Client = require('instagram-private-api').V1;
var device = new Client.Device('realegon');
var storage = new Client.CookieFileStorage('../cookies/file.json');

function post(counter){
  var pathOrStream = `../img/image_ready/white_${counter}.jpg`;
  var caption = '\n•\n•\n•\n•\n•\n•#work #success #working #grind #founder #startup #money #motivationquotes #moneymaker #motivationdaily #startuplife #successful #motivationiskey #inspiredaily #hardwork #hardworkpaysoff #desire #motivation #motivational #lifestyle #happiness #entrepreneur #entrepreneurs #entrepreneurship #entrepreneurlife #business #businessman #quoteoftheday #businessowner #businesswoman'

  // And go for login
  Client.Session.create(device, storage, 'realegon', 'asdfasdf')
    .then(function(session){
    return [Client.Upload.photo(session, pathOrStream), session]
    })
    .spread(function(upload, session) {
    return Client.Media.configurePhoto(session, upload.params.uploadId, caption)
    })
    .then(function(medium) {
    console.log(medium) // -> return Instance of Client.Media
    })
}
function start() {
  let i = 1;
  var interval = setInterval(function(str1, str2) {
    i++
    console.log(str1 +i+ " " + str2);
    post(i)
  }, 1000*60*60*3, "Hello.", "How are you?");
}

start()
