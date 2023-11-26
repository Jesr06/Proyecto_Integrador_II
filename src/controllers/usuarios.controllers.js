
import { pool } from "../db.js";


export const getlogin = async (req, res) => {
    const connection = await pool.getConnection();

    let isadmin = false;
    let autenticado = false;
    let nombre;
    let correo;
    console.log(req.body)
    try {
        const user = req.body.user;
        const pass = req.body.pass;


        const results = await connection.query('SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?', [user, pass])
        console.log(results[0][0])



        if (results[0].length >= 1) {
            // El usuario se autenticó correctamente
            autenticado = true;
            nombre = results[0][0].nombre;
            correo = results[0][0].correo;
            console.log("Autenticación exitosa");
            if (results[0][0].tipo == 1) {

                isadmin = true;

            }
            res.status(200).json({ isadmin: isadmin, autenticado: autenticado, nombre: nombre, correo: correo })

        } else {
            // Las credenciales son incorrectas
            console.log("Credenciales incorrectas");

            res.status(401).json({ message: "Credenciales incorrectas" });

        }

    } catch (error) {
        console.error('Error de consulta:', error);
        return res.status(500).json({
            message: 'Error interno del servidor al realizar la consulta'
        });
    }
}

export const getusuario = async (req, res) => {

    const [rows] = await pool.query('SELECT * FROM usuarios WHERE tipo = ?', [req.params.tipo])
    console.log(rows)
    res.send('Obteniendo empleado')

}

export const nuevosUsuarios = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        console.log('Solicitud POST recibida en /insertar');
        const profesores = req.body;
        console.log(profesores);

        await connection.beginTransaction();

        const sql = 'INSERT INTO usuarios (codigo, nombre, correo, contrasena, materias, tipo) VALUES (?, ?, ?, ?, ?, ?)';

        for (const profesor of profesores) {
            const { codigo, nombre, correo, contrasena, materias, tipo } = profesor;
            await connection.query(sql, [codigo, nombre, correo, contrasena, materias, tipo]);
        }

        await connection.commit();
        res.status(200).json({ rta: "Los usuarios han sido cargados" });
    } catch (error) {
        await connection.rollback();
        return res.status(500).json({
            message: 'Algo ha salido mal al intentar insertar los usuarios'
        });
    } finally {
        connection.release();
    }
}

export const nuevasMaterias = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        console.log('Solicitud POST recibida en /materias');
        const materias = req.body;
        console.log(materias);

        await connection.beginTransaction();

        const sql2 = 'INSERT INTO materia (nombre, codigo_profesor, id_semestre, codigo) VALUES (?, ?, ?, ?)';

        for (const materia of materias) {
            const { nombre, codigo_profesor, id_semestre, codigo } = materia;
            await connection.query(sql2, [nombre, codigo_profesor, id_semestre, codigo]);
        }

        await connection.commit();
        res.status(200).json({ rta: "Las materias han sido cargadas" });
    } catch (error) {
        await connection.rollback();
        return res.status(500).json({
            message: 'Algo ha salido mal al intentar insertar las materias'
        });
    } finally {
        connection.release();
    }
}

export const getSemestre = async (req, res) => {
    const connection = await pool.getConnection();
    console.log(typeof req.body)
    console.log(req.body)
    try {
        const id = req.body.id;
        const inicio = req.body.inicio;
        const fin = req.body.fin;

        await connection.query(`INSERT INTO semestre (fechaInicio, id_semestre, fechaFinalizacion) VALUES (?, ?, ?)`, [inicio, id, fin]);

        await connection.commit();
        res.status(200).json({ rta: "El semestre han sido cargados" });

    } catch (error) {
        await connection.rollback();
        return res.status(500).json({
            message: 'Algo ha salido mal al intentar cargar el semestre'
        });
    } finally {
        connection.release();
    }
}

export const proyectos = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        console.log('Solicitud POST recibida en /proyectos');
        // const proyectos = req.body;

        await connection.beginTransaction();
        
        const id_materia = req.body.id_materia
        const nombre = req.body.nombre
        const integrantes = req.body.integrantes
        const descripcion = req.body.descripcion
        const id_semestre_proyecto = req.body.id_semestre_proyecto
        // const sql2 = 'INSERT INTO proyecto (id_materia, nombre, integrantes, descripcion, id_semestre_proyecto) VALUES (?,?,?,?,?)';


        // const { id_materia, nombre, integrantes, descripcion,id_semestre_proyecto } = proyecto;
        await connection.query(`INSERT INTO proyecto (id_materia, nombre, integrantes, descripcion, id_semestre_proyecto) VALUES (?,?,?,?,?)`,
        [id_materia, nombre, integrantes, descripcion, id_semestre_proyecto]);


        await connection.commit();
        res.status(200).json({ rta: "el proyecto ha sido cargado" });
        console.log("Cargo");
    } catch (error) {
        console.log("Entro al error");
        await connection.rollback();
        return res.status(500).json({
            error: 'Error al insertar el proyecto en la base de datos',
            details: error.message // Aquí puedes incluir más detalles sobre el error si es necesario
        });
    } finally {
        connection.release();
    }
}


export const actualizarUsuarios = (req, res) => res.send('actualizando usuarios')

export const eliminarUsuarios = (req, res) => res.send('Eliminando usuarios')
