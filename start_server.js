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

    Instagram.getUserDataByUsername('realflorenzerstling').then((t) =>
    {
      console.log(t)
      Instagram.getUserFollowers(JSON.parse(t).user.id).then((t) =>
      {
        console.log(t); // - instagram followers for user "username-for-get"
      })
    })

  })
})

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(8080);
