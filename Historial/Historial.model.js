import mongoose from 'mongoose'
import CarSchema from "../Carro_compra/Carro_compra.model.js"

const HistorialSchema = new mongoose.Schema(
    {
    Historial: {type: [CarSchema.schema], default: undefined},
    Id_Usuario: {type: mongoose.Types.ObjectId, trim: true, required: true, unique: true}
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Historial", HistorialSchema, "Historial");