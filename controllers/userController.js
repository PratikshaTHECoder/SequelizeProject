const { QueryTypes, Model, where } = require('sequelize');
var db = require('../models')
var User = db.user;
var Contact = db.contact;
var Education = db.education;

var addUser = async (req, res) => {
    const jane = await User.create({ firstName: 'Jiten', lastName: 'John' });
    // const jane = User.build({ firstName: 'Jane', lastName: "patil" });
    console.log(jane instanceof User); // true
    console.log(jane.name); // "Jane"
    console.log('Jane was saved to the database!');
    // await jane.save();
    res.status(200).json(jane.toJSON());
}
var getUsers = async (req, res) => {
    const data = await User.findAll({});
    res.status(200).json({ data: data })
}

var getUser = async (req, res) => {
    const data = await User.findOne({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ data: data })
}

var postUser = async (req, res) => {
    var postData = req.body;
    if (postData.length > 1) {
        var data = await User.bulkCreate(postData);
    } else {
        var data = await User.create(postData);
    }
    res.status(200).json({ data: data })
}

var deleteUser = async (req, res) => {
    const data = await User.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ data: data })
}


var patchUser = async (req, res) => {
    var updatedData = req.body
    const data = await User.update(updatedData, {
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ data: data })
}

var getSetVertualUser = async (req, res) => {
    const data = await User.findAll({
        where: {
            lastName: 'Nigam'
        }
    })
    // const data = await User.create({
    //   firstName:'Vinayak',
    //   lastName:'Kumar'
    // })
    res.status(200).json({ data: data })
}

var validator = async (req, res) => {
    var data = {};
    var messages = {}
    try {
        data = await User.create({
            firstName: 'Arya343',
            lastName: 'Kumar'
        })
    } catch (e) {
        // console.log(e.errors)
        let message;
        e.errors.forEach(error => {
            switch (error.validatorKey) {
                case 'isAlpha':
                    message = "Only alphabet allowed";
                    break;
                case 'not_unique':
                    message = `value must be unique`;
                    break;

                default:
                    message = error.message;

            }
            messages[error.path] = message
        });
    }
    res.status(200).json({ data: data, messages: messages })
}
var rawQueriesUser = async (req, res) => {
    const users = await db.sequelize.query('SELECT * FROM users WHERE lastName = ?', {
        replacements: ['kumar112 ,indien'],
        type: QueryTypes.SELECT,
    });
    res.status(200).json({ data: users })
}

var oneToOneUser = async (req, res) => {
    // const data = await User.create({ firstName: 'Hitesh', lastName: 'Trivedi' });
    // if(data && data.id){
    //     await Contact.create({ PhoneNumber: '916784516', address: 'abc',userId : data.id });
    // }
    const data = await User.findAll({
        attributes: ['firstName', 'lastName'],
        include: [{
            model: Contact,
            as: 'ContactDetails',
            attributes: [
                'PhoneNumber', 'address']
        }],
        where: { id: 3 }
    })
    res.status(200).json({ data: data })

}

var oneToManyUser = async (req, res) => {
    //  const data = await Contact.create({ PhoneNumber: '75079335', address: 'abc',userId :1});
    // if(data && data.id){
    //     await Contact.create({ PhoneNumber: '916784516', address: 'abc',userId : data.id });
    // }

    // const data = await Contact.findAll({
    //     attributes:['PhoneNumber','address'],
    //     include:[{
    //         model:User,
    //         as:'userDetails',
    //         attributes:['firstName','lastName']
    //     }],
    //     // where:{id:3}
    // })
    const data = await C.findAll({
        attributes: ['firstName', 'lastName'],
        include: [{
            model: Contact,
            as: 'ContactDetails',
            attributes: [
                'PhoneNumber', 'address']
        }],
        where: { id: 3 }
    })
    res.status(200).json({ data: data })

}

var manyToManyUser = async (req, res) => {
    //  const data = await Contact.create({ PhoneNumber: '74589645', address: 'xyz'});
    // if(data && data.id){
    // await User.create({ firstName: 'gaurav', lastName: 'desale' });
    // }

    // const data = await Contact.findAll({
    //     attributes:['PhoneNumber','address'],
    //     include:[{
    //         model:User,
    //         as:'userDetails',
    //         attributes:['firstName','lastName']
    //     }],
    //     // where:{id:3}
    // })
    const data = await Contact.findAll({
        attributes: ['PhoneNumber', 'address'],
        include: [{
            model: User,
            attributes: [
                'firstName', 'lastName']
        }],
        // where:{id:3}
    })
    res.status(200).json({ data: data })
}

var paranoid = async (req, res) => {
    // const data = await User.create({ firstName: 'shubham', lastName: 'desale' });
    // const data = await User.destroy({
    //     where:{
    //         id:1
    //     },
    //     force:true
    // })
    await post.restore(); // to restore soft delete value
    const data = await User.findAll({});

    res.status(200).json({ data: data })
}


var eagerLoading = async (req, res) => {
    const data = await User.findAll({
        include: {
            model: Contact,
            include: {
                model: Education
            }
        }
    });
    res.status(200).json({ data: data })
}

var hooksUser = async (req, res) => {
    const data = await User.create({ firstName: 'gaurav', lastName: 'desale', status: 0 });
    res.status(200).json({ data: data })

}

async function makePostWithReactions(content, reactionTypes) {
    const post = await db.post.create({ content });
    await db.reaction.bulkCreate(reactionTypes.map(type => ({ type, postId: post.id })));
    return post;
}

var subQueries = async (req, res) => {
    // await makePostWithReactions('Hello World', [
    //     'Like',
    //     'Angry',
    //     'Laugh',
    //     'Like',
    //     'Like',
    //     'Angry',
    //     'Sad',
    //     'Like',
    // ]);
    // await makePostWithReactions('My Second Post', ['Laugh', 'Laugh', 'Like', 'Laugh']);
    // res.status(200).json({ data: 1 })
    var data= await db.post.findAll({
        attributes: {
          include: [
            [
              db.sequelize.literal(`(
                          SELECT COUNT(*)
                          FROM reactions AS reaction
                          WHERE
                              reaction.postId = post.id
                              AND
                              reaction.type = "Laugh"
                      )`),
              'laughReactionsCount',
            ],
          ],
        },
        order: [[db.sequelize.literal('laughReactionsCount'), 'DESC']],  
      });
    res.status(200).json({ data: data})          
}


module.exports = {
    addUser,
    getUsers,
    getUser,
    postUser,
    deleteUser,
    patchUser,
    getSetVertualUser,
    validator,
    rawQueriesUser,
    oneToOneUser,
    oneToManyUser,
    manyToManyUser,
    paranoid,
    eagerLoading,
    hooksUser,
    subQueries
}