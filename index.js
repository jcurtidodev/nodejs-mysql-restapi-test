import express from 'express'

const app = express()

app.get('/employees', (req, res) => res.send('Getting employees'))

app.post('/employees', (req, res) => res.send('Creating employees'))

app.put('/employees', (req, res) => res.send('Updating employees'))

app.delete('/employees', (req, res) => res.send('Deleting employees'))

app.listen(3000)
console.log('Server running on port 3000')