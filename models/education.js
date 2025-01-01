module.exports = (sequelize, DataTypes, Model) => {
    class Education extends Model { }
    Education.init(
      {
        // Model attributes are defined here
        class_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        grade: {
          type: DataTypes.INTEGER,
          // allowNull defaults to true
        },
        passing_year: {
            type: DataTypes.INTEGER,
            // allowNull defaults to true
          },
      },
      {
        sequelize,
        modelName: 'education'
      },
    );
    return Education
  }