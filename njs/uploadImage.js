var Client = require('instagram-private-api').V1;
var device = new Client.Device('realegon');
var storage = new Client.CookieFileStorage(__dirname + '/cookies/file.json');

var pathOrStream = './img/test.jpg';


// And go for login
Client.Session.create(device, storage, 'realegon', 'asdfasdf')
  .then(function(session){
  return [Client.Upload.photo(session, pathOrStream), session]
  })
  .spread(function(upload, session) {
  return Client.Media.configurePhoto(session, upload.params.uploadId, "you can provide caption or go let it go")
  })
  .then(function(medium) {
  console.log(medium) // -> return Instance of Client.Media
  })
