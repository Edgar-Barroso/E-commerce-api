import { DATABASE_URL } from "../env/env";
const pgp = require('pg-promise')();
const connectionString = DATABASE_URL;
const db = pgp(connectionString);

// Função para executar o arquivo create.sql
async function executeCreateSql() {
  try {
    // Apagar o esquema se existir
    await db.none('DROP SCHEMA IF EXISTS ccca CASCADE');

    // Lê o conteúdo do arquivo create.sql
    const fs = require('fs');
    const createSql = fs.readFileSync('database/create.sql', 'utf8');

    // Executa os comandos SQL do arquivo
    await db.none(createSql);

    console.log('Arquivo create.sql executado com sucesso.');
  } catch (error) {
    console.error('Erro ao executar o arquivo create.sql:', error);
  } finally {
    pgp.end(); // Fecha a conexão com o banco de dados
  }
}

executeCreateSql();
