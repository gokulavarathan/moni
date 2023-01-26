
var ENC = require('../helper/encrypter');
const envs ={
	account: ENC._decrypt('U2FsdGVkX19%2BNZCsXD6uQwzVxvkzlL3pUqVucwaVKNVhvi%2FRBar9hpSqJwqzWbnFfYPgKJBBz8HsgW6MR0tQ5w%3D%3D').slice(1, -1), // Your Account SID from www.twilio.com/console
	token: ENC._decrypt('U2FsdGVkX1%2FYY7gJW5DinOXWx4VkDHjQkjTlpJP2DfOdeJYQJYt4MRZq7ni3JljpzVyTZk2KXNng3P1wcV5rkQ%3D%3D').slice(1, -1) // Your Auth Token from www.twilio.com/console
}

module.exports = envs;
