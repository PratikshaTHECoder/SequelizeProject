module.exports = (sequelize, DataTypes, Model) => {
  class Contact extends Model { }
  Contact.init(
    {
      // Model attributes are defined here
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      PhoneNumber: {
        type: DataTypes.INTEGER,
        // allowNull defaults to true
      },
    },
    {
      sequelize,
      modelName: 'Contact'
    },
  );
  return Contact
}