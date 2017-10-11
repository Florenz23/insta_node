var _ = require('lodash');
var Promise = require('bluebird');

var Client = require('instagram-private-api').V1;
var device = new Client.Device('realegon');
var storage = new Client.CookieFileStorage('../cookies/file.json');
var jsonfile = require('jsonfile')
var pathOrStream = './img/test.jpg';

var userId = 1531281932

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
    	var media = _.flatten(results);
    	var postInfo = _.map(media, function(medium) {
        if (medium._params.mediaType == 1) {
      		return createPostInfoObject(medium._params)
        }
    	});
      writeFile(postInfo)
    })
  })
