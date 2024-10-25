import mongoose from 'mongoose';

const codeSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    premio: {
        type: String,
        required: true
    },
    usado: {
        type: Boolean,
        default: false
    },
    usuarioGanador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Code = mongoose.model('Code', codeSchema);
export default Code;