const mongoose = require('mongoose');
const validator = require ('validator');
const bcrypt = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  name: { type: String, required: false },
  surname: { type: String, required: false },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  time : { type : Date, default: Date.now }

});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor (body) {
    this.body = body;
    this.errors = [];
    this.user = null
  }

  async register(){
    this.validate();
    if(this.errors.length > 0) return;
    
    await this.checkUser();

    if(this.errors.length > 0) return;

    const salt = bcrypt.genSaltSync(10);
    this.body.password = bcrypt.hashSync(this.body.password, salt);
    this.user = await LoginModel.create(this.body);
  }

  async login(){
    this.validate();
    if(this.errors.length > 0) return;
    
    await this.checkUser();
    if (this.errors.length > 0) {
      this.errors.pop();
    } else {
      this.errors.push('User not founded');
      return
    }

    await this.checkPassword();
    if(this.errors.length > 0) return;

  }

  async checkUser(){
    const user = await LoginModel.findOne ({ email: this.body.email }); 
    if (user) {
      this.errors.push('User already registered');
    } 
  }

  async findUser(id){
    const userData = await LoginModel.findById(id);
    return userData
  }

  async updateUser(id){
    this.user = await LoginModel.findByIdAndUpdate(id, this.body, {new: true});
  }

  async checkPassword(){
    this.user = await LoginModel.findOne ({ email: this.body.email });
    const password = bcrypt.compareSync(this.body.password, this.user.password);
    if (!password){
      this.errors.push('Incorrect Password');
      return
    }
  }

  validate() {
    this.cleanUp();
    if (!validator.isEmail(this.body.email)) this.errors.push('invalid Email');
          
    if (this.body.password.length < 3 || this.body.password.length > 17) this.errors.push('Password must have 3 to 16 characteres')
  }
  

  cleanUp() {
    for (const key in this.body){
      if (typeof this.body[key] != 'string'){
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password:this.body.password
    }
  }
}



module.exports = Login;
