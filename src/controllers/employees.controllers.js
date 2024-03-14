import { pool } from '../db.js'

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employee')
  
    if (rows.length === 0)
      return res.status(404).send({ message: 'The user could not be found'})
    
    res.json(rows)
  } catch (err) {
    console.error('Error retrieving employee: ', err)
    res.status(500).send({ message: 'An error ocurred while fetching the employee data' })
  }
}

export const getEmployeeByName = async (req, res) => {
  try {
    const employeeName = req.body.name
    const [rows] = await pool.query('SELECT * FROM employee WHERE name = ?', employeeName)
    
    if (rows.length === 0)
      return res.status(404).send({ message: 'The user could not be found'})

    res.send({ Employees: rows })
    
  } catch (err) {
    console.error('Error retrieving employee: ', err)
    res.status(500).send({ message: 'An error ocurred while fetching the employee data' })
  }
}

export const createEmployee = async (req, res) => {
  try {
    const { name, salary } = req.body
    const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [name, salary])
    res.send({
      id: rows.insertId,
      name,
      salary,
    })
  } catch (err) {
    console.error('Error creating employee: ', err)
    res.status(500).send({ message: 'An error ocurred while creating the employee' })
  }
}

export const updateEmployee = (req, res) => res.send('Updating employees')

export const deleteEmployee = (req, res) => res.send('Deleting employees')