import mongoose from 'mongoose'
import CarSchema from "../Carro_compra/Carro_compra.model.js"
//Historial: {type: [], default: undefined},
const HistorialSchema = new mongoose.Schema(
    {
    Hist: [{type: CarSchema, required: true}],
    Id_Usuario: {type: mongoose.Types.ObjectId, trim: true, required: true, unique: true}
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Historial", HistorialSchema, "Historial");