const Sequelize = require('sequelize')

const sequelize = new Sequelize('nodelover', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

// const Product = sequelize.define('product', {
//   title: Sequelize.STRING
// });

// const User = sequelize.define('user', {
//   first_name: Sequelize.STRING,
//   last_name: Sequelize.STRING
// });

// const Address = sequelize.define('address', {
//   type: Sequelize.STRING,
//   line_1: Sequelize.STRING,
//   line_2: Sequelize.STRING,
//   city: Sequelize.STRING,
//   state: Sequelize.STRING,
//   zip: Sequelize.STRING,
// });

// Product.User = Product.belongsTo(User);
// User.Addresses = User.hasMany(Address);

// sequelize.sync({force: true});
// Product.create({
//   title: 'Chair',
//   user: {
//     first_name: 'Mick',
//     last_name: 'Broadstone',
//     addresses: [{
//       type: 'home',
//       line_1: '100 Main St.',
//       city: 'Austin',
//       state: 'TX',
//       zip: '78704'
//     }]
//   }
// }, {
//   include: [{
//     association: Product.User,
//     include: [ User.Addresses ]
//   }]
// });

// Object.keys(Product.User).forEach(console.log);

// Product.create({
//   title: 'Chair',
//   user: {
//     first_name: 'Mick',
//     last_name: 'Broadstone'
//   }
// }, {
//   include: [Product.User]
// });




// async function main() {
//   const A = sequelize.define('a', {a: Sequelize.STRING});
//   const B = sequelize.define('b', {o: Sequelize.INTEGER});
//   A.B = A.belongsTo(B);
//   await sequelize.sync({force:true});
//   await A.create({
//     a: 'some',
//     b: {
//       o: 2
//     }
//   }, {
//     include: [A.B]
//   })
// }

main();
