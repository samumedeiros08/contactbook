const { async } = require('regenerator-runtime');
const Account = require('../models/AccountModel');
const Login = require('../models/LoginModel');

exports.index = async (req,res) =>{
    if(!req.session.user) return res.render('404')
    const user = new Login()
    const userData = await user.findUser(req.session.user._id);
    console.log(userData);
    res.render('account', { userData })
}

exports.accountUpdate = async (req,res) => {
    if(!req.session.user) return res.render('404');
    
    const user = new Login(req.body);
        await user.updateUser(req.session.user._id);
        
        req.flash('success', 'User Updated');
        req.session.user = user.user
        req.session.save(function() {
            return res.redirect(`/account/index/`) ;
        });
}

