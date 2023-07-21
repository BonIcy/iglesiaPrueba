import express from 'express';
import { getPool } from '../config/db.js';

let router = express.Router();

router.get('/all', async (req, res) => {
  try {
    let pool = await getPool();
    let connection = await pool.getConnection();
    let barrios = await connection.query('SELECT * FROM Barrio');
    connection.release();
    res.json(barrios);
  } catch (error) {
    console.error('Error al obtener barrios:', error.message);
    res.status(500).json({ error: 'Error al obtener barrios' });
  }
});

router.post('/add', async (req, res) => {
  let { nombreBarrio, idComuna } = req.body;
  try {
    let pool = await getPool();
    let connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO Barrio (nombreBarrio, idComuna) VALUES (?, ?)',
      [nombreBarrio, idComuna]
    );
    connection.release();
    res.json({ message: 'Barrio añadido exitosamente' });
  } catch (error) {
    console.error('Error al crear el barrio:', error.message);
    res.status(500).json({ error: 'Error al crear el barrio' });
  }
});

router.put('/update/:id', async (req, res) => {
  let { id } = req.params;
  let { nombreBarrio, idComuna } = req.body;
  try {
    let pool = await getPool();
    let connection = await pool.getConnection();
    await connection.query('UPDATE Barrio SET nombreBarrio = ?, idComuna = ? WHERE idBarrio = ?', [nombreBarrio, idComuna, id]);
    connection.release();
    res.json({ message: 'Barrio actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el barrio:', error.message);
    res.status(500).json({ error: 'Error al actualizar el barrio' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  let { id } = req.params;
  try {
    let pool = await getPool();
    let connection = await pool.getConnection();
    await connection.query('DELETE FROM Barrio WHERE idBarrio = ?', [id]);
    connection.release();
    res.json({ message: 'Barrio eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el barrio:', error.message);
    res.status(500).json({ error: 'Error al eliminar el barrio' });
  }
});

export default router;
