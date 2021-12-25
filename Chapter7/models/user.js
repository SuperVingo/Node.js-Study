const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        // 1 : N
        //db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });  -> 1
        //db.Comment.hasMany(db.User, { foreignKey: 'commenter', targetKey: 'id' });  -> N
        
        // 1 : 1
        //db.User.hasOne(db.Info, { foreignKey: 'userID', sourceKey: 'id' }); => 1
        //db.Info.hasOne(db.User, { foreignKey: 'userID', targetKey: 'id' }); -> 1

        // N : M
        //db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); => N
        //db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' }); -> M
    }
};