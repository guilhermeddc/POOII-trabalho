import User from '../models/User';
import File from '../models/File';

class AdminController {
  async index (req, res) {
    const admins = await User.findAll({
      where: { admin: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
      ],
    });

    return res.json(admins);
  }
}

export default new AdminController();