const User = require("../models/User");
const bcrypt = require('bcryptjs')

const AltPerfil = async (req, res, next) => {
    const userId = req.user.userId;
    const { name, email, altPassword, oldPassword, newPassword, confirmPassword } = req.body;
    try {

        const user = await User.findById(userId);

        if (altPassword == true) {
            if (oldPassword) {
                const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
                if (!isPasswordCorrect) {
                    return res.json({ error: 'Senha antiga inválida' });
                }
            }
            if (newPassword !== confirmPassword) {
                return res.json({ error: "Senhas não conferem" })
            }
            user.password = newPassword
        }
        if (!user) {
            return res.json({ error: 'User not found' });
        }
        user.name = name;
        user.email = email;

        await user.save();
        res.json({ message: 'Usuário alterado com sucesso!', data: user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { AltPerfil }