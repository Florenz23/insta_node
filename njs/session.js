var Client = require('').V1
var device = new Client.V1.Device('realflorenzerstling');
var storage = new Client.CookieFileStorage(__dirname + './cookies/file.json');

// And go for login
Client.Session.create(device, storage, 'realflorenzerstling', 'SAFREIIY')
	.then(function(session) {
   		// Now you have a session, we can follow / unfollow, anything...
		// And we want to follow Instagram official profile
		return [session, Client.Account.searchForUser(session, 'instagram')]
	})
	.spread(function(session, account) {
		return Client.Relationship.create(session, account.id);
	})
	.then(function(relationship) {
		console.log(relationship.params)
		// {followedBy: ... , following: ... }
		// Yey, you just followed @instagram
	})
