import 'core-js/stable';
import 'regenerator-runtime/runtime';

// import './assets/css/style.css';

console.log('Olá mundo 3');
import Login from './modules/Login';
const login = new Login('.form-login');
const signup = new Login('.form-signup');
login.init();
signup.init();