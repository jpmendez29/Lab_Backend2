import mongoose from 'mongoose'
import CarSchema from "../Carro_compra/Carro_compra.model.js"

const HistorialSchema = new mongoose.Schema(
    {
    Historial: {type: [], default: undefined},
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Historial", HistorialSchema, "Historial");