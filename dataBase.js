const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Modifica con il tuo username
  password: "", // Modifica con la tua password
  database: "blog",
});

// Test della connessione
connection.connect((err) => {
  if (err) {
    console.error("Errore di connessione al database:", err);
    return;
  }
  console.log("Connesso al database MySQL!");
});

module.exports = connection.promise();
