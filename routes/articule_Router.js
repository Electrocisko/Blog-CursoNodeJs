// import express from 'express';
// import { create, all, one, remove, update, upLoad, image, search } from '../controlers/articule_Controller.js';
// import multer from 'multer';

const express  = require('express');
const multer = require('multer');
const {create, all, one, remove, update, upLoad, image, search} = require('../controlers/articule_Controller.js')



const router = express.Router();

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './images/articules')
    },
    filename: (req,file, cb) => {
        cb(null, 'articule' + Date.now() + file.originalname)
    }
});

const loader = multer({storage: storage})

// Routes
router.post('/create', create);
router.get('/articules/:lasts?',all);
router.get('/articule/:id',one);
router.delete('/articule/:id', remove);
router.put('/articule/:id',update);
router.post('/subir-imagen/:id',[loader.single('file0')] ,upLoad);
router.get('/imagen/:fichero', image);
router.get('/buscar/:item', search);

//export default router;

module.exports = router;
