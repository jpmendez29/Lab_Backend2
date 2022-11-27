import mongoose from 'mongoose'

const ReseñaSchema = new mongoose.Schema(
    {
    Reseña: {type: String, trim: true, required: true},
    Puntuacion : {type: Number, trim: true, required: true},
    Id_Usuario: {type: mongoose.Types.ObjectId, trim: true, required: true},
    Id_Producto: {type: mongoose.Types.ObjectId, trim: true, required: true},
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Reseña", ReseñaSchema, "Reseña");