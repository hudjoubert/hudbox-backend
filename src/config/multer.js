const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const dest = path.resolve(__dirname, '..', '..', 'tmp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err);

      file.key = `${hash.toString('hex')}-${file.originalname}`;

      cb(null, file.key);
    });
  },
});

const files = multer({ storage: storage });

module.exports = files;
