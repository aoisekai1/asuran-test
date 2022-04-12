const express = require('express');
const Constan =  require('../config/hooks/Constanta');
const { conLog, resJSON, response } = require('../config/hooks/Hooks');
const route = express.Router();
const Customers = require('../models/Customer');

route.get('/list', paginate, (req, res) => {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    try {
        res.status(Constan.STATUS_OK).json({
            status: Constan.STATUS_OK,
            message: "Data found",
            total: res.result.length,
            page: page,
            limit: limit,
            next_page: page + 1,
            prev_page: page == 1 ? page :  page - 1,
            data: res.result
        });
    } catch (error) {
        res.status(Constan.STATUS_ERR).json({message:error})
    }
});

route.get('/list/:id', getItemId,(req, res) => {
    try {
        res.status(Constan.STATUS_OK).json({
            status: Constan.STATUS_OK,
            message: "Data found",
            total: res.result.length,
            data: res.result
        });
    } catch (error) {
        res.status(Constan.STATUS_ERR).json({message:error})
    }
});

route.post('/register', async(req, res) => {
    let reqCustomer = new Customers({
        nama: req.body.nama,
        email: req.body.email,
        no_hp: req.body.no_hp,
        jekel:  req.body.jekel,
        password: req.body.password
    })
    
    try {
        const result = await reqCustomer.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

});

route.post('/auth', async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    
    try {
        const data = await Customers.findOne({email:email,password:password});
        res.status(Constan.STATUS_OK).json({
            status: Constan.STATUS_OK,
            message: "Data found",
            data
        });
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
});

route.patch('/update/:id',getItemId, async(req, res) => {
    if(req.body.nama !== null){
        res.result.nama = req.body.nama;
    }
    if(req.body.email !== null){
        res.result.email = req.body.email;
    }
    if(req.body.no_hp !== null){
        res.result.no_hp = req.body.no_hp;
    }
    if(req.body.jekel !== null){
        res.result.jekel = req.body.jekel;
    }
    if(req.body.alamat !== null){
        res.result.alamat = req.body.alamat;
    }
    if(req.body.password !== null){
        res.result.password = req.body.password;
    }

    try {
        const resUpdate = await Customers.findOneAndUpdate({_id: req.params.id}, { $set: res.result }, { new: true });
        res.status(201).json(resUpdate);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
route.delete('/delete/:id',getItemId, async(req, res) => {
    try {
        await res.result.remove();
        res.status(201).json({message:"Delete item success"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

async function getItemId(req, res, next){
    let result;
    try {
        result = await Customers.findById(req.params.id);
        if(result == null){
            return res.status(404).json({message: 'Cannot find product'});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    
    res.result = result;
    next();
}

async function paginate(req, res, next){
    let result;
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
        result = await Customers.find().limit(limit).skip(startIndex).exec();
        console.log(result);
        if(result == null){
            return res.status(404).json({message: 'Cannot find product'});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

    res.result = result;
    next();
}

module.exports = route