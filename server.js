import express from 'express';
import axios from 'axios';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/convert', async (req, res) => {
    const {amount, from, to} = req.query;
    if (!from || !to || !amount) {
        return res.status(400).json({error: 'faltam parametros: from, to e amount'});
    }
    try { 
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const rate = response.data.rates[to];
        if (!rate){
            return res.status(400).json({error: 'moeda destino não suportada'});
        }
        const convertedamount = amount * rate;
        res.json({from, to, amount, convertedamount});
    } catch (error){
        res.status(500).json({error: 'erro ao consultar a API de cambio'});
    }
});
 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
    console.log (`Servidor rodando na porta ${PORT}`);   
 });
    
