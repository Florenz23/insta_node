var http = require('http');
var Insta = require('./node_modules/instagram-nodejs-without-api/instagram')

let Instagram = new Insta()
let pathOrStream = './img/test.jpeg'

Instagram.getCsrfToken().then((csrf) =>
{
  Instagram.csrfToken = csrf;
}).then(() =>
{
  Instagram.auth('realflorenzerstling', 'SAFREIIY').then(function(session) {
   		// Now you have a session, we can follow / unfollow, anything...
      console.log(Instagram.upload)
      return [Instagram.Upload.photo(session, pathOrStream), session]
	})

})
