const express = require('express');
const route = express.Router();
const Admin = require('../models/Admin');
const Constan = require('../config/hooks/Constanta');

route.post('/register', async(req, res) => {
    console.log(req.body);
    let request = new Admin({
        nama: req.body.nama,
        email: req.body.email,
        type_role: req.body.type_role,
        username:  req.body.username,
        password: req.body.password
    })
    
    try {
        const result = await request.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

});

route.post('/auth', async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    
    try {
        const data = await Admin.findOne({email:email,password:password});
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
    if(req.body.type_role !== null){
        res.result.type_role = req.body.type_role;
    }
    if(req.body.username !== null){
        res.result.username = req.body.username;
    }
    if(req.body.password !== null){
        res.result.password = req.body.password;
    }

    try {
        const resUpdate = await Admin.findOneAndUpdate({_id: req.params.id}, { $set: res.result }, { new: true });
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
        result = await Admin.findById(req.params.id);
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