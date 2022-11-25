const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema(
    {
    Nombre: {type: String, trim: true, required: true},
    Precio: {type: Number, trim: true, required: true},
    id_Categoria : {type: String, trim: true, required: true},
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Producto", ProductoSchema, "Producto");