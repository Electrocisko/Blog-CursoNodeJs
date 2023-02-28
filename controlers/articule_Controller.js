// import validateArticule from "../helpers/validateArticule.js";
// import articulesService from "../models/Articule.js";
// import fs from 'fs';
// import path from "path";

const validateArticule = require("../helpers/validateArticule.js");
const articulesService = require("../models/Articule.js");
const fs = require('fs');
const path = require('path');

const create = (req, res) => {
  // recoger los parametros
  let params = req.body;
  // Validar los datos
  try {
      validateArticule(params);
      const articule = new articulesService(params);
      articule.save((error, articuleSaved) => {
        if (error) {
          return res.status(400).json({
            message: "Error al guardar en base de datos",
            status: "error",
            error: error,
          });
        }

        return res.status(200).json({
          status: "success",
          articule: articuleSaved,
          message: "Guardado con exito",
        });
      });
    }
   catch (error) {
    return res.status(400).json({
      message: "Error al validar",
      status: "error",
      error: error,
    });
  }
};

const all = (req,res) => {
  let query = articulesService.find({});
if (req.params.lasts || !req.params.lasts == undefined) {
  query.limit(3);
}
  query.sort({date: -1});
  query.exec((error,articules) => {
    if(error || !articules) {
      return res.status(404).json({
        status: "error",
        message: "No se han encontrado los articulos"
      })
    }
    return res.status(200).send({
      status: "success",
      cuantity: articules.length,
      articules: articules
    });
  });
}

const one = (req,res) => {
  let id = req.params.id;
  articulesService.findById(id, (error, articule) => {
    if (error || !articule) {
      return res.status(404).json({
        status: "error",
        message: "No se han encontrado el articulo"
      })
    }
    return res.status(200).json({
      status:"success",
      articule: articule
    })
  });
}

const remove = (req,res) => {
  let id = req.params.id;
  articulesService.findOneAndDelete({ _id: id }, (error, info) => {
    if (error || !info) {
      return res.status(500).json({
        status: "error",
        message: "No se podido borrar el articulo"
      });
    }
    return res.status(200).json({
      status:"success",
      result: info
    });
  });
}

const update = (req,res) => {
  let id = req.params.id;
  let params = req.body;

  try {
    validateArticule(params)
      articulesService.findByIdAndUpdate(id, params,{new: true} ,(error, data) => {
        if (error || !data) {
          return res.status(500).json({
            status: "error",
            message: "No se a modificar el articulo"
          });
        }
        return res.status(200).json({
          status:"success",
          result: data
        });
      })
   
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "No se a modificar el articulo"
    });
  }
}  

const upLoad = (req, res) => {
  // para chequear que exista el archivo adjunto
  if (!req.file && !req.files) {
    return res.status(400).json({
      status: "error",
      message: "Invalid petition"
    })
  }
// para chequear que el archivo que esta adjuntando sea una imagen
  let file = req.file.originalname;
  let split_file = file.split("\.");
  let extension = split_file[1];

  if (extension != 'jpg' && extension != 'png' && extension != 'jpeg' && extension != 'gif') {
    fs.unlink(req.file.path, (error) => {
      return res.status(400).json({
        status: "error",
        message: "invalid file"
      })
    })
  } else {
// Voy actualizar la base de datos, agregando la imagen al producto en cuestion
    console.log(req.file.filename);
    let id = req.params.id;
    articulesService.findByIdAndUpdate(id, {image: req.file.filename},{new: true} ,(error, data) => {
      if (error || !data) {
        return res.status(500).json({
          status: "error",
          message: "No se a modificar el articulo"
        });
      }
      return res.status(200).json({
        status:"success",
        result: data,
        file: req.file
      });
    })
  }
}

const image = (req,res) => {
  const file = req.params.fichero;
  console.log('file', file)
  const physicalRoute = "./images/articules/"+file;

  console.log('ruta',physicalRoute);
  
  fs.stat(physicalRoute, (error, exist) => {
    if (exist) {
      return res.sendFile(path.resolve(physicalRoute));
    } else {
      return res.status(400).json({
        status: "error",
        message: "No existe la imagen ",
        exist,
        physicalRoute
      })
    }
  })
}

const search = (req, res) => {
    //Sacar String
  let item = req.params.item;

    // Find OR
articulesService.find({ "$or": [
  { "titel": {"$regex" : item, "$options": "i"}},
  { "conten": {"$regex" : item, "$options": "i"}}
]
})
.sort({date: -1})
.exec((error, result) => {
  if (error || !result || result.length <=0) {
    return res.status(404).json({
      status: "error",
      message: "No se ha encontrado nada"
    })
  } else {
    return res.status(200).json({
      status: "succes",
      result
    })
  }
})



  // Ordenar


  //Ejecutar consulta

 // Retornar resultado
 
}


//export { create, all, one, remove, update, upLoad, image, search};

module.exports = { create, all, one, remove, update, upLoad, image, search};




