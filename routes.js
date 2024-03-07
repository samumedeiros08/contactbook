const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController');
const accountController = require('./src/controllers/accountController');

// Rotas da home
route.get('/', homeController.index);


//Routes login
route.get('/login/index', loginController.index);
route.post('/login/login',loginController.login);
route.post('/login/signup',loginController.signup);
route.get('/login/logout',loginController.logout);

//Routes contact
route.get('/contact/index', contactController.index);
route.post('/contact/create', contactController.create);
route.get('/contact/index/:id', contactController.contactIndex);
route.get('/contact/Edit/:id', contactController.contactEdit);
route.post('/contact/Edit/:id', contactController.contactEdit);
route.post('/contact/update/:id', contactController.contactUpdate);
route.post('/contact/delete/:id', contactController.contactDelete);

//Routes my account
route.get('/account/index', accountController.index);
route.post('/account/update', accountController.accountUpdate);

module.exports = route;
