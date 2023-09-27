import express from "express";
import { inserir, ler, lerUm, atualizar, excluir } from './src/aluno.js'
const app = express();
const porta = process.env.PORT || 3306; // Permitindo que o servidor aponte a melhor porta ou entao, usamos a porta 3306.


// Adicionando suporte ao formao json
app.use(express.json())
app.use(express.urlencoded({ extended : true }));


app.get("/", (req, res) => {
    res.send(`Raíz da API NodeJS + Express + MySQL`)
});

// TODOS os alunos
app.get("/alunos", (req, res) => {
    // res.send(`Exibindo os dados de TODOS os alunos`);
    ler(res);
});

// UM aluno
app.get("/alunos/:id", (req, res) => {
    // res.send(`Exibindo os dados de UM aluno`);
    const id = parseInt(req.params.id);
    lerUm(id, res); 
});

// INSERINDO alunos
app.post("/alunos", (req, res) => {
    // res.send(`Inserindo alunos`);
    const novoAluno = req.body;
    inserir(novoAluno, res);
});

// ATUALIZANDO UM alunos
app.patch("/alunos/:id", (req, res) => {
    // res.send(`Atualizando alunos`);
    const id = parseInt(req.params.id);
    const aluno = req.body;
    atualizar(id, aluno, res);
});

// DELETANDO um aluno
app.delete("/alunos/:id", (req, res) => {
    // res.send(`Deletando UM aluno`);
    const id = parseInt(req.params.id);
    excluir(id, res);
});

// Executando o servidor
app.listen(porta, () => {
    console.log(`Servidor NodeJS rodando na porta ${porta}`);
});