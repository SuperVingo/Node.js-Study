const Sequelize = require('sequelize');
const User = require('./user');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

db.User = User;

User.init(sequelize);

User.associate(db);

// INSERT Statement
User.create({
  name: 'SuperVingo',
  age: 24,
  married: false,
  comment: '자기소개',
});

// SELECT * Statement
User.findAll({});

// SELECT * - LIMIT 1 Statement
User.findOne({});

// SELECT name, married Statement
User.findAll({
  attributes: ['name', 'married'],
});

// SELECT name, married - WHERE AND Statement
User.findAll({
  attributes: ['name', 'age'],
  where: {
    married: true,
    age: { [Op.gt]: 30 }, // > -> Op에서 가져와서 사용
  },
});

// SELECT name, married - WHERE OR Statement
User.findAll({
  attributes: ['name', 'age'],
  where: {
    [Op.or]: [{ married: false}, { age: { [Op.gt]: 30 } }],
  },
});

// SELECT ORDER BY age DESC Statement
User.findAll({
  order: [['age', 'DESC']],
});

// SELECT ORDER BY age DESC LIMIT 1 Statement
User.findAll({
  order: ['age', 'DESC'],
  limit: 1,
  offset: 1,
});

// UPDATE WHERE Statement
User.update({
  comment: '바꿀내용',
}, {
  where: { id: 2 },
});

// DELETE WHERE Statement
User.destroy({
  where: { id: 2 },
});

//
const user = await User.findOne({
  include: [{
    model: Comment,
  }]
});

const comments = await user.getComments();
const comments = await user.getComments({
  where: {
    id: 1,
  },
  attributes: ['id'],
});

const comments = await user.setComments();

const comm = await Comment.create();
const comm2 = await Comment.create();
const comments = await user.addComment(comm);
const comments = await user.addComment(comm.id);
const comments = await user.addComment([comm, comm2]);

const comments = await user.addComments();
const comments = await user.removeComments();

//
const [result, metadata] = await sequelize.query('SELECT * from comments');
console.log(result)

module.exports = db;