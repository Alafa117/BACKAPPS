import Code from '../models/Code.js';

// Controlador para verificar el código
export const verifyCode = async (req, res) => {
    const { code } = req.body;
    try {
        // Verificar si el código existe y no ha sido usado
        const codeData = await Code.findOne({ code, used: false });
        if (!codeData) return res.status(404).json({ message: "Código inválido o ya usado" });

        // Marcar el código como usado y guardar
        codeData.used = true;
        await codeData.save();

        res.status(200).json({ message: "Código verificado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al verificar el código" });
    }
};
