import Sequelize, { Model } from 'sequelize'

class Event extends Model {
  static init (sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        date: Sequelize.DATE,
        aceppted: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate = models => {
    Event.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' });
    Event.belongsTo(models.Type, { foreignKey: 'id_type', as: 'type' });
    Event.belongsTo(models.File, { foreignKey: 'id_image', as: 'image' });
  }
}

export default Event
