import { pool } from '../db.js'

export const getEmployees = (req, res) => res.send('Getting employees')

export const createEmployees = async (req, res) => {
  const { name, salary } = req.body
  const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [name, salary])
  console.log(rows)
  res.send({
    id: rows.insertId,
    name,
    salary,
  })
}

export const updateEmployees = (req, res) => res.send('Updating employees')

export const deleteEmployees = (req, res) => res.send('Deleting employees')