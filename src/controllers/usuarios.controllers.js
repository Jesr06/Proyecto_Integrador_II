
import { pool } from "../db.js";

export const getusuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ha salido mal'
        })
    }
}

export const getusuario = (req, res) => {
    //GetUsuario

    
}

export const nuevosUsuarios = async (req, res) => {
    const connection = await pool.getConnection();

    try {
        console.log('Solicitud POST recibida en /insertar');
        const estudiantes = req.body;
        console.log(estudiantes);

        await connection.beginTransaction();

        const sql = 'INSERT INTO usuarios (codigo, nombre, correo, contrasena, materias, tipo) VALUES (?, ?, ?, ?, ?, ?)';

        for (const estudiante of estudiantes) {
            const { codigo, nombre, correo, contrasena, materias, tipo } = estudiante;
            await connection.query(sql, [codigo, nombre, correo, contrasena, materias, tipo]);
        }

        await connection.commit();
        res.status(200).json("Nice");
    } catch (error) {
        await connection.rollback();
        return res.status(500).json({
            message: 'Algo ha salido mal al intentar insertar los usuarios'
        });
    } finally {
        connection.release();
    }
    
    
    
    // try {
    //     console.log('Solicitud POST recibida en /insertar')
    //     const estudiantes = req.body;
    //     console.log(estudiantes);
    //     // const {codigo, nombre, correo, contrasena, materias, tipo} = req.body; // Se espera que req.body sea un objeto de usuario

    //     const sql = 'INSERT INTO usuarios (codigo, nombre, correo, contrasena, materias, tipo) VALUES (?, ?, ?, ?, ?, ?)';

    //     for (const estudiante of estudiantes) {
    //         const { codigo, nombre, correo, contrasena, materias, tipo } = estudiante

    //         const [rows] = await pool.query(sql, [codigo, nombre, correo, contrasena, materias, tipo]);

    //     }
    //     res.status(200).json("Nice")
    // } catch (error) {
    //     return res.status(500).json({
    //         message: 'Algo ha salido al intentar insertar los usuarios'
    //     })
    // }
}

export const actualizarUsuarios = (req, res) => res.send('actualizando usuarios')

export const eliminarUsuarios = (req, res) => res.send('Eliminando usuarios')
