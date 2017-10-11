var fs = require('fs'),
request = require('request');

var postInfo = require('./data/data.json')

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

function start() {
  for (var i = 0;i<50;i++){
    download(postInfo[i].img, `./download/liked/most_liked_${i}.jpg`, function(){
    // download(postInfo[i].img, `./download/most_comment_${i}.jpg`, function(){
        // console.log('done image_' + i);
    });
  }
}

start()
