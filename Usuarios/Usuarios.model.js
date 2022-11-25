const mongoose = require("mongoose");

const UsuariosSchema = new mongoose.Schema(
    {
    Usuario: {type: String, trim: true, required: true},
    Contraseña : {type: String, trim: true, required: true},
    id_Producto: {type: mongoose.Types.ObjectId, trim: true, required: false},
    id_Carrito: {type: mongoose.Types.ObjectId, trim: true, required: false},
    id_Categoria: {type: mongoose.Types.ObjectId, trim: true, required: false},
    id_Historial: {type: mongoose.Types.ObjectId, trim: true, required: false},
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Usuarios", UsuariosSchema, "Usuarios");