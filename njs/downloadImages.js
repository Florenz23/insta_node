var fs = require('fs'),
request = require('request');

var postInfo = require('./data/data.json')

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

function start() {
  download(postInfo[0].img, './download/image.jpg', function(){
      console.log('done');
  });
}

start()
