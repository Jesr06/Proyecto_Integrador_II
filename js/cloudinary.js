import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({

    cloud_name: 'dstmigrce',
    api_key: 951863316631431,
    api_secret: "naVCnSChIXlhWsxGI1r2Sk5wywU"

})

export const uploadImage = async (filePath, fileName) => {

    return cloudinary.uploader.upload(filePath, {
        folder: 'Proyectos',
        resource_type: 'raw',
        public_id: fileName
    });
}
