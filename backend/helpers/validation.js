const validate = require('validator');

const inputValidator = (name, email, password, role) => {
       if (!name) throw new Error('Name is required');
       if (!email) throw new Error('Email is required');
       if (!validate.isEmail(email)) throw new Error('Email is not valid');
       if (!password) throw new Error('Password is required');
       if (!validate.isStrongPassword(password)) throw new Error('Password must be strong');
       if (!role) throw new Error('Role is required');
       return true;
};

module.exports = inputValidator;