import * as Yup from 'yup'

import Type from '../models/Type'

class TypeController {
  async index (req, res) {
    const types = await Type.findAll({
      attributes: ['id', 'name']
    })

    return res.json(types)
  }
  async store (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { name } = await Type.create(req.body)


    return res.json({ name })
  }
}

export default new TypeController()