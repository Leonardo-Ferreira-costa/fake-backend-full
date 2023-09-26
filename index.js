import express from "express"
import axios from "axios"

//JSON-SERVER START
import jsonServer from "json-server"
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
server.use(middlewares)
server.use(router)
//JSON-SERVER END


const app = express()

app.use(express.json())

//Consultando todas as entradas no json-server
//GET all
app.get("/", async (req, res)=>{
      
        const consulta = await axios.get('http://localhost:3000/perguntas/') //Para consultar por id: http://localhost:3000/perguntas?id=1
                .then((res)=> {
                console.log("Consulta realizada");
                return res = res.data
                
                })
         
    console.log(consulta[1])//Mostrando somente uma entrada no console, teste. //Show console
   return res.json(consulta)
})


server.listen(3000, () => {
    console.log('JSON Server is running! Port 3000')
  })

app.listen(8800, ()=>{
    console.log("Express is running!!! Port 8800")
    console.log("Backend complete, is running...")
});