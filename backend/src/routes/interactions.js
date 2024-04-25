const express = require('express');
const router = express.Router();
const db = require('../db');

// Función para calcular el promedio de calificaciones
const calcularPromedioCalificaciones = (idEstudiante, callback) => {
  const query = `
    SELECT AVG(
      CASE calificacion
        WHEN 'muy bueno' THEN 5
        WHEN 'bueno' THEN 4
        WHEN 'neutral' THEN 3
        WHEN 'malo' THEN 2
        WHEN 'muy malo' THEN 1
        ELSE 0
      END
    ) AS promedio
    FROM Interacciones
    WHERE id_estudiante = ?;
  `;
  
  db.query(query, [idEstudiante], (err, result) => {
    if (err) {
      console.error('Error al calcular el promedio de calificaciones: ' + err.message);
      callback(err);
    } else {
      const promedio = result[0].promedio || 0;
      callback(null, promedio);
    }
  });
};

// Función para actualizar el campo promedio_calificaciones en la tabla Estudiantes
const actualizarPromedioCalificaciones = (idEstudiante, promedio, callback) => {
  const query = `
    UPDATE Estudiantes
    SET promedio_calificaciones = ?
    WHERE id = ?;
  `;
  
  db.query(query, [promedio, idEstudiante], (err, result) => {
    if (err) {
      console.error('Error al actualizar el promedio de calificaciones: ' + err.message);
      callback(err);
    } else {
      console.log('Promedio de calificaciones actualizado exitosamente');
      callback(null);
    }
  });
};

// Route to save an interaction
router.post('/save-rating', (req, res) => {
  const { id_estudiante, tipo_interaccion, comentario, calificacion, sede } = req.body;

  // Verifica si todos los campos necesarios están presentes en la solicitud
  if (!id_estudiante || !tipo_interaccion || !calificacion) {
    return res.status(400).send('Missing required fields');
  }

  // Guarda la interacción en la base de datos
  const query = 'INSERT INTO Interacciones (id_estudiante, tipo_interaccion, comentario, calificacion, sede) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [id_estudiante, tipo_interaccion, comentario, calificacion, sede], (err, result) => {
    if (err) {
      console.error('Error saving interaction: ' + err.message);
      return res.status(500).send('Error saving interaction');
    }
    
    console.log('Interaction saved successfully');
    
    // Calcula el nuevo promedio de calificaciones
    calcularPromedioCalificaciones(id_estudiante, (err, promedio) => {
      if (err) {
        return res.status(500).send('Error al calcular el promedio de calificaciones');
      }

      // Actualiza el campo promedio_calificaciones en la tabla Estudiantes
      actualizarPromedioCalificaciones(id_estudiante, promedio, (err) => {
        if (err) {
          return res.status(500).send('Error al actualizar el promedio de calificaciones');
        }

        res.status(201).send('Interaction saved successfully');
      });
    });
  });
});

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const db = require('../db');

// // Route to save an interaction
// router.post('/save-rating', (req, res) => {
//   const { id_estudiante, tipo_interaccion, comentario, calificacion, sede } = req.body;

//   // Verifica si todos los campos necesarios están presentes en la solicitud
//   if (!id_estudiante || !tipo_interaccion || !calificacion) {
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

// module.exports = router;
