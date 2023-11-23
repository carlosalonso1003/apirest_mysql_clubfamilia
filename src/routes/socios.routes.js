import { Router } from "express";
import { getSocio,getSocios,createSocio,updateSocio,deleteSocio } from "../controllers/socio.controllers.js";


const router=Router()

router.get('/socio',getSocios)

router.get('/socio/:id',getSocio)

router.post('/socio',createSocio)

router.patch('/socio/:id',updateSocio)

router.delete('/socio/:id',deleteSocio)

export default router