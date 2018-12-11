const express = require('express');

const app = new express();
const port = process.env.PORT || 5000;
const url = 'http://localhost:';

app.use(express.json())//to access the body of the request

app.get("/", (req, res) => {
    return res.send('Welcome to Rate My Dog! Get rating :D')
});

app.get("/dogs", (req, res) => {
    return res.send('test successful');
});

app.get("/dogs/:id", (req, res) => {
    const { id } = req.params
    return res.send('test successful');
});

app.post("/dogs", (req, res) => {
    const { id, name } = req.body;
    const dog = {id, name}; //simpler syntax id = id name = name
    return res.send(dog);
});

app.put("/dogs/:id", (req, res) => {

});

app.delete("/dogs/:id", (req, res) => {
    
});

app.listen(port, () => {
    console.log(`listening at ${url}${port}`)
});