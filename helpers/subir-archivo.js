const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (
  files,
  extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'],
  carpeta = ''
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    if (!extensionesValidas.includes(extension)) {
      return reject(
        `La extensión ${extension} no es permitida - ${extensionesValidas}`
      );
    }

    const nombreTemp = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        // return res.status(500).json({ err });
        reject(err);
      }

      // res.json({ msg: 'File uploaded to' + uploadPath });
      resolve(nombreTemp);
    });
  });
};

module.exports = {
  subirArchivo,
};
