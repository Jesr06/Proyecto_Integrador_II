import { Router } from "express";
import { getlogin } from "../controllers/usuarios.controllers.js";
import { getusuario } from "../controllers/usuarios.controllers.js";
import { nuevosUsuarios } from "../controllers/usuarios.controllers.js";
import { nuevasMaterias } from "../controllers/usuarios.controllers.js";
import { actualizarUsuarios } from "../controllers/usuarios.controllers.js";
import { eliminarUsuarios } from "../controllers/usuarios.controllers.js";
import { proyectos } from "../controllers/usuarios.controllers.js";
import { getSemestre } from "../controllers/usuarios.controllers.js";

const router = Router()

router.post('/consultar',getlogin )

router.get('/consultar/:tipo',getusuario )

router.post('/insertar',nuevosUsuarios )

router.post('/materias',nuevasMaterias )

router.put('/act', actualizarUsuarios)


router.post('/proyectos', proyectos )

router.delete('/delete', eliminarUsuarios)

router.post('/semestre', getSemestre)

export default router