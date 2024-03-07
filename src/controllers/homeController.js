const { async } = require('regenerator-runtime');
const Contact = require('../models/ContactModel')

exports.index = async (req, res) => {
  // res.render('index')
  
  if(!req.session.user) return res.render('index');
  console.log(req.session.user);
  const user = new Contact();
  const contacts  = await user.findContact(req.session.user._id);

  console.log(contacts);

  // if (!contacts) return res.render('404');
  res.render('index', {contacts})
  
};
