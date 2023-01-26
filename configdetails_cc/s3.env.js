var ENC = require('../helper/encrypter');
const envs ={
	accessKeyId: ENC._decrypt('U2FsdGVkX1%2FQNim4wcPdJyh3pHvLViBf9aKd0TG55Fv1tHFZpzZDmRwXtmlAyl29').slice(1, -1),
	secretAccessKey: ENC._decrypt('U2FsdGVkX18%2FPV0NLJGQB43mWn0wexvDsBg%2B2jXM5g1t2shaS0hPSRvW1fGNu7k0WzQ%2BmtgTB38NcN8ueTTALw%3D%3D').slice(1, -1),
	Bucket: ENC._decrypt('U2FsdGVkX196xh%2FECidR%2BGPeYXrIDaiNFi0%2FhkwQxkA%3D').slice(1, -1)
}
module.exports = envs;