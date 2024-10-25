import Code from '../models/Code.js';

const verifyCode = async (req, res) => {
    try {
        const { codigo } = req.body;
        const code = await Code.findOne({ codigo, usado: false });

        if (!code) {
            return res.status(404).json({ message: 'Código inválido o ya usado' });
        }

        code.usado = true;
        code.usuarioGanador = req.user._id;
        await code.save();

        res.json({
            success: true,
            premio: code.premio,
            message: `¡Felicitaciones! Has ganado ${code.premio}`
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { verifyCode };