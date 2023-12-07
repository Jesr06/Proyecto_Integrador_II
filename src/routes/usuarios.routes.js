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
import { generarPDF } from "../controllers/usuarios.controllers.js";


import multer from 'multer';


const router = Router()

router.post('/consultar',getlogin )

router.post('/insertar',nuevosUsuarios )

router.post('/materias',nuevasMaterias )

router.patch('/act', actualizarUsuarios)

router.patch('/actu', cambioContrasena)

const multerStorage = multer.diskStorage({
    
    filename: (req, file, cb) => {
        
        const fileName = file.originalname;

        cb(null, fileName);
        
        
    }

});
const upload = multer({
    storage: multerStorage
});

router.post('/proyectos',upload.single('archivo'), proyectos  )

router.post('/semestre', getSemestre)

router.get('/fechaDeHoy', fechaDeHoy)

router.get('/fechas', getFecha)

router.post('/buscar', buscarMaterias)

router.post('/materiasProfesor', materiasProfesor)

router.post('/generarPDF', generarPDF)


export default router