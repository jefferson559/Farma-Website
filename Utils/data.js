const request = require('postman-request');

const getBanners = (callback) => {
    request('http://localhost:3001/banners', (error, res, body) => {
        if(error){
          console.log('Error', error)  
          return callback(error, undefined);
        }
        if (res){
            if(body){
               return callback(undefined, body);
            }
            callback("No se encontraron productos para el banner", undefined);
        }
    });
}
const getAllProducts = (callback) => {
    request('http://localhost:3001/products', (error, res, body) => {
        if(error){
          console.log('Error', error)  
          return callback(error, undefined);
        }
        if (res){
            if(body){
               return callback(undefined, body);
            }
            callback("No se encontraron productos.", undefined);
        }
    });
}
module.exports= {
 
    getBanners,getAllProducts
}

