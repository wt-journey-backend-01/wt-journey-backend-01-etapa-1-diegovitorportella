const express = require('express');
const path = require('path');
const fs = require('fs'); // Módulo para leitura de arquivos

const app = express();
const PORT = 3000;

// Middleware para processar dados de formulário enviados via POST (urlencoded)
app.use(express.urlencoded({ extended: true }));

// Configurar o Express para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página principal (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Rota para processar sugestões de lanches (GET com query string)
app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query;
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Agradecimento</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <h1>Obrigado pela sua sugestão!</h1>
            <p><strong>Nome do Lanche:</strong> ${nome || 'Não informado'}</p>
            <p><strong>Ingredientes:</strong> ${ingredientes || 'Não informado'}</p>
            <p><a href="/">Voltar à Página Inicial</a></p>
        </body>
        </html>
    `);
});

// Rota para a página de contato (contato.html)
app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

// Rota para receber dados do formulário de contato (POST)
app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;
    // Redireciona para a nova rota GET /contato-recebido, passando os dados como query string
    res.redirect(`/contato-recebido?nome=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}&assunto=${encodeURIComponent(assunto)}&mensagem=${encodeURIComponent(mensagem)}`);
});

// Nova rota para a página de contato recebido (GET)
app.get('/contato-recebido', (req, res) => {
    // Obtém os dados dos parâmetros da query string
    const { nome, email, assunto, mensagem } = req.query;
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contato Recebido</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <h1>Mensagem Recebida com Sucesso!</h1>
            <p>Obrigado pelo seu contato, ${nome || 'Não informado'}!</p>
            <p><strong>E-mail:</strong> ${email || 'Não informado'}</p>
            <p><strong>Assunto:</strong> ${assunto || 'Não informado'}</p>
            <p><strong>Mensagem:</strong> ${mensagem || 'Não informado'}</p>
            <p><a href="/">Voltar à Página Inicial</a></p>
        </body>
        </html>
    `);
});

// Rota de API para retornar uma lista de lanches lida de lanches.json
app.get('/api/lanches', (req, res) => {
    const lanchesFilePath = path.join(__dirname, 'public', 'data', 'lanches.json');

    fs.readFile(lanchesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler lanches.json:', err);
            // Se o arquivo não existir ou houver erro, retorna um array vazio ou um erro
            return res.status(500).json({ error: 'Erro ao carregar os lanches.' });
        }
        try {
            const lanches = JSON.parse(data);
            res.json(lanches);
        } catch (parseError) {
            console.error('Erro ao fazer parse do lanches.json:', parseError);
            res.status(500).json({ error: 'Erro ao processar os dados dos lanches.' });
        }
    });
});

// Middleware para tratamento de 404 - deve ser a última rota antes do listen
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// O servidor Express escuta na porta definida
app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});