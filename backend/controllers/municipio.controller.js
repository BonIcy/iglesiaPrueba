import express from 'express';
import { getPool } from '../config/db.js';

let router = express.Router();

router.get('/all', async (req, res) => {
  try {
    let pool = await getPool();
    let connection = await pool.getConnection();
    let municipios = await connection.query('SELECT * FROM Municipio');
    connection.release();
    res.json(municipios);
  } catch (error) {
    console.error('Error al obtener municipios:', error.message);
    res.status(500).json({ error: 'Error al obtener municipios' });
  }
});

router.post('/add', async (req, res) => {
  let { idMunicipio, NombreMunicipio, idDepartamento } = req.body;
  try {
    let pool = await getPool();
    let connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO Municipio (idMunicipio, NombreMunicipio, idDepartamento) VALUES (?, ?, ?)',
      [idMunicipio, NombreMunicipio, idDepartamento]
    );
    connection.release();
    res.json({ message: 'Municipio añadido exitosamente' });
  } catch (error) {
    console.error('Error al crear el municipio:', error.message);
    res.status(500).json({ error: 'Error al crear el municipio' });
  }
});

router.put('/update/:id', async (req, res) => {
  let { id } = req.params;
  let { NombreMunicipio, idDepartamento } = req.body;
  try {
    let pool = await getPool();
    let connection = await pool.getConnection();
    await connection.query('UPDATE Municipio SET NombreMunicipio = ?, idDepartamento = ? WHERE idMunicipio = ?', [NombreMunicipio, idDepartamento, id]);
    connection.release();
    res.json({ message: 'Municipio actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el municipio:', error.message);
    res.status(500).json({ error: 'Error al actualizar el municipio' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  let { id } = req.params;
  try {
    let pool = await getPool();
    let connection = await pool.getConnection();
    await connection.query('DELETE FROM Municipio WHERE idMunicipio = ?', [id]);
    connection.release();
    res.json({ message: 'Municipio eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el municipio:', error.message);
    res.status(500).json({ error: 'Error al eliminar el municipio' });
  }
});

export default router;
