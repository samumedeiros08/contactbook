const { async } = require('regenerator-runtime');
const Contact = require('../models/ContactModel')



exports.index = (req, res) => {
    // console.log(req.session.user);
    res.render('contact', {
        contact:{ }
    });
    return;
  };

exports.create = async (req, res) => {
    console.log('create' , req.session.user._id);
    try{
        const contact = new Contact(req.body, req.session.user._id);
        await contact.register();

        if (contact.errors.length >0){
            req.flash('errors', contact.errors);
            req.session.save(function() {
                return res.redirect('/contact/index');
            });
            return
        }

        req.flash('success', 'Contact Created');
        req.session.save(function() {
            return res.redirect(`/contact/index/${contact.contact._id}`);
        });

    } catch(e){
        console.log(e);
    }
}

exports.contactIndex = async(req, res) => {

    const user = new Contact();
    if (!req.params.id) return res.render('404');
    const contact = await user.findId(req.params.id);

    if (!contact) return res.render('404')
    return res.render('contact', {contact}) 
}

exports.contactEdit = async(req, res) => {

    const user = new Contact();
    if (!req.params.id) return res.render('404');
    const contact = await user.findId(req.params.id);

    if (!contact) return res.render('404')
    return res.render('contactEdit', {contact}) 
}

exports.contactUpdate = async(req, res) => {

    if (!req.params.id) return res.render('404');
    const contact = new Contact(req.body, req.session.user._id);
        await contact.update(req.params.id);


    if (contact.errors.length >0){
        req.flash('errors', contact.errors);
        req.session.save(function() {
            return res.redirect(`/contact/edit/${req.params.id}`);
        });
        return
    }

    req.flash('success', 'Contact Updated');
    req.session.save(function() {
        return res.redirect(`/contact/index/${contact.contact._id}`);
    });
}

exports.contactDelete = async(req, res) => {

    if (!req.params.id) return res.render('404');
    const contact = new Contact(req.body, req.session.user._id);
        await contact.delete(req.params.id);


    if (contact.errors.length >0){
        req.flash('errors', contact.errors);
        req.session.save(function() {
            return res.redirect(`/contact/edit/${req.params.id}`);
        });
        return
    }

    req.flash('success', 'Contact Deleted');
    req.session.save(function() {
        return res.redirect('/contact/index');
    });
}
    