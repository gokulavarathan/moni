var DB_ENC = require('simple-encryptor')(process.env.ENCR_KEY_DB);

module.exports = {
    
    local_db:
    {
      db_name:'kasknxbcuhbvqwbjash',
      user_name:'root',
      password:'Osiz@123',
       host:'localhost',
      port:'5432',
     dialect:'postgres' ,
     dialectOptions:{},timezone:"+05:30"
     // logging: process.env.NODE_ENV === 'production' ? false : console.log
   },
    demo_db:
     {
       db_name:DB_ENC.decrypt('6aa0a5d55d1e780cc4086e4b554ac266334ce490d209a7e61b24a37b8ec1a6f954b88a114be8ed55461671728382ce62g+aDE6nttHDeE+SKAPbn3I4VUVnVP1AcoRhTWyBziP4='),
       user_name: DB_ENC.decrypt('36a97bec5dabf6d667bc162aa90c5471fa0685777fc23a4ea44d202fd7e21ed9b9379d422dc1bbdc329b6baa30985a78ewDZo9TOPg/vn1qHaRl5DLkWJvW/zFYDzYp72SVySno='),
       password: DB_ENC.decrypt('af9db146a7913367b98b7c142b6db603e594c16e37b08ce18596fe453715e5290a3cfb8b47987b112b806064c2a6af52xQJl3lY9tsCtHR4qxqpaTJtaZlSdx5jY90o+r0d8rcs='),
        host: DB_ENC.decrypt('a580ef56e1569fe94957b9045aa5b34812599ccc7245ee1248e83d58903e993a100d95bec8abddab48fbc9856d085feek5uYyRJdUTdcFJ95Id2RYQ=='),
       port: DB_ENC.decrypt('75b7cf4ca518bf2d8b689bc5e90bd197734bd1c04a808870c19ee8546afd995d53cd92bce958143881c6c0f9f9ccf4325G6dX86yqOpjSskkr3fKIg=='),
      dialect:'postgres' ,
      dialectOptions:{},timezone:"+05:30",
      logging:false
    }
  
    }

