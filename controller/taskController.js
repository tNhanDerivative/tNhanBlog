const User = require('../model/user');
const jwt = require('jsonwebtoken');

const getUserByToken = async (req, res) => {
    const token = req.cookies.jwt;

    let user = await jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
        try{
            const user = await User.findById(decodedToken.id);
            return user;
        }
        catch(err){
            if (err.messageFormat === undefined){
                console.log(err);
            } else { console.log(err); }
        };
        
    });
    return user;
};

const task_all_get = (req, res) => {
    res.render('task/allTask');
};

const task_all_post = (req, res) =>{
    const {title, snipet, body} = req.body;
    const token = req.cookies.jwt;

    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
    let user = await User.findById(decodedToken.id);
    user.tasks.push({title, snipet, body});
    user.save()
    .then( result => res.redirect('/allTask'))
    .catch( err => console.log(err));
    })
};

const task_create_get = (req, res) => {
    res.render('task/create', { title: 'Create a new task' });
};

const task_detail_get = async (req, res) => {
    const id = req.params.id;
    // const token = req.cookies.jwt;

    // jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
    //     try{
    //         let user = await User.findById(decodedToken.id);
    //     }
    //     catch(err){
    //         if (err.messageFormat === undefined){
    //             console.log(err);
    //             res.render('404');
    //         } else { console.log(err); }
    //     };
        
    // })
    const user = await getUserByToken( req, res);
    console.log(user.email);
    res.render('task/detail',{task: user.tasks.id(id)});
};


const task_detail_delete = async (req, res) => {
    const id = req.params.id;
    console.log(req.params);

    const user = await getUserByToken(req,res);
    // console.log(user.tasks.id(id).title);
    user.tasks.id(id).remove();
    user.save()
    .then(result => res.json({redirect: "/allTask"}))
    .catch(err => console.log(err));
  };


  module.exports ={
      task_all_get,
      task_all_post,
      task_create_get,
      task_detail_get,
      task_detail_delete
  };