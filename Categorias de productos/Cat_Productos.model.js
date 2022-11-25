const mongoose = require("mongoose");

const CategoriaSchema = new mongoose.Schema(
    {
    Nombre: {type: String, trim: true, required: true}
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Categoria", CategoriaSchema, "Categoria");