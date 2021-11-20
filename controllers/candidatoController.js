const Candidato = require("../models/Candidato");
const {validationResult} = require("express-validator");


exports.crearCandidato = async(req,res)=>{

    // Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  
    try {
        
        // Crear nuevo candidato 
        const candidato = new Candidato(req.body);

        // Guardar creador via jwt
        candidato.creador =  req.usuario.id; 
        // console.log(candidato.creador);
        // console.log(req.usuario);

        // Guardar candidato
        candidato.save();
        res.json(candidato);


    } catch (error) {
        console.log(error);
        res.status(500).send(500);
    }
};

// Obtiene todos los candidatos del usuario actual
exports.obtenerCandidatosUser = async (req, res)=>{
    try {
        
        if(!req.usuario){

            const candidatos = await Candidato.find({}).sort({fcreado:-1});
            res.json({candidatos});

        }else{
        
        const candidatos = await Candidato.find({creador: req.usuario.id}).sort({fcreado:-1});
        res.json({candidatos});
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error al obtener candidatos del user");
    }
};


// Actualizar un candidato
exports.actualizarCandidato = async (req,res)=>{

    // Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // Extraer la información del candidato

  const {nombre} = req.body;
  const {fullNombre} = req.body;
  const {descripcionBreve} = req.body;
  const {partido} = req.body;
  const {genero} = req.body;
  const {cargos} = req.body;
  const {formacion} = req.body;
  const {logo} = req.body;
  const {posicion} = req.body;
  const {encuestas} = req.body;
  const {profesion} = req.body;
  const {sigep} = req.body;

  const nuevoCandidato = {};

  if(nombre){
      nuevoCandidato.nombre = nombre;
  }
  if(fullNombre){
    nuevoCandidato.fullNombre = fullNombre;
    }
    if(descripcionBreve){
        nuevoCandidato.descripcionBreve = descripcionBreve;
    }
    if(partido){
        nuevoCandidato.partido = partido;
    }
    if(genero){
        nuevoCandidato.genero = genero;
    }
    if(cargos){
        nuevoCandidato.cargos = cargos;
    }
    if(formacion){
        nuevoCandidato.formacion = formacion;
    }
    if(logo){
        nuevoCandidato.logo = logo;
    }
    if(posicion){
        nuevoCandidato.posicion = posicion;
    }
    if(encuestas){
        nuevoCandidato.encuestas = encuestas;
    }
    if(profesion){
        nuevoCandidato.profesion = profesion;
    }
    if(sigep){
        nuevoCandidato.sigep = sigep;
    }

    try {

        // Revisar el id

        let candidato = await Candidato.findById(req.params.id);

        // Revisar si existe el candidato 
        if(!candidato){
            return res.status(404).json("Candidato no encontrado");
        }

        // Creador del candidato (que sea la misma autenticada)
        if(candidato.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: "No autorizado"});
        }

        // Actualizar
        candidato = await Candidato.findByIdAndUpdate({_id: req.params.id}, {$set: nuevoCandidato},{new: true});

        res.json({candidato});
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en el serv al actualizar candidato");
    }

};

// Eliminar candidato

exports.eliminarCandidato = async (req,res)=>{

    let candidato = await Candidato.findById(req.params.id);

    
    try {
        // Revisar si existe el candidato 
    if(!candidato){
        return res.status(404).json("Candidato no encontrado");
    }

    // Creador del candidato (que sea la misma autenticada)
    if(candidato.creador.toString() !== req.usuario.id){
        return res.status(401).json({msg: "No autorizado"});
    }

    // Eliminar
    await Candidato.findOneAndRemove({_id: req.params.id});
    res.json({msg: "Candidato eliminado"});

        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al eliminar candidato");
    }

};