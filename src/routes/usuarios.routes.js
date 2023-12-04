import { Router } from "express";
import { getlogin } from "../controllers/usuarios.controllers.js";
import { nuevosUsuarios } from "../controllers/usuarios.controllers.js";
import { nuevasMaterias } from "../controllers/usuarios.controllers.js";
import { actualizarUsuarios } from "../controllers/usuarios.controllers.js";
import { cambioContrasena  } from "../controllers/usuarios.controllers.js";
import { proyectos } from "../controllers/usuarios.controllers.js";
import { getSemestre } from "../controllers/usuarios.controllers.js";
import { fechaDeHoy } from "../controllers/usuarios.controllers.js";
import { getFecha } from "../controllers/usuarios.controllers.js";
import { buscarMaterias } from "../controllers/usuarios.controllers.js";
import { materiasProfesor } from "../controllers/usuarios.controllers.js";

const router = Router()

router.post('/consultar',getlogin )

router.post('/insertar',nuevosUsuarios )

router.post('/materias',nuevasMaterias )

router.patch('/act', actualizarUsuarios)

router.patch('/actu', cambioContrasena)

router.post('/proyectos', proyectos )

router.post('/semestre', getSemestre)

router.get('/fechaDeHoy', fechaDeHoy)

router.get('/fechas', getFecha)

router.post('/buscar', buscarMaterias)

router.post('/materiasProfesor', materiasProfesor)

export default router