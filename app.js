//config files
const { clear } = require('console');
const { json } = require('express');
const express=require('express');
const app=express();
//puerto 3000
const port=process.env.PORT || 3000
//
app.listen(port,()=>{
    console.log("Server corriendo en el puerto 3000");
})
//Requerimos el paquete path
const path=require('path');
//Utilizamos el paquete path y decimos dónde van a estar las views
app.set('views',path.join(__dirname,'Views'))//defino el path de las vistas
app.set('view engine','ejs') //defino el engine de vista
/////////donde express debe usar los archivos estaticos
app.use(express.static(path.join(__dirname, 'Public')));
//////
const data = require('./Utils/data.js')
//.render renderisa la pagina que le enviemos en el path indicado en get
 
var list = [];   
 
app.get('/',
    (req,res)=>{                
                data.getBanners(async(error, data)=>{                
                    if(error){
                        return res.send({
                            error
                        })
                    }       
                    const JSONBanner = await JSON.parse(data);
                  // clear()
                    // console.log("productosBanner")
                   //console.log(JSONBanner)
                   list.push({
                        title:'FarmaHelp',
                        path:"Index",                      
                        JSONBanner
                    })                   
                })  


                data.getAllProducts(async (error, data)=>{
                    if(error)
                    {
                        return res.send({
                            error
                        })
                    }
                  
                    const JSONProducts = await JSON.parse(data);    
                    
                     list.push({                                         
                        JSONProducts
                    })
                    let JSONProOferta = JSONProducts.filter(function (n){
                        return n.porcentajeOferta>0;
                    });             
                     JSONProOferta=JSONProOferta.map(pOferta=> ({ ...pOferta, precioOferta: 
                    (parseInt(pOferta.precioVenta,10) * ((100- parseInt(pOferta.PorcentajeOferta),10)/ 100 ))}))
                   /* JSONProOferta = JSONProducts.map(function (n){
                        let precioOferta=n.precioVenta-(n.precioVenta*(n.PorcentajeOferta/100))
                        n["precioOferta"]=precioOferta
                        return n
                    });*/
                    var auxList=[]
                    var JSONOfertaMatrix=[]
                    var cont=0;
                    JSONProOferta.forEach((n,i,array) =>{ 
                        if(array.length<=2){
                            auxList.push(n)
                            JSONOfertaMatrix.push(auxList)
                          
                        }else{
                            auxList.push(n)  
                            if((array.length-1)==i){                                                                 
                                JSONOfertaMatrix.push([...auxList])                                
                            }
                            else{
                                if(auxList.length==2){                                                                           
                                    JSONOfertaMatrix.push([...auxList])   
                                    auxList=[] 
                                    
                               }
                            }
                               
                           
                          
                            
                        }                     
                        
                    })
                    console.log(JSONOfertaMatrix)
                    list.push({                                         
                        JSONOfertaMatrix
                    })   
                     //return res.status(404).json({"list":list}) 
                    return res.render('index', 
                    {   
                        "list":list
                    })
                })          
                
    });
app.get('/contacto',(req,res)=>{
    res.render('Pages/contacto',{title:'Contacto'})   
});
app.get('/Medicamentos',(req,res)=>{
    res.render('Pages/Medicamentos',{title:'Medicamentos',path:"Medicamentos"})   
});

app.get('/CuidadoPersonal',(req,res)=>{
    res.render('Pages/CuidadoPersonal',{title:'CuidadoPersonal',path:"CuidadoPersonal"})   
});
//