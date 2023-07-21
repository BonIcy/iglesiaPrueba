import express from 'express';
import { getPool } from '../config/db.js';

let router = express.Router();

router.get('/all', async (req, res) => {
  try {
    let pool = await getPool();
    let connection = await pool.getConnection();
    let departamentos = await connection.query('SELECT * FROM Departamento');
    connection.release();
    res.json(departamentos);
  } catch (error) {
    console.error('Error al obtener departamentos:', error.message);
    res.status(500).json({ error: 'Error al obtener departamentos' });
  }
});

router.post('/add', async (req, res) => {
  let { idDepartamento, nombreDepartamento } = req.body;
  try {
    let pool = await getPool();
    let connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO Departamento (idDepartamento, nombreDepartamento) VALUES (?, ?)',
      [idDepartamento, nombreDepartamento]
    );
    connection.release();
    res.json({ message: 'Departamento añadido exitosamente' });
  } catch (error) {
    console.error('Error al crear el departamento:', error.message);
    res.status(500).json({ error: 'Error al crear el departamento' });
  }
});
//actualizar
router.put('/upd/:id', async (req, res) => {
  let { id } = req.params;
  let { nombreDepartamento } = req.body;
  try {
    let pool = await getPool();
    let connection = await pool.getConnection();
    await connection.query('UPDATE Departamento SET nombreDepartamento = ? WHERE idDepartamento = ?', [nombreDepartamento, id]);
    connection.release();
    res.json({ message: 'Departamento actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el departamento:', error.message);
    res.status(500).json({ error: 'Error al actualizar el departamento' });
  }
});

// eliminar
router.delete('/del/:id', async (req, res) => {
  let { id } = req.params;
  try {
    let pool = await getPool();
    let connection = await pool.getConnection();
    await connection.query('DELETE FROM Departamento WHERE idDepartamento = ?', [id]);
    connection.release();
    res.json({ message: 'Departamento eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el departamento:', error.message);
    res.status(500).json({ error: 'Error al eliminar el departamento' });
  }
});

export default router;
