const express = require('express');
const route = express.Router();
const PrivillageUser = require('../models/PrivillageUser');
const Constan = require('../config/hooks/Constanta');
const { purge } = require('./Privillage');

route.get('/list', async(req, res) => {
    try {
        const data = await PrivillageUser.find();
        res.status(Constan.STATUS_OK).json({
            status: Constan.STATUS_OK,
            message: "Data found",
            data
        });
    } catch (error) {
        res.status(Constan.STATUS_ERR).json({message:error})
    }
});
route.get('/list/:id', async(req, res) => {
    try {
        let result = await PrivillageUser.findOne({user_id: req.params.id});
        res.status(Constan.STATUS_OK).json({
            status: Constan.STATUS_OK,
            message: "Data found",
            data:result
        });
    } catch (error) {
        res.status(Constan.STATUS_ERR).json({message:error})
    }
});
route.post('/save', async(req, res) => {
    const pu = new PrivillageUser({
        privillage_id: req.body.privillage_id,
        user_id: req.body.user_id,
        isRead: req.body.isRead,
        isInsert: req.body.isInsert,
        isUpdate: req.body.isUpdate,
        isDelete: req.body.isDelete,
        isApprove: req.body.isApprove,
        isReject: req.body.isReject,
    })
    try {
        const result = await pu.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});
route.patch('/update/:id',getItemId, async(req, res) => {
    if(req.body.privillage_id !== null){
        res.result.privillage_id = res.result.privillage_id;
    }
    if(req.body.user_id !== null){
        res.result.user_id = req.body.user_id;
    }
    if(req.body.isRead !== null){
        res.result.isRead = req.body.isRead;
    }
    if(req.body.isInsert !== null){
        res.result.isInsert = req.body.isInsert;
    }
    if(req.body.isUpdate !== null){
        res.result.isUpdate = req.body.isUpdate;
    }
    if(req.body.isDelete !== null){
        res.result.isDelete = req.body.isDelete;
    }
    if(req.body.isApprove !== null){
        res.result.isApprove = req.body.isApprove;
    }
    if(req.body.isReject !== null){
        res.result.isReject = req.body.isReject;
    }
   

    try {
        const resUpdate = await PrivillageUser.findOneAndUpdate({_id: req.params.id}, { $set: res.result }, { new: true });
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
        result = await PrivillageUser.findById(req.params.id);
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