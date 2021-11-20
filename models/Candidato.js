const mongoose = require("mongoose");

const CandidatoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },
    fullNombre:{
        type: String,
        required: true,
    },
    descripcionBreve:{
        type: String,
        required: true,
    },
    partido:{
        type: String,
        required: true,
    },
    genero:{
        type: String,
        required: true,
        trim:true,
    },
    cargos:{
        type: Object,
        required: true,
    },
    formacion:{
        type: Object,
        required: true,
    },
    logo:{
        type: String,
        required: true,

    },
    posicion:{
        type: String,
        required: true,
        trim: true,

    },
    encuestas:{
        type: Boolean,
        required: true,
    },
    profesion:{
        type: String,
        required: true,
    },
    foto:{
        type: String,
        required: true,
    },
    sigep:{
        type: String,
        required: true,
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
    },
    fcreado:{
        type: Date,
        default: Date.now(),
    }
}
);

module.exports = mongoose.model("Candidato", CandidatoSchema);