import express from 'express'
import {fillForm} from "../controller/formController.js";
import {buyProduct} from "../controller/buyProductController.js";

const router = express.Router()


router.post("/fillForm", fillForm)
router.post("/checkout", buyProduct)

export default router;