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

    const findEmployee = data.find( (employee) => parseInt(req.params.id) === employee.id)

    if (!findEmployee) {
        res.status(404).send('Could not find information.')
    }

    res.send(findEmployee)

})

app.post('/', (req, res) => {
    if (!req.body.name || !req.body.salary || !req.body.department) {
        res.status(400).send('Bad Request, please make sure you fill out all the fields.')
    }
    const newEmployee = {
        id: data.length + 1,
        name: req.body.name,
        salary: req.body.salary,
        department: req.body.department
    }

    data.push(newEmployee)

    res.send(newEmployee)

})

app.put('/employees/:id', (req, res) => {
    const updateEmployee = data.find((employee) => parseInt(req.params.id) === employee.id);

    if (!updateEmployee) {
        res.status(404).send('No employee found, please make sure you used the right id number')
    }


    if (req.body.name != undefined || req.body.name != null) {
        updateEmployee.name = req.body.name;
    } 
    
    if(req.body.salary != undefined || req.body.salary != null) {
        updateEmployee.salary = req.body.salary;
    }

    if(req.body.department != undefined || req.body.department != null) {
        updateEmployee.department = req.body.department;
    } 
   
    // console.log( updateEmployee.name = req.body.name)
    // console.log(updateEmployee.salary = req.body.salary);
    // console.log(updateEmployee.department = req.body.department);

    res.send(updateEmployee)
})

app.delete('/employees/:id', (req, res) => {
    const findEmployee = data.find((employee) => parseInt(req.params.id) === employee.id);
    if (!findEmployee) {
        res.status(404).send('No employee found, please make sure you used the right id number')
    }

    const index = data.indexOf(findEmployee);
    
    data.splice(index, 1);

    res.send(findEmployee)
    
})


const port = 3000
app.listen(port)


