const express = require('express');
const app = express();
const route = express.Router();
const bodyParser = require('body-parser');
const Product = require('../models/Products');

//Create json parse
var jsonparse = bodyParser.json();

//create application
var urlCodeParse = bodyParser.urlencoded({extended:false});
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

route.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
});

route.post('/save', async (req, res) => {
    const products = new Product({
        priode: req.body.priode,
        builder: req.body.builder,
        builder_price: req.body.builder_price

    })
    try {
        const resProduct = await products.save();
        res.status(201).json(resProduct);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});

route.get('/edit/:id', getProductId, (req, res) => {
    res.send(res.product.builder);
});

route.patch('/update/:id', getProductId, async(req, res) => {
    if(req.body.priode !== null){
        res.product.priode = req.body.priode;
    }
    if(req.body.builder !== null){
        res.product.builder = req.body.builder;
    }
    if(req.body.builder_price !== null){
        res.product.builder_price = req.body.builder_price;
    }

    try {
        const resUpdate = await res.product.save();
        res.status(201).json(resUpdate);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

route.delete('/delete/:id', getProductId, async(req, res) => {
    try {
        await res.product.remove();
        res.status(201).json({message:"Delete product success"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

async function getProductId(req, res, next){
    let product;
    try {
        product = await Product.findById(req.params.id);
        if(product == null){
            return res.status(404).json({message: 'Cannot find product'});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

    res.product = product;
    next();
}

module.exports = route;