const mongoose = require("mongoose");
const CarSchema = require("../Carro_compra/Carro_compra.model")

const HistorialSchema = new mongoose.Schema(
    {
    Historial: {type: [CarSchema],default: undefined}
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Historial", HistorialSchema, "Historial");