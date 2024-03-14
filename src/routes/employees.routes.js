import { Router } from 'express'
import { getEmployees, getEmployeeById, getEmployeeByName, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employees.controllers.js'

const router = Router()

router.get('/employees', getEmployees)

router.get('/employees/:id', getEmployeeById)

router.get('/employees/name/:name', getEmployeeByName)

router.post('/employees', createEmployee)

router.put('/employees', updateEmployee)

router.delete('/employees/:id', deleteEmployee)

export default router