const express = require('express');
const route = express.Router();
const Role = require('../models/Role');
const Constan = require('../config/hooks/Constanta');

route.get('/list', async(req, res) => {
    try {
        const data = await Role.find();
        res.status(Constan.STATUS_OK).json({
            status: Constan.STATUS_OK,
            message: "Data found",
            data
        });
    } catch (error) {
        res.status(Constan.STATUS_ERR).json({message:error})
    }
});
route.get('/list/:id', getItemId, (req, res) => {
    try {
        res.status(Constan.STATUS_OK).json({
            status: Constan.STATUS_OK,
            message: "Data found",
            data:res.result
        });
    } catch (error) {
        res.status(Constan.STATUS_ERR).json({message:error})
    }
});
route.post('/save', async(req, res) => {
    const role = new Role({
        code: req.body.code,
        ket: req.body.ket

    })
    try {
        const result = await role.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});
route.patch('/update/:id',getItemId, async(req, res) => {
    if(req.body.code !== null){
        res.result.code = req.body.code;
    }
    if(req.body.ket !== null){
        res.result.ket = req.body.ket;
    }

    try {
        const resUpdate = await Role.findOneAndUpdate({_id: req.params.id}, { $set: res.result }, { new: true });
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
        result = await Role.findById(req.params.id);
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