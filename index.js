
const fs = require('fs');
const express = require('express');


const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));


const server = express();

server.use((req, res, next) => {
    console.log(req.ip, req.method, req.hostname, req.get('User-Agent'));
    next();
})

server.get('/', (req, res) => {
    res.json({ type: "GET" })
});

server.post('/', (req, res) => {
    res.json({ type: "Post" })
});

server.put('/', (req, res) => {
    res.json({ type: "Put" })
});

server.delete('/', (req, res) => {
    res.json({ type: "Delete" })
});



server.listen(8080, function () {
    console.log("server started");
});