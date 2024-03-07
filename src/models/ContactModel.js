const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: true },
    userId: { type: String, required: true },
    time : { type : Date, default: Date.now },
  
});

  const ContactModel = mongoose.model('Contact', ContactSchema);

  class Contact {
    constructor (body, userId){
        this.body = body;
        this.userId = userId;   
        this.errors = [];
        this.contact = null
    }

    
    async register(){
        this.validate();
        if(this.errors.length > 0) return;
        this.contact = await ContactModel.create(this.body);

    }

    async findId(id) {
        const contact = await ContactModel.findById(id);
        return contact;
    }
    
    async update(id){
        this.validate();
        if(this.errors.length > 0) return;
        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {new: true})
    }

    async delete(id){
      await ContactModel.deleteOne({_id: id})
  }
    
    async findContact(userId){
        const contacts = await ContactModel.find({userId: userId});
        return contacts;
    }


    //VALIDATIONS METHODS
    validate() {
        this.cleanUp();
        if(!this.body.name) this.errors.push('Name is required');
        if (!validator.isEmail(this.body.email)) this.errors.push('invalid Email');
      }
      
    
      cleanUp() {
        for (const key in this.body){
          if (typeof this.body[key] != 'string'){
            this.body[key] = '';
          }
        }
    
        this.body = {
          name: this.body.name,
          surname: this.body.surname,
          phone: this.body.phone,
          email: this.body.email,
          userId: this.userId
        }
      }
}


  module.exports = Contact