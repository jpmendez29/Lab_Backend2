const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
    {
    id_Productos: [],
    Total: {type: Number, required: true},
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Carro_compra", CarSchema, "Carro_compra");