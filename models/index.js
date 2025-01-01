const { Sequelize,DataTypes,Model } = require('sequelize');

const sequelize = new Sequelize('employedb', 'root', '', {
    host: 'localhost',
    logging:false,
    dialect: 'mysql' /*| 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db ={}
db.sequelize = Sequelize;
db.sequelize = sequelize

db.user = require('./user')(sequelize,DataTypes,Model)
db.contact = require('./contact')(sequelize,DataTypes,Model);
db.education = require('./education')(sequelize,DataTypes,Model);


// db.user.hasOne(db.contact, { foreignKey: 'userId'});

db.user.hasMany(db.contact, { foreignKey: 'userId'});
db.contact.belongsTo(db.user, { foreignKey: 'userId'});

db.contact.hasMany(db.education, { foreignKey: 'contactId'});
db.education.belongsTo(db.contact, { foreignKey: 'contactId'});

db.post = sequelize.define(
    'post',
    {
      content: DataTypes.STRING,
    },
    { timestamps: false },
  );
  
  db.reaction = sequelize.define(
    'reaction',
    {
      type: DataTypes.STRING,
    },
    { timestamps: false },
  );
  
  db.post.hasMany(db.reaction);
  db.reaction.belongsTo(db.post);


//  db.user.belongsToMany(db.contact, {through:'user_contact'});
//  db.contact.belongsToMany(db.user,{through:'user_contact'});


//  db.contact.belongsToMany(db.contact, {through:'user_contact'});
//  db.contact.belongsToMany(db.contact,{through:'user_contact'});

db.sequelize.sync({force:false})

module.exports = db