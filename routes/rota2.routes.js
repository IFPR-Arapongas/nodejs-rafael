app.post('/login', async (req, res) => {
    let { email, senha } = req.body;

    // IMPORTANTE: Exemplo simplificado, nunca compare senhas em texto plano.
    if (email != 'teste@gmail.com' || senha !== '123456') {
        return res.status(401).send({
            auth: false,
            mensagem: 'Usuário ou senha inválidos'
        })
    }

    let token = jwt.sign(
        { email: email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }

    );
    res.status(200).send({ auth: true, token: token })
})

