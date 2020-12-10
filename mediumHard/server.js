const express = require('express');

const app = express();
app.use(express.json())
const data = require('./employees.json')

app.get('/', (req, res) => {
    if (!data) {
        res.status(404).send('Data not found')
    }
    res.send(data)
})


app.get('/employees/:id', (req, res) => {
    if (!data) {
        res.status(404).send('Could not find information.')
    }

    const findEmployee = data.find(function (employee) {

        return parseInt(req.params.id) === employee.id;
    })

    res.send(findEmployee)

})

app.post('/employees', (req, res) => {
    if(!req.body.name || !req.body.salary || !req.body.department) {
        res.status(400).send('Bad Request, please make sure you fill out all the fields.')
    }
    const newEmployee = {
        id: data.length +1,
        name: req.body.name,
        salary: req.body.salary,
        department: req.body.department
    }

    data.push(newEmployee)
 
    

    res.send(newEmployee)

})


const port = 3000
app.listen(port)


