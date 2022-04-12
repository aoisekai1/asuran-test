const express = require('express');
const route = express.Router();
const Claim = require('../models/Claim');
const Constan = require('../config/hooks/Constanta');

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

route.get('/list/user/:user_id', paginate, (req, res) => {
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

route.get('/list/last/record', async(req, res) => {
    try {
        let data = await Claim.find().limit(1).sort({ _id : -1 });
        res.status(Constan.STATUS_OK).json({
            status: Constan.STATUS_OK,
            message: "Data found",
            data
        });
    } catch (error) {
        console.log(error);
    }
})

route.get('/list/check/invoice/:invoice', getFindInvoice, (req, res) => {
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
})

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
    const claim = new Claim({
        user_id: req.body.user_id,
        no_polis: req.body.no_polis,
        no_invoice: req.body.no_invoice,
        jenis_ansuransi: req.body.jenis_ansuransi,
        priode: req.body.priode,
        okupasi: req.body.okupasi,
        harga_bangunan: req.body.harga_bangunan,
        konstruksi: req.body.konstruksi,
        alamat: req.body.alamat,
        provinsi: req.body.provinsi,
        kota: req.body.kota,
        kabupaten: req.body.kabupaten,
        daerah: req.body.daerah,
        gempa: req.body.gempa,
        total: req.body.total,
        approve: req.body.approve,
        approve_date: req.body.approve_date,
        approve_by: req.body.approve_by,
        reject: req.body.reject,
        reject_date: req.body.reject_date,
        reject_by: req.body.reject_by,
        status: "",
        expired: "",
        expired_date: req.body.expired_date
    })
    try {
        const result = await claim.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});
route.patch('/update/:id',getItemId, async(req, res) => {
    if(req.body.user_id !== null){
        res.result.user_id = res.result.user_id;
    }
    if(req.body.no_polis !== null){
        res.result.no_polis = req.body.no_polis;
    }
    if(req.body.no_invoice !== null){
        res.result.no_invoice = req.body.no_invoice;
    }
    if(req.body.jenis_ansuransi !== null){
        res.result.jenis_ansuransi = req.body.jenis_ansuransi;
    }
    if(req.body.priode !== null){
        res.result.priode = req.body.priode;
    }
    if(req.body.okupasi !== null){
        res.result.okupasi = req.body.okupasi;
    }
    if(req.body.harga_bangunan !== null){
        res.result.harga_bangunan = req.body.harga_bangunan;
    }
    if(req.body.konstruksi !== null){
        res.result.konstruksi = req.body.konstruksi;
    }
    if(req.body.alamat !== null){
        res.result.alamat = req.body.alamat;
    }
    if(req.body.provinsi !== null){
        res.result.provinsi = req.body.provinsi;
    }
    if(req.body.kota !== null){
        res.result.kota = req.body.kota;
    }
    if(req.body.kabupaten !== null){
        res.result.kabupaten = req.body.kabupaten;
    }
    if(req.body.daerah !== null){
        res.result.daerah = req.body.daerah;
    }
    if(req.body.gempa !== null){
        res.result.gempa = req.body.gempa;
    }
    if(req.body.total !== null){
        res.result.total = req.body.total;
    }
    if(req.body.approve !== null){
        res.result.approve = req.body.approve;
    }
    if(req.body.approve_by !== null){
        res.result.approve_by = req.body.approve_by;
    }
    if(req.body.approve_date !== null){
        res.result.approve_date = req.body.approve_date;
    }
    if(req.body.reject !== null){
        res.result.reject = req.body.reject;
    }
    if(req.body.reject_by !== null){
        res.result.reject_by = req.body.reject_by;
    }
    if(req.body.reject_date !== null){
        res.result.reject_date = req.body.reject_date;
    }
    if(req.body.status !== null){
        res.result.status = req.body.status;
    }
   

    try {
        const resUpdate = await Claim.findOneAndUpdate({_id: req.params.id}, { $set: res.result }, { new: true });
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
        result = await Claim.findById(req.params.id);
        if(result == null){
            return res.status(404).json({message: 'Cannot find product'});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

    res.result = result;
    next();
}

async function getFindInvoice(req, res, next){
    let result;
    try {
        result = await Claim.find({no_invoice:req.params.invoice});
        if(result == null){
            return res.status(404).json({message: 'Cannot find Invouce'});
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
    let param = {};

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    if(req.params.user_id !== undefined){
        param.user_id = req.params.user_id;
        param.jenis_ansuransi = req.query.type;
    }

    try {
        result = await Claim.find(param).limit(limit).skip(startIndex).exec();
        
        if(result == null){
            return res.status(404).json({message: 'Cannot find product'});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

    res.result = result;
    next();
}

module.exports = route;