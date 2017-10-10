var http = require('http');
var Insta = require('./node_modules/instagram-nodejs-without-api/instagram')

let Instagram = new Insta()


Instagram.getCsrfToken().then((csrf) =>
{
  Instagram.csrfToken = csrf;
}).then(() =>
{
  Instagram.auth('realflorenzerstling', 'SAFREIIY').then(sessionId =>
  {
    Instagram.sessionId = sessionId
    console.log(Instagram)
    Instagram.Upload.photo(session, './img/test.jpg')
    	.then(function(upload) {
    		// upload instanceof Client.Upload
    		// nothing more than just keeping upload id
    		console.log(upload.params.uploadId);
    		return Client.Media.configurePhoto(session, upload.params.uploadId, 'akward caption');
    	})
    	.then(function(medium) {
    		// we configure medium, it is now visible with caption
    		console.log(medium.params)
    	})

    // Instagram.getUserDataByUsername('realflorenzerstling').then((t) =>
    // {
    //   // console.log(t)
    //   Instagram.getUserFollowers(JSON.parse(t).user.id).then((t) =>
    //   {
    //     // console.log(t); // - instagram followers for user "username-for-get"
    //   })
    // })

  })
})
