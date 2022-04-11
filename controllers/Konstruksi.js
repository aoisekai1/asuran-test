const express = require('express');
const route = express.Router();
const Konstruksi = require('../models/Konstruksi');
const Constan = require('../config/hooks/Constanta');

route.get('/list', async(req, res) => {
    try {
        const data = await Konstruksi.find();
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
    const konstruksi = new Konstruksi({
        kelas: req.body.kelas,
        ket: req.body.ket

    })
    try {
        const result = await konstruksi.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});
route.patch('/update/:id',getItemId, async(req, res) => {
    if(req.body.kelas !== null){
        res.result.kelas = req.body.kelas;
    }
    if(req.body.ket !== null){
        res.result.ket = req.body.ket;
    }

    try {
        const resUpdate = await Konstruksi.findOneAndUpdate({_id: req.params.id}, { $set: res.result }, { new: true });
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
        result = await Konstruksi.findById(req.params.id);
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