const { async } = require('regenerator-runtime');
const Login = require('../models/LoginModel')

exports.index = (req,res) => {
    if (req.session.user) {return res.render('login-user')
    } else {
    return res.render('login');
    }    
}

exports.signup = async (req, res) => {
    try{
        const login = new Login (req.body);
        await login.register();
    
        if (login.errors.length > 0 ){
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/login/index');
            });
            return
        }

        req.flash('success', 'User Created');
        req.session.save(function() {
            return res.redirect('/login/index');
        });
    } catch(e){
        res.render('404');
        console.log(e)
    };
}

exports.login = async (req, res) => {
    try{
        const login = new Login (req.body);
        await login.login();
    
        if (login.errors.length > 0 ){
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/login/index');
            });
            return
        }

        req.flash('user', login.user.email);
        req.session.user = login.user
        req.session.save(function() {
            return res.redirect('/');
        });
    } catch(e){
        res.render('404');
        console.log(e)
    };
}

exports.logout = async  (req, res) =>{
    try {
        req.session.destroy();
        res.redirect('/')
    } catch (e){
        console.log(e);
        return res.render('404');
    }
}