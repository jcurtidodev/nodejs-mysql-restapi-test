import { pool } from '../db.js'

export const ping = async (req, res) => {
  const result = await pool.query('SELECT "DB running properly" AS "Connection"')
  res.json(result[0])
}