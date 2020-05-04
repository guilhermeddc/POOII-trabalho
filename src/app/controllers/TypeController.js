import * as Yup from 'yup'

import Type from '../models/Type'

class TypeController {
  async store (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const typeExists = await Type.findOne({ where: { name: req.body.name } })

    if (typeExists) {
      return res.status(400).json({ error: 'Type already exists' })
    }

    const { id, name } = await Type.create(req.body)

    return res.json({ id, name })
  }
}

export default new TypeController()