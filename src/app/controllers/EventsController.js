import * as Yup from 'yup'

import Event from '../models/Event'

class EventController {
  async index (req, res) {
    const events = await Event.findAll({
      where: { canceled_at: null }
    })
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