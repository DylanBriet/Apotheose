require("dotenv/config");

const { Client } = require("pg");

const client = new Client(process.env.PG_URL);
// PG_URL = postgres://user:password@host:port/databaseName

// Créé un tunnel de communication entre notre app Node et notre serveur BDD Postgres
client.connect();

// On exporte le client
module.exports = client;