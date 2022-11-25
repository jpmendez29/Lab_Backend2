import mongoose from 'mongoose'

const CategoriaSchema = new mongoose.Schema(
    {
    Nombre: {type: String, trim: true, required: true}
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Categoria", CategoriaSchema, "Categoria");