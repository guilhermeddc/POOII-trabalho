import * as Yup from 'yup'

import User from '../models/User';
import File from '../models/File';
import Type from '../models/Type';
import Event from '../models/Event'

class EventController {
  async index (req, res) {
    const { page = 1 } = req.query

    const events = await Event.findAll({
      where: { canceled_at: null },
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

  async store (req, res) {
    const schema = Yup.object().shape({
      id_user: Yup.number().required(),
      id_type: Yup.number(),
      id_image: Yup.number(),
      name: Yup.string().required(),
      address: Yup.string().required(),
      date: Yup.date().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { id, id_user, id_type, id_image, name, address, date } = await Event.create(req.body)
    console.log(req.body);
    
    return res.json({ id, id_user, id_type, id_image, name, address, date })
  }

  async update (req, res) {
    const schema = Yup.object().shape({
      id_user: Yup.number(),
      id_type: Yup.number(),
      id_image: Yup.number(),
      name: Yup.string(),
      address: Yup.string(),
      date: Yup.date(),
      aceppted: Yup.boolean(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { id, id_user, id_type, id_image, name, address, date, aceppted } = await Event.update(req.body)

    return res.json({ id, id_user, id_type, id_image, name, address, date, aceppted })
  }
}

export default new EventController()