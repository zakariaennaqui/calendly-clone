import jwt from 'jsonwebtoken';

const authClient = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Non autorisé, veuillez vous connecter" });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        if (token_decode.type !== 'client') {
            return res.json({ success: false, message: "Accès client requis" });
        }

        req.clientId = token_decode.id;
        next();

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

export default authClient;