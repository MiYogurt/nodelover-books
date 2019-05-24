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

import UserDefined , { UserAttributes, UserInstance  }  from './user';
import BookDefined, {BookAttributes, BookInstance} from './book';
import TagDefined, {TagAttributes, TagInstance} from './tag';

async function main() {
  try {
    const User = sequelize.import<UserInstance, UserAttributes>('./user');
    const Book = sequelize.import<BookInstance, BookAttributes>('./book');
    const Tag = sequelize.import<TagInstance, TagAttributes>('./tag');
    const Comment = sequelize.import('./comment');
    const Post = sequelize.import('./post');
    const Image = sequelize.import('./image');

    Object.keys(sequelize.models).forEach(modelName => {
      const model = (sequelize.models[modelName] as any)
      if('associate' in model){
        model.associate(sequelize.models)
      }
    })

    // await sequelize.sync({force: true});

    // let book = await Book.create({author:'alice', description: 'typescript hand book', status: 'inSale',title:'ts leaning'});
    // let user = await User.create({email:'belovedyogurt@gmail.com',name: 'yugo'})
    // book.setUser(user);
    // await book.save();

    // const user = await User.findOne({
    //   where: {id: 1},
    //   include: [{ model: Book }]
    // });
    // console.log(user.Book);
    // const books = await user.getBooks();
    // console.log(books);


    // let user = await User.create({email:'belovedyogurt@gmail.com',name: 'yugo'})
    // await user.createTag({name: '萌新'});

    // let tag = (await Tag.findAll())[0];

    // const tagUser = (await tag.getUsers())[0];

    // console.log(user.id == tagUser.id);

    // let post = await Post.create({
    //   title: 'name',
    //   content: 'some'
    // });

    // let image = await Image.create({
    //   title: 'image',
    //   imageURL: 'url'
    // });

    // console.log((post as any).__proto__)

    // await (post as any).createComment({
    //   text: 'hello'
    // });

    // await (image as any).createComment({
    //   text: 'hello2'
    // });


    await Book.create({
      author: '213',
      description: '213',
      status: "inSale",
      title: '12322',
      User: {
        email: '1733996866@qq.com',
        name: 'some',
        Tags: [
          {name: '123'},
          {name: '22'}
        ]
      }
    },{
      include: [{
        association: (Book as any).User,
        include: [(User as any).Tag]
      }]
    });

  }catch(e){
    console.log(e)
    if (e instanceof Sequelize.ValidationError) {
      console.log(e.message);
    }
  }
  process.exit(0)
}

main()

