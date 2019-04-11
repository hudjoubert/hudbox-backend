const File = require('../models/File');
const Box = require('../models/Box');

class FileController {
  async store(req, res) {
    let fileName = req.file.originalname;
    let pathFile = req.file.key;

    const box = await Box.findById(req.params.id);
    const file = await File.create({
      title: fileName,
      path: pathFile,
    });

    box.files.push(file);

    await box.save();

    req.io.sockets.in(box._id).emit('file', file);

    return res.json(file);
  }
}

module.exports = new FileController();
