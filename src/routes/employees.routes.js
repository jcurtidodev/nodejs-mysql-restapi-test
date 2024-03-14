import { Router } from 'express'
import { getEmployees, getEmployeeByName, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employees.controllers.js'

const router = Router()

router.get('/employees', getEmployees)

router.get('/employees-by-name', getEmployeeByName)

router.post('/employees', createEmployee)

router.put('/employees', updateEmployee)

router.delete('/employees', deleteEmployee)

export default router