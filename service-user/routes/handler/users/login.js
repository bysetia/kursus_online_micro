const bcrypt = require('bcrypt');
const {
    User
} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        email: 'email|empty:false',
        password: 'string|min:6'
    }

    const validate = v.validate(req.body, schema);

    //panjang array lebih dari 0 maka dia akan eror
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }
    //ketika tidak ada eror
    const user = await User.findOne({
        //cek di database ada email tersebut atau tidak
        where: {
            email: req.body.email
        }
    });

    //jika tidak ada 
    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        });
    }
    //cek jika email ada di database maka akan cek kembali apakah passwordnya sama atau tidak
    //compare membandingkan string yang sudah di hash param 1 tidak berbentuk hash, param ke 2 sudah berbentuk hash
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    // jika password salah
    if (!isValidPassword) {
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        });
    }

    //jika semua ditemukan datanya dan benar maka akan berhasil login
    res.json({
        status: 'success',
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            profession: user.profession
        }
    });

}