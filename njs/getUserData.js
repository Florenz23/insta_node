var _ = require('lodash');
var Promise = require('bluebird');
var fs = require('fs'),
request = require('request');


var Client = require('instagram-private-api').V1;
var device = new Client.Device('realegon');
var storage = new Client.CookieFileStorage('../cookies/file.json');
var jsonfile = require('jsonfile')
var pathOrStream = './img/test.jpg';

var userId = 1531281932

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

function writeFile(data) {
  var file = './data/data.json'
  jsonfile.writeFile(file, data, function (err) {
    console.error(err)
  })
}

function createPostInfoObject(params){
  let obj = {
    "url": params.webLink,
    "img": params.images[0].url,
    "likes": params.likeCount,
    "comments": params.commentCount,
    "time": params.deviceTimestamp,
    "type": params.mediaType,
  }

  return obj
}
// And go for login
Client.Session.create(device, storage, 'realegon', 'asdfasdf')
  .then(function(session){
    var feed = new Client.Feed.UserMedia(session, userId);

    Promise.mapSeries(_.range(0, 2), function() {
    	return feed.get();
    })
    .then(function(results) {
    	// result should be Media[][]
    	var media = _.flatten(results);
      // console.log(media[0]._params.likeCount)
      // console.log(media[0]._params.commentCount)
      // console.log(media[0]._params.deviceTimestamp)
      // console.log(media[0]._params.webLink)
      // console.log(media[4]._params)
    	var postInfo = _.map(media, function(medium) {
        if (medium._params.mediaType == 1) {
      		return createPostInfoObject(medium._params) 
        }
    		// return _.last(medium.images)
    	});
      // var postInfoJson = JSON.stringify(postInfo);
      writeFile(postInfo)
      download(postInfo[0].img, './download/image.jpg', function(){
        console.log('done');
      });
    })
  })
