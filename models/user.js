module.exports = (sequelize, DataTypes, Model) => {
    class User extends Model { }
    User.init(
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                get() {
                    const rawValue = this.getDataValue('firstName');
                    return rawValue ? 'Mr.' + rawValue.toUpperCase() : null;
                },
            },
            lastName: {
                type: DataTypes.STRING,
                // validate:{
                //     isAlpha: true,
                // },
                set(value) {
                    this.setDataValue('lastName', value + ' ,Indien');
                },
            },
            fullName: {
                type: DataTypes.VIRTUAL,
                get() {
                    return `${this.firstName} ${this.lastName}`;
                },
                set(value) {
                    throw new Error('Do not try to set the `fullName` value!');
                },
            },
            status: DataTypes.INTEGER
        },
        {
            hooks: {
                beforeValidate: (user, options) => {
                    user.lastName = 'happy';
                },
                afterValidate: (user, options) => {
                    user.status = '1';
                },
            },
            sequelize,
        },
        {
            sequelize,
            modelName: 'User',
            paranoid: true,
            deletedAt: 'soft-delete',
        },
    );
    return User
}