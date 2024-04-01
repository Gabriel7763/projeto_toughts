const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }

    static async loginPost(req, res) {
        const { email, password } = req.body

        // validar se usuário existe
        const user = await User.findOne({ where: { email }})

        if(!user) {
            req.flash('message', 'Usuário não encontrado!')
            res.render('auth/login')

            return
        }
        // validar senhas
        const passwordMatch = bcrypt.compareSync(password, user.password)
        if(!passwordMatch) {
            req.flash('message', 'Senha invalida')
            res.render('auth/login')

            return
        }

        //inicializar sessão
        req.session.userid = user.id

        req.flash('message', 'Autenticação realizada com sucesso!')

        req.session.save(() => {
            res.redirect('/')
        })
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async registerPost(req, res) {
        //validações
        const { name, email, password, confirmpassword } = req.body

        if (password != confirmpassword) {
            req.flash('message', 'As senhas não conferem, tente novamente.')
            res.render('auth/register')
            return
        }

        const checkIfUserExists = await User.findOne({ where: { email }})
        if(checkIfUserExists) {
            req.flash('message', 'O email já está em uso.')
            res.render('auth/register')
            return
        }

        // dificultar a senha
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try {
            const createdUser = await User.create(user)
            //inicializar sessão
            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })
        } catch (err) {
            console.log(err)
        }
    }

    static async logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}