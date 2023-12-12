const bcrypt = require('bcrypt');
const {
    User
} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        name: 'string|empety:false',
        email: 'email|empety:false',
        password: 'string|min:6',
        profession: 'string|optional'
    }
    const validate = v.validate(req.body, schema);
    if (validate.lenght) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const user = await User.findOne({
        where: {email: req.body.email}
    });

    if (user) {
        return res.status(400).json({
            status: 'error',
            message: 'email already exist'
        });
    }

    // hash password    
    const password = await bcrypt.hash(req.body.password, 8);

    //insert ke database
    const data = {
        password,
        name: req.body.name,
        email: req.body.email,
        profession: req.body.profession,
        role: 'student' //set default user register => student
    };

    const createdUser = await User.create(data);
    return res.json({
        status: 'success',
        data: {
            id: createdUser.id
        }
    });
}