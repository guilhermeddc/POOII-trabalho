import Event from '../models/Event'
import User from '../models/User';
import File from '../models/File';
import Type from '../models/Type';

class UserEventController {
  async index (req, res) {
    const { page = 1 } = req.query

    const events = await Event.findAll({
      where: { canceled_at: null, id: req.userId },
      order: ['date'],
      limit: 6,
      offset: (page - 1) * 6,
      attributes: ['id', 'date', 'name', 'address'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url']
            }
          ]
        },
        {
          model: Type,
          as: 'type',
          attributes: ['id', 'name']
        },
        {
          model: File,
          as: 'image',
          attributes: ['id', 'path', 'url']
        }
      ]
    })

    return res.json(events);
  }
}

export default new UserEventController()