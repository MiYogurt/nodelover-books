import Sequelize from 'sequelize';

const sequelize = new Sequelize('nodelover', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

const S = Sequelize

interface UserAttributes {
  email: string;
  name: string;
}

interface UserInstance extends Sequelize.Instance<UserAttributes> {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  email: string;
  name: string;
}

const User = sequelize.define<UserInstance, UserAttributes>
  ('User', {
    email: S.STRING,
    name: S.STRING
  });

(User as any).prototype.say = function(this: UserInstance) {
  console.log('name ' + this.name);
}


interface BookAttributes {
  status: "inSale" | "noSale";
  // status: any;
  description: string;
  title: string;
  author: string;
}

interface BookInstance extends Sequelize.Instance<BookAttributes> {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  status: "inSale" | "noSale";
  // status: any;
  description: string;
  title: string;
  author: string;
}
const Book = sequelize.define<BookInstance, BookAttributes>('Book', {
  id: {
    type: S.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  description: S.TEXT,
  status: {
    type: S.ENUM,
    values: ['inSale', 'noSale'],
    validate: {
      isIn: {
        args: [['inSale', 'noSale']],
        msg: "status field must be inSale or noSale"
      }
    }
  },
  title:{
    type: S.STRING,
    allowNull: false,
    get(this: BookInstance) {
      return this.getDataValue('author') + ' - ' + this.getDataValue('title');
    }
  },
  author: {
    type: S.STRING,
    allowNull: false,
    set(val: string){
      this.setDataValue('author', val.toLowerCase());
    }
  },
  userId:{ // User 表的外键
    type: S.INTEGER,
    references: {
      model: User
    }
  }
},{
    comment: "图书表", // 表注释
    indexes: [  // 表索引
      {
        fields: ['id']
      }
    ]
});




/* 1.1 */

// async function main() {
//   try {
//     await User.sync();
//     const user = User.build({ name: 'yugo', email: 'soome@gmail.com' });
//     await user.save();
//     // -----------------------
//     // const user = await User.findAll();
//     // (user[0] as any).say()
//     process.exit(0)
//   }catch(e){
//     console.log(e)
//   }
// }

/* 1.2 */

// async function main() {
//   try {
//     // await Book.sync();
//     // await User.sync();

//     Book.beforeValidate(() => {
//       console.log("验证之前");
//     });

//     // const book = Book.build({ status: "onSale", author: "yugo", description: "lean ts", title: "typescript" });
//     // await book.validate()

//     // const book = Book.build({ status: "inSale", author: "yugo", description: "lean ts", title: "typescript" });
//     // await book.save()

//   }catch(e){
//     // console.log(e)
//     if (e instanceof Sequelize.ValidationError) {
//       console.log(e.message);
//     }
//   }
//   process.exit(0)
// }

/* 1.3 */

import PhoneDefine , { PhoneAttributes, PhoneInstance }  from './phone';

async function main() {
  try {
    // const Phone = sequelize.import<PhoneInstance, PhoneAttributes>('Phone', PhoneDefine);
    const Phone = sequelize.import<PhoneInstance, PhoneAttributes>('./phone');
    
    await Phone.sync()
    let phone = await Phone.create({name:"IPhone", type: "Apple"})
    console.log(phone);

  }catch(e){
    // console.log(e)
    if (e instanceof Sequelize.ValidationError) {
      console.log(e.message);
    }
  }
  process.exit(0)
}

main()