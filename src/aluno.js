import conexao from './banco.js';

// CRUD

// LER/EXIBIR todos os alunos
function ler(res) {
    const sql = "SELECT * FROM alunos ORDER BY nome";

    conexao.query(sql, (erro, resultados) => {
        // verificação para ver se há conteúdo
        if (resultados.length ===  0) {
            res.status(204).end();
            return;
        }

        if(erro) {
            res.status(400).end(); // BAD Request
        } else {
            res.status(200).json(resultados);
        }
    });
}


// INSERT/INSERIR alunos na database
function inserir(aluno, res) {
    const sql = "INSERT INTO alunos SET ?";

    conexao.query(sql, aluno, (erro) => {
        if (erro) {
            res.status(400).json(erro.code);
        } else {
            res.status(201).json({ "Status" : "Aluno inserido" });
        }
    });
}

// Ler Um Aluno
function lerUm(id, res) {
    const sql = "SELECT * FROM alunos WHERE id = ?";
    conexao.query(sql, id, (erro, resultados) => {
        if (resultados === 0) {
            res.status(204).end();
            return;
        } 

        if (erro) {
            res.status(400).json(erro.code);
        } else {
            res.status(200).json(resultados[0]);
        }
    });
}

// ATUALIZAR todos/alguns dados de um aluno
function atualizar(id, aluno, res) {
    const sql = "UPDATE alunos SET ? WHERE id = ?";

    conexao.query(sql, [aluno, id], (erro, resultados) => {
        if(erro){
            res.status(400).json(erro.code);
        } else {
            // res.status(200).json("Status: Atualizado com sucesso!")
            res.status(200).json( {...aluno, id} );
        }
    })
}

// DELETAR aluno da base de dados
function excluir(id, res) {
    const sql = "DELETE FROM alunos WHERE id = ?";

    conexao.query(sql, id, (erro, resultados) => {
        if(erro) {
            res.status(400).json(erro.code);
        } else {
            res.status(200).json( {"Status" : "Aluno excluído", id} );
        }
    });
}
    
export { ler, inserir, lerUm, atualizar, excluir };
