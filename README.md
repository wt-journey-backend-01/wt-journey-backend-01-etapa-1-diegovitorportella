[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/fO8pjV07)
# Desafio: Protótipo de Cardápio Digital - DevBurger
Meu nome é Diego Portella, sou aluno de Eng. de Computação na PUC MINAS (Coração Eucarístico).

Bem-vindo(a) ao projeto final do protótipo de um cardápio digital para a hamburgueria gourmet, a "DevBurger"!

Esta aplicação web simples e funcional foi desenvolvida utilizando Node.js e Express. Nesta fase, toda a lógica de exibição e recebimento de dados é gerenciada diretamente pelo servidor, sem a necessidade de um banco de dados.

## Visão Geral do Projeto

Este projeto consiste em um servidor web que apresenta o cardápio da hamburgueria, permite que os clientes enviem sugestões de novos lanches e também entrem em contato. É uma oportunidade de praticar conceitos fundamentais de back-end com Node.js, como a criação de servidores, o gerenciamento de rotas e o tratamento de formulários.

## Estrutura de Arquivos

A estrutura de diretórios e arquivos do projeto segue o padrão recomendado:

```bash
seu-repositório/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   │    └── logo.png 
│   ├── data/
│   │     └── lanches.json
│   └── 404.html
│
├── views/
│   ├── index.html
│   └── contato.html        
│
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js