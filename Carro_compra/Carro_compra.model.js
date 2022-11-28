import mongoose from 'mongoose'

const CarSchema = new mongoose.Schema(
    {
    Productos: [{id_prod: {Type: mongoose.Types.ObjectId, trim: true}, Producto: {Type: String, trim: true}, Precio: {Type: Number, trim: true}, cantidad:{Type: Number, trim: true}}],
    Total: {type: Number, required: true},
    Id_Usuario: {type: mongoose.Types.ObjectId, trim: true, required: true, unique: true},
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Carro_compra", CarSchema, "Carro_compra");