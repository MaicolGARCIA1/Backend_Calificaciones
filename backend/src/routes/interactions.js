const express = require('express');
const router = express.Router();
const db = require('../db');

// Route to save an interaction
router.post('/save-rating', (req, res) => {
  const { id_estudiante, tipo_interaccion, comentario, calificacion, sede } = req.body;

  // Verifica si todos los campos necesarios están presentes en la solicitud
  if (!id_estudiante || !tipo_interaccion || !calificacion) {
    return res.status(400).send('Missing required fields');
  }

  const query = 'INSERT INTO Interacciones (id_estudiante, tipo_interaccion, comentario, calificacion, sede) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [id_estudiante, tipo_interaccion, comentario, calificacion, sede], (err, result) => {
    if (err) {
      console.error('Error saving interaction: ' + err.message);
      return res.status(500).send('Error saving interaction');
    }
    console.log('Interaction saved successfully');
    res.status(201).send('Interaction saved successfully');
  });
});

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const db = require('../db');

// // Route to save an interaction
// router.post('/save-rating', (req, res) => {
//   const { id_estudiante, tipo_interaccion, comentario, calificacion, sede } = req.body;

//   // Verifica si todos los campos necesarios están presentes en la solicitud
//   if (!id_estudiante || !tipo_interaccion || !calificacion || !sede) {
//     return res.status(400).send('Missing required fields');
//   }

//   const query = 'INSERT INTO Interacciones (id_estudiante, tipo_interaccion, comentario, calificacion, sede) VALUES (?, ?, ?, ?, ?)';
//   db.query(query, [id_estudiante, tipo_interaccion, comentario, calificacion, sede], (err, result) => {
//     if (err) {
//       console.error('Error saving interaction: ' + err.message);
//       return res.status(500).send('Error saving interaction');
//     }
//     console.log('Interaction saved successfully');
//     res.status(201).send('Interaction saved successfully');
//   });
// });

// module.exports = router;


