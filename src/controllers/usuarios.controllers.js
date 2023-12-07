
import { pool } from "../db.js";
import {uploadImage} from "../../js/cloudinary.js";
// 
import { jsPDF } from 'jspdf';
import fs from 'fs';
import PDFDocument from 'pdfkit';
import path from 'path';
// import 'jspdf-autotable'; // Asegúrate de importar el módulo autotable si lo necesitas

// 
export const getlogin = async (req, res) => {
    const connection = await pool.getConnection();

    let isadmin = false;
    let autenticado = false;
    let nombre;
    let correo;
    let codigo;
    let celular;
    let documento;
    let materias;
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
            codigo = results[0][0].codigo;
            celular = results[0][0].celular;
            documento = results[0][0].documento;
            materias = results[0][0].materias;
            console.log("Autenticación exitosa");
            if (results[0][0].tipo == 1) {

                isadmin = true;

            }
            res.status(200).json({
                isadmin: isadmin, autenticado: autenticado, nombre: nombre,
                correo: correo, codigo: codigo, celular: celular, documento: documento, materias: materias
            })

        } else {
            // Las credenciales son incorrectas
            console.log("Credenciales incorrectas");

            res.status(401).json({ message: "Credenciales incorrectas", autenticado: autenticado });

        }

    } catch (error) {
        console.error('Error de consulta:', error);
        return res.status(500).json({
            message: 'Error interno del servidor al realizar la consulta'
        });
    }
}

export const actualizarUsuarios = async (req, res) => {
    const connection = await pool.getConnection();
    const codigo = req.body.codigo;
    let celular = req.body.celular;
    let documento = req.body.documento;
    let nombre = req.body.nombre;
    console.log(req.body);
    if (documento == "") {
        documento = null;
    }
    if (nombre == "") {
        nombre = null;
    }
    if (celular == "") {
        celular = null;
    }
    await connection.query('UPDATE usuarios SET nombre = IFNULL(?, nombre), celular = IFNULL(?, celular), documento = IFNULL(?, documento) WHERE codigo = ?', [nombre, celular, documento, codigo])


    const datos = await connection.query('SELECT * FROM usuarios WHERE codigo = ?', [codigo])
    if (datos[0].length >= 1) {
        //Datos nuevos que actualiza el usuario
        nombre = datos[0][0].nombre;
        celular = datos[0][0].celular;
        documento = datos[0][0].documento;
    }

    res.status(200).json({ nombre: nombre, celular: celular, documento: documento })

}

export const cambioContrasena = async (req, res) => {
    const connection = await pool.getConnection();
    const codigo = req.body.codigo;
    const contrasena = req.body.contrasena;

    await connection.query('UPDATE usuarios SET contrasena = ? WHERE codigo = ?', [contrasena, codigo])

    res.status(200).json({ rta: "Todo bien" })
}


export const fechaDeHoy = async (req, res) => {
    let connection;

    let fechaDeHoy = new Date();
    let año = fechaDeHoy.getFullYear().toString();
    let dia = ('0' + fechaDeHoy.getDate()).slice(-2); // Agrega cero delante si es necesario
    let mes = ('0' + (fechaDeHoy.getMonth() + 1)).slice(-2); // Agrega cero delante si es necesario
    let fecha = `${año}-${mes}-${dia}`;

    try {
        connection = await pool.getConnection();

        let fechaSemestre = await connection.query('SELECT id_semestre FROM semestre WHERE STR_TO_DATE(?, "%Y-%m-%d") BETWEEN STR_TO_DATE(fechaInicio, "%Y-%m-%d")  AND STR_TO_DATE(fechaFinalizacion, "%Y-%m-%d")', [fecha]);

        const hoy = fechaSemestre[0][0];
        res.status(200).json({ hoy: hoy.id_semestre });

        await connection.commit();

    } catch (error) {
        console.error('Error al obtener la conexión:', error);

    } finally {
        if (connection) {
            connection.release(); // Asegúrate de liberar la conexión en todos los casos
        }
    }
};



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
        console.log(materias, "Endpoint");

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
    const archivoName = req.file.filename.split('.')[0];;
    console.log(archivoName);
    console.log(req.body);
    try {

        const result = await uploadImage(req.file.path,archivoName);
        
        await connection.beginTransaction();

        const documento = result.secure_url
        const id_materia = req.body.id_materia
        const nombre = req.body.nombre
        const integrantes = req.body.integrantes
        const descripcion = req.body.descripcion
        const id_semestre_proyecto = req.body.semestre



        
        await connection.query(`INSERT INTO proyecto (id_materia, nombre, integrantes, descripcion, documentos, id_semestre_proyecto) VALUES (?,?,?,?,?,?)`,
            [id_materia, nombre, integrantes, descripcion,documento, id_semestre_proyecto, ]);


        await connection.commit();
        res.status(200).json({ rta: "el proyecto ha sido cargado" });
        
         
    } catch (error) {
        console.log("Entro al error");
        console.log(error);
        await connection.rollback();
        return res.status(500).json({
            error: 'Error al insertar el proyecto en la base de datos',
            details: error.message // Aquí puedes incluir más detalles sobre el error si es necesario
        });
    } finally {
        connection.release();
    }
}

export const getFecha = async (req, res) => {
    let connection;

    let fechaDeHoy = new Date();
    let año = fechaDeHoy.getFullYear().toString();
    let dia = ('0' + fechaDeHoy.getDate()).slice(-2); // Agrega cero delante si es necesario
    let mes = ('0' + (fechaDeHoy.getMonth() + 1)).slice(-2); // Agrega cero delante si es necesario
    let fecha = `${año}-${mes}-${dia}`;

    try {
        connection = await pool.getConnection();

        let fechaSemestre = await connection.query('SELECT * FROM semestre WHERE STR_TO_DATE(?, "%Y-%m-%d") BETWEEN STR_TO_DATE(fechaInicio, "%Y-%m-%d")  AND STR_TO_DATE(fechaFinalizacion, "%Y-%m-%d")', [fecha]);

        const inicio = fechaSemestre[0][0].fechaInicio;
        const final = fechaSemestre[0][0].fechaFinalizacion;

        res.status(200).json({ inicio: inicio, final: final });



        await connection.commit();

    } catch (error) {
        console.error('Error al obtener la conexión:', error);

    } finally {
        if (connection) {
            connection.release(); // Asegúrate de liberar la conexión en todos los casos
        }
    }
}


export const buscarMaterias = async (req, res) => {
    const connection = await pool.getConnection();
    console.log(req.body)
    try {

        const materia = req.body.materia;
        const semestre = req.body.semestre;


        const materias = 'SELECT * FROM proyecto WHERE id_materia = ?';
        const semestres = 'SELECT * FROM proyecto WHERE id_semestre_proyecto = ?';
        const materiaYsemestre = 'SELECT * FROM proyecto WHERE id_materia = ? AND id_semestre_proyecto =?';
        const todo = 'SELECT * FROM proyecto'

        if (materia == "" && semestre == "") {
            console.log("Ambos datos vacios");
            const results = await connection.query(todo);
            res.status(200).json({
                results: results
            })
        } else if (materia == "" && semestre != "") {
            console.log("Materia vacia");
            const results = await connection.query(semestres, [semestre]);
            res.status(200).json({
                results: results
            })
        } else if (materia != "" && semestre != "") {
            console.log("No hay datos vacios");
            const results = await connection.query(materiaYsemestre, [materia, semestre]);
            res.status(200).json({
                results: results
            })
        } else if (semestre == "" && materia != "") {
            // El usuario se autenticó correctamente
            console.log("Semestre vacio");
            const results = await connection.query(materias, [materia]);
            res.status(200).json({
                results: results
            })
        } else {
            // Datos incorrectos
            console.log("1er Datos incorrectos o no encontrados");

            res.status(401).json({ message: "2do Datos incorrectos o no encontrados" });
        }






    } catch (error) {
        console.error('Error de consulta:', error);
        return res.status(500).json({
            message: 'Error interno del servidor al realizar la consulta'
        });
    }
}


export const materiasProfesor = async (req, res) => {
    const connection = await pool.getConnection();
    console.log(req.body)
    try {

        const codigo = req.body.codigo;


        const results = await connection.query(`SELECT * FROM materia WHERE codigo_profesor = ?`, [codigo]);


        await connection.commit();

        res.status(200).json({
            results: results
        })
        console.log("Cargo");



    } catch (error) {
        console.error('Error de consulta:', error);
        return res.status(500).json({
            message: 'Error interno del servidor al realizar la consulta'
        });
    }
}

///nuevo mierdero

// export const generarPDF = async (req, res) => {
//     try {
//         // Obtener el contenido del div desde el cuerpo de la solicitud
//         const { contenidoDiv } = req.body;

//         // Obtener la ruta completa al directorio "Descargas"
//         const scriptDir = path.dirname(new URL(import.meta.url).pathname);
//         const descargasDir = path.join('C:\\Users\\Ryzen\\Downloads'); // Ajusta la ruta según la estructura de tu proyecto

//         // Crear la carpeta "Descargas" si no existe
//         if (!fs.existsSync(descargasDir)) {
//             fs.mkdirSync(descargasDir);
//         }

//         // Configurar las opciones de pdfkit
//         const outputPath = path.join(descargasDir, 'documento.pdf');
//         const pdfDoc = new PDFDocument();

//         // Crear el archivo PDF y escribir el contenido del div
//         pdfDoc.pipe(fs.createWriteStream(outputPath));
//         pdfDoc.text('Esto es el informe:');
//         pdfDoc.text(contenidoDiv);

//         // Finalizar el PDF
//         pdfDoc.end();

//         // Enviar la respuesta al cliente
//         res.status(200).send('PDF generado y descargado con éxito.');
//     } catch (error) {
//         console.error('Error al generar el PDF:', error);
//         res.status(500).send('Error al generar el PDF.');
//     }
// };



export const generarPDF = async (req, res) => {
    try {
        // Obtener el contenido del div desde el cuerpo de la solicitud
        const { contenidoDiv } = req.body;

        // Configurar las opciones de pdfkit
        const outputPath = 'documento.pdf';
        const pdfDoc = new PDFDocument();

        // Crear el archivo PDF y escribir el contenido del div
        pdfDoc.pipe(fs.createWriteStream(outputPath));
        pdfDoc.text('Esto es el informe:');
        pdfDoc.text(contenidoDiv);

        // Finalizar el PDF
        pdfDoc.end();

        // Enviar la respuesta al cliente
        res.status(200).send('PDF generado y descargado con éxito.');
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).send('Error al generar el PDF.');
    }
};




