import express from 'express';
import { getPool } from '../config/db.js';

let router = express.Router();
router.get('/all', async (req, res) => {
  try {
    let pool = await getPool();
    let connection = await pool.getConnection();
    let comunas = await connection.query('SELECT * FROM Comuna');
    connection.release();
    res.json(comunas);
  } catch (error) {
    console.error('Error al obtener comunas:', error.message);
    res.status(500).json({ error: 'Error al obtener comunas' });
  }
});

router.post('/add', async (req, res) => {
  let { nombreComuna, idMunicipio } = req.body;
  try {
    let pool = await getPool();
    let connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO Comuna (nombreComuna, idMunicipio) VALUES (?, ?)',
      [nombreComuna, idMunicipio]
    );
    connection.release();
    res.json({ message: 'Comuna añadida exitosamente' });
  } catch (error) {
    console.error('Error al crear la comuna:', error.message);
    res.status(500).json({ error: 'Error al crear la comuna' });
  }
});

router.put('/update/:id', async (req, res) => {
  let { id } = req.params;
  let { nombreComuna, idMunicipio } = req.body;
  try {
    let pool = await getPool();
    let connection = await pool.getConnection();
    await connection.query('UPDATE Comuna SET nombreComuna = ?, idMunicipio = ? WHERE idComuna = ?', [nombreComuna, idMunicipio, id]);
    connection.release();
    res.json({ message: 'Comuna actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la comuna:', error.message);
    res.status(500).json({ error: 'Error al actualizar la comuna' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  let { id } = req.params;
  try {
    let pool = await getPool();
    let connection = await pool.getConnection();
    await connection.query('DELETE FROM Comuna WHERE idComuna = ?', [id]);
    connection.release();
    res.json({ message: 'Comuna eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la comuna:', error.message);
    res.status(500).json({ error: 'Error al eliminar la comuna' });
  }
});

export default router;
