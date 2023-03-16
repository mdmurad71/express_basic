
const fs = require('fs');
const express = require('express');


const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;


const server = express();

// body parser
server.use(express.json());

server.use((req, res, next) => {
    console.log(req.ip, req.method, req.hostname, req.get('User-Agent'));
    next();
})

server.get('/products', (req, res) => {
    res.json(products);
});

server.get('/products/:id', (req, res) => {

    const id = +req.params.id;
    const prod = products.find(p => p.id === id);
    res.json(prod);
});

//post product
server.post('/createProduct', (req, res) => {
    console.log(req.body);
    products.push(req.body);
    res.json(req.body);
});

//update product
server.put('/updateProduct/:id', (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    products.splice(productIndex, 1, { ...req.body, id: id })
    res.status(201).json();
});

//patch product
server.patch('/patchProduct/:id', (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    const product = products[productIndex]
    products.splice(productIndex, 1, { ...product, ...req.body })
    console.log(req.body);
    res.status(201).json();
});


server.delete('/deleteProduct/:id', (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    const product = products[productIndex];
    products.splice(productIndex, 1)
    res.status(201).json(product);
});



server.listen(8080, function () {
    console.log("server started");
});