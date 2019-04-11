const Box = require('../models/Box');

class BoxController {
  async store(req, res) {
    const box = await Box.create(req.body);

    return res.json(box);
  }

  async show(req, res) {
    const id = req.params.id;
    const box = await Box.findById(id).populate({
      path: 'files',
      // ordenar de forma decrescente (-1)
      options: { sort: { createdAt: -1 } },
    });

    return res.json(box);
  }
}

module.exports = new BoxController();
