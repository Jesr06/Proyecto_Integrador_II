
import { pool } from "../db.js";


export const getlogin = async (req, res) => {
    const connection = await pool.getConnection();
    console.log(typeof req.body)
    let isadmin=false;
    let autenticado=false;
    console.log(req.body)
    try {
        const user = req.body.user;
        const pass = req.body.pass;
       
        
        const results = await connection.query('SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?' , [ user, pass ])
        console.log(results[0][0])
        
        if (results[0].length>=1) {
            // El usuario se autenticó correctamente
            autenticado=true;
            console.log("Autenticación exitosa");
        if(results[0][0].tipo==1){
            
         isadmin=true;
            
        } 
        res.status(200).json({isadmin:isadmin,autenticado:autenticado})
           
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
        const estudiantes = req.body;
        console.log(estudiantes);

        await connection.beginTransaction();

        const sql = 'INSERT INTO usuarios (codigo, nombre, correo, contrasena, materias, tipo) VALUES (?, ?, ?, ?, ?, ?)';

        for (const estudiante of estudiantes) {
            const { codigo, nombre, correo, contrasena, materias, tipo } = estudiante;
            await connection.query(sql, [codigo, nombre, correo, contrasena, materias, tipo]);
        }

        await connection.commit();
        res.status(200).json({rta:"Los usuarios han sido cargados"});
        

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
