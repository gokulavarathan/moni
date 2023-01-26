
var MAIL_ENC = require('../helper/encrypter');
  module.exports = {
    Mail: {
      Host: MAIL_ENC._decrypt('U2FsdGVkX18NtfwC1QU3SZ7w9W1UfXaE988UiBgt23a%2FqL4sRPx9wnZUBWnj%2FV8eeZsbg5Ka%2FosO4Ur102nA5A%3D%3D').slice(1, -1),
        Port: 587,
        User: MAIL_ENC._decrypt('U2FsdGVkX1%2FtXVH1GhXFiq8GYfNcy30V18iyETnJkhDl0U%2Bax%2B5vFlpo%2BjqLmG1R').slice(1, -1),
        Pass: MAIL_ENC._decrypt('U2FsdGVkX18TVETaDtQrnQ826%2F0velZYA66%2BuyiNEEkh2zSupdnSys3AKkea0y8itAklCQToUioZHITABBRspQ%3D%3D').slice(1, -1),
        From: 'admin@monofiex.in',
        API_KEY : MAIL_ENC._decrypt('U2FsdGVkX1%2FqUEK%2FpIucp1lhxkhA1KjeyV2LJ%2B4VI42RGD1AnESX0dySkfti6c6XghWhqJG4hGULUDYwugswtY8krGctqM8Gx36B5DD7zho%3D').slice(1, -1),
        DOMAIN : MAIL_ENC._decrypt('U2FsdGVkX1%2FAn%2B7tCEK1%2F2SEYr%2FyLYlHLa4Rf2hfi70%3D').slice(1, -1)
    }
  }
