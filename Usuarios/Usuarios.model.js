import mongoose from 'mongoose'

const UsuariosSchema = new mongoose.Schema(
    {
    Usuario: {type: String, trim: true, required: true},
    Contraseña : {type: String, trim: true, required: true},
    id_Producto: {type: mongoose.Types.ObjectId, trim: true, required: false},
    id_Carrito: {type: mongoose.Types.ObjectId, trim: true, required: false},
    id_Categoria: {type: mongoose.Types.ObjectId, trim: true, required: false},
    id_Historial: {type: mongoose.Types.ObjectId, trim: true, required: false},
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Usuarios", UsuariosSchema, "Usuarios");