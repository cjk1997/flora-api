const express = require('express');
const router = express.Router();
const {
    getPlants,
    addPlant,
    updatePlant,
    updatePlantDetails,
    deletePlant
} = require('../../data/plants');

router.get('/', async function(req, res, next) {
    try {
        const data = await getPlants();
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server issues, check logs.");
    };
});

router.post('/', async function(req, res) {
    try {
        const data = await addPlant(req.body);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server issues, check logs.");
    };
});

router.put('/:id', async function(req, res) {
    try {
        const data = await updatePlant(req.params.id, req.body);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server issues, check logs.");
    };
});

router.patch('/:id', async function(req, res) {
    try {
        const data = await updatePlantDetails(req.params.id, req.body);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server issues, check logs.")
    }
})

router.delete('/:id', async function(req, res) {
    try {
        const data = await deletePlant(req.params.id);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server issues, check logs.");
    };
});

module.exports = router;