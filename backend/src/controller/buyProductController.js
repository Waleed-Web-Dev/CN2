import {buyProductAgency, buyProductClient} from "../resend/email.js";


export const buyProduct = async (req, res) => {
    try{
        const {email} = req.body;
        await buyProductAgency(email);
        await buyProductClient(email);
        res.status(200).json({
            success: true,
            message: `Purchase email sent`,
        })
    }catch (e) {
        res.status(500).send(`Error in buyProductController: ${e}`);
    }
}