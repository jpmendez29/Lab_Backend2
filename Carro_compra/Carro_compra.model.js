import mongoose from 'mongoose'

const CarSchema = new mongoose.Schema(
    {
    id_Productos: [{type: mongoose.Types.ObjectId, trim: true}],
    Total: {type: Number, required: true},
    Id_Usuario: {type: mongoose.Types.ObjectId, trim: true, required: true},
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Carro_compra", CarSchema, "Carro_compra");