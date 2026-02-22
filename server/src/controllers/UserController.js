const { User } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const users = await User.findAll()
      res.send(users)
    } catch (err) {
      console.error(err)
      res.status(500).send({ error: 'Could not retrieve users' })
    }
  },

  async show (req, res) {
    try {
      const user = await User.findByPk(req.params.userId)
      if (!user) {
        return res.status(404).send({ error: 'User not found' })
      }
      res.send(user)
    } catch (err) {
      console.error(err)
      res.status(500).send({ error: 'Could not retrieve user' })
    }
  },

  async create (req, res) {
    try {
      // Model beforeCreate hook จัดการ hash password อัตโนมัติ
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      console.error(err)
      res.status(500).send({ error: err.message })
    }
  },

  async put (req, res) {
    try {
      // Model beforeUpdate hook จัดการ hash password อัตโนมัติ
      await User.update(req.body, {
        where: { id: req.params.userId },
        individualHooks: true  // เพื่อให้ beforeUpdate hook ทำงาน
      })
      res.send(req.body)
    } catch (err) {
      console.error(err)
      res.status(500).send({ error: 'Could not update user' })
    }
  },

  async remove (req, res) {
    try {
      const user = await User.findByPk(req.params.userId)
      if (!user) {
        return res.status(404).send({ error: 'User not found' })
      }
      await user.destroy()
      res.send(user)
    } catch (err) {
      console.error(err)
      res.status(500).send({ error: 'Could not delete user' })
    }
  }
}
