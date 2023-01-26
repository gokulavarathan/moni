var Encrypter = require('../helper/encrypter');



//testnet
module.exports = {
	"API": Encrypter._decrypt('U2FsdGVkX1%2BDx4r45MEOCWhX2tiWBEj1B024ni1sZfIzykwKGqqzM9skKrocngNSyCAbeLV%2FeQVVcHZNedhSr3le1sXj9JqJcHV1%2FsGbBEJYUNJtj1AHZUZTFqKfl7zK').slice(1, -1),
	"SECRET": Encrypter._decrypt('U2FsdGVkX1%2BrXCpXOduZCbtmI9cxxJAn2KO%2FBV%2BP8Jusv1ukp9aRYNDAc8X3YZEAsnRKdVFxkcB0UZLzKH0vdSZm9yozCjazmzPlPDeEzXTq8ybBCgpuWUzmaBdQ4vox').slice(1, -1)
}
