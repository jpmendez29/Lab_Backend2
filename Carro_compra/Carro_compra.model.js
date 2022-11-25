import mongoose from 'mongoose'

const CarSchema = new mongoose.Schema(
    {
    id_Productos: [],
    Total: {type: Number, required: true},
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Carro_compra", CarSchema, "Carro_compra");