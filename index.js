import express from "express";
import axios from "axios";

// JSON-SERVER START
import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(router);
// JSON-SERVER END

const app = express();
app.use(express.json());


// Rota GET para todos os usuários
app.get("/usuarios", async (req, res) => {
    try {
        const consulta = await axios.get('http://localhost:3000/Usuarios');
        console.log("Consulta realizada");
        return res.json(consulta.data);
    } catch (error) {
        console.error("Erro na consulta:", error);
        return res.status(500).json({ error: "Erro ao consultar usuários" });
    }
});



// Rota GET por ID
app.get("/usuarios/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`http://localhost:3000/Usuarios/${id}`);
        console.log(`Consulta por ID ${id} realizada`);
        return res.json(response.data);
    } catch (error) {
        console.error(`Erro ao consultar usuário com ID ${id}:`, error);
        if (error.response?.status === 404) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        return res.status(500).json({ error: "Erro ao consultar usuário" });
    }
});


// Middleware para rotas não encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({ 
        error: "Rota não encontrada",
        message: "A rota solicitada não existe. Verifique a URL e tente novamente."
    });
});

// Iniciar JSON Server na porta 3000
server.listen(3000, () => {
    console.log('JSON Server is running! Port 3000');
});

// Iniciar Express na porta 8800
app.listen(8800, () => {
    console.log("Express is running!!! Port 8800");
    console.log("Backend complete, is running...");
});