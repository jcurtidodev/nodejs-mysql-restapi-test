import { pool } from '../db.js'

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employee')
  
    if (rows.length === 0)
      return res.status(404).send({ message: 'The user could not be found'})
    
    res.json(rows)
  } catch (err) {
    console.error('Error retrieving employee: ', err)
    res.status(500).json({ message: 'An error ocurred while fetching the employee data' })
  }
}

export const getEmployeeById = async (req, res) => {
  try {
    const employeeId = parseInt(req.params.id)
    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [employeeId])
    
    if (rows.length === 0)
      return res.status(404).send({ message: 'The user can not be found'})

    res.json(rows[0])
    
  } catch (err) {
    console.error('Error retrieving employee: ', err)
    res.status(500).json({ message: 'An error ocurred while fetching the employee data' })
  }
}

export const getEmployeeByName = async (req, res) => {
  try {
    const employeeName = req.params.name
    const [rows] = await pool.query('SELECT * FROM employee WHERE name = ?', [employeeName])
    
    if (rows.length === 0)
      return res.status(404).send({ message: 'The user could not be found'})

    res.json(rows)
    
  } catch (err) {
    console.error('Error retrieving employee: ', err)
    res.status(500).json({ message: 'An error ocurred while fetching the employee data' })
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
    res.status(500).json({ message: 'An error ocurred while creating the employee' })
  }
}

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params
    const { name, salary } = req.body

    const [rows] = await pool.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id=?',
    [ name, salary, id])

    console.log(rows)
    if (rows.affectedRows === 0)
      return res.status(404).json({
        message: 'Employee not found'
      })

    if (rows.changedRows === 1) {
      const [response] = await pool.query('SELECT * FROM employee WHERE id=?', id)
      res.json(response[0])
    } else
      res.send('Can not update with the same values')
  } catch (err) {
    console.error('Error updating employee: ', err)
    res.status(500).json({ message: 'An error ocurred while updating the employee' })
  }
}

export const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id
    const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [employeeId])

    if (result.affectedRows <= 0)
      return res.status(404).send({ message: 'The user could not be found'})

    res.sendStatus(204)
  } catch (err) {
    console.error('Error deleting employee: ', err)
    res.status(500).json({ message: 'An error ocurred while deleting the employee' })
  }
}