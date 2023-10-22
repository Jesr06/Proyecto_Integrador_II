import { Router } from "express";
import { getusuarios } from "../controllers/usuarios.controllers.js";
import { getusuario } from "../controllers/usuarios.controllers.js";
import { nuevosUsuarios } from "../controllers/usuarios.controllers.js";
import { actualizarUsuarios } from "../controllers/usuarios.controllers.js";
import { eliminarUsuarios } from "../controllers/usuarios.controllers.js";

const router = Router()

router.get('/consultar',getusuarios )

router.get('/consultar/:tipo',getusuario )

router.post('/insertar',nuevosUsuarios );

router.put('/act', actualizarUsuarios)

router.delete('/delete', eliminarUsuarios )


export default router