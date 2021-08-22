const request = require('postman-request');

const getBanners = (callback) => {
    request('https://api-farma.herokuapp.com/banners', (error, res, body) => {
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
    request('https://api-farma.herokuapp.com/products', (error, res, body) => {
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

