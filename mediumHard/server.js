const express = require('express');

const app = express();

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


const port = 3000
app.listen(port)


