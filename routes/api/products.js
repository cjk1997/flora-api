const express = require('express');
const Router = express.Router();
const {
    getProducts,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../../data/products');

Router.get('/:id', async function(req, res, next) {
    if (!req.params.id) {
        next(route);
    } else {
        try {
            const data = await getProductByID(req.params.id);
            res.send(data);
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal server issues, check logs.")
        };
    };
});

Router.get('/', async function(req, res) {
    try {
        const data = await getProducts();
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server issues, check logs.");
    };
});

Router.post('/', async function(req, res) {
    try {
        const data = await createProduct(req.body);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Interal server issues, check logs.");
    };
});

Router.patch('/:key/:id', async function(req, res) {
    try {
        const data = await updateProduct(req.params.id, req.params.key, req.body);
        res.send(data);
    } catch (err) {
        console(err);
        res.status(500).send("Internal server issues, check logs.");
    };
});

Router.delete('/:id', async function(req, res) {
    try {
        const data = await deleteProduct(req.params.id);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server issues, check logs.");
    };
});

module.exports = Router;