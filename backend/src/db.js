const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Maicol1095551368',
  database: 'sistema_calificaciones'
});

// Conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  console.log('Connected to database');
});

// Exportar el objeto de conexión para su uso en otros archivos
module.exports = db;

// const mysql = require('mysql');

// // Configuración de la conexión a la base de datos
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Maicol1095551368',
//   database: 'sistema_calificaciones'
// });

// // Conexión a la base de datos
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database:', err.message);
//     return;
//   }
//   console.log('Connected to database');
// });

// // Exportar el objeto de conexión para su uso en otros archivos
// module.exports = db;
