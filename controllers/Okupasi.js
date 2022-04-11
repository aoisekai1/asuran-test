const express = require('express');
const route = express.Router();
const Okupasi = require('../models/Okupasi');
const Constan = require('../config/hooks/Constanta');

route.get('/list', paginate, (req, res) => {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    try {
        if(page){
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
        }else{
            res.status(Constan.STATUS_OK).json({
                status: Constan.STATUS_OK,
                message: "Data found",
                total: res.result.length,
                data: res.result
            });
        }
        
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
route.get('/list/premi/:code', getItemCode, (req, res) => {
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
    const okupasi = new Okupasi({
        code: req.body.code,
        premi: req.body.premi,
        ket: req.body.ket

    })
    try {
        const result = await okupasi.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});
route.patch('/update/:id',getItemId, async(req, res) => {
    if(req.body.code !== null){
        res.result.code = req.body.code;
    }
    if(req.body.premi !== null){
        res.result.premi = req.body.premi;
    }
    if(req.body.ket !== null){
        res.result.ket = req.body.ket;
    }

    try {
        const resUpdate = await Okupasi.findOneAndUpdate({_id: req.params.id}, { $set: res.result }, { new: true });
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
        result = await Okupasi.findById(req.params.id);
        if(result == null){
            return res.status(404).json({message: 'Cannot find product'});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

    res.result = result;
    next();
}

async function getItemCode(req, res, next){
    let result;
    try {
        result = await Okupasi.findOne({code: req.params.code});
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
        if(page){
            result = await Okupasi.find().limit(limit).skip(startIndex).exec();
        }else{
            result = await Okupasi.find();
        }
        
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