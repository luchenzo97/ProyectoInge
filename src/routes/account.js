const express = require('express')
const router = express.Router()
const pool = require('../database')
const { isNotLoggedIn, isLoggedIn} = require('../lib/auth')
const { generateKey, encryptData, sendRecoveryEmail } = require('../lib/helpers')



router.get('/forgotPassword', isNotLoggedIn, (req, res) =>{
    res.render('account/forgotPassword')
})

router.post('/forgotPassword', isNotLoggedIn, async (req, res) =>{
    const Email = req.body
    try{
        const user = await pool.query('SELECT Identification FROM ProfileInfo WHERE Email = ?', [Email.email])

        if(user[0].Identification)
        {
            const key = await generateKey(40).then()
            const recovery = {
                Hashkey: key,
                Useremail: Email.email
            }
            try{
                await pool.query('INSERT INTO PasswordRecovery set ?', [recovery])
                await sendRecoveryEmail(Email.email, 'localhost:9000/account/recovery/'+key)
                res.redirect('../')
            }
            catch(err)
            {
                console.log(err)
                res.redirect('../') 
            }
        } 
    }catch(err)
    {
        console.log(err)
        res.redirect('../')
    }
})

router.get('/recovery/:id', isNotLoggedIn, async (req,res) =>{
    const {id} = req.params
    const email = await pool.query('SELECT Useremail FROM PasswordRecovery WHERE Hashkey = ?', [id])
    const user = await pool.query('SELECT Identification FROM ProfileInfo WHERE Email = ?', [email[0].Useremail])
    res.render('account/newPassword', { Id: user[0] })
})

router.post('/recovery/:id', async (req,res) =>{
    const {id} = req.params
    const rawPassword = req.body.password
    const password = await encryptData(rawPassword)
    const user = await pool.query('SELECT Email FROM ProfileInfo WHERE Identification = ?', [id])
    await pool.query('DELETE FROM PasswordRecovery WHERE Useremail = ?', [user[0].Email])
    await pool.query('UPDATE Users SET Password = ? WHERE Username = ?', [password, id])
    req.flash('alerta', 'Contraseña cambiada correctamente')
    res.redirect('/')
})

router.get('/changePassword/:id', isLoggedIn, async (req,res) =>{
    const {id} = req.params
    const user = await pool.query('SELECT Identification FROM ProfileInfo WHERE Identification = ?', [id])
    res.render('account/newPassword', { Id: user[0] })
})

router.post('/profileUpdate/:id', isLoggedIn, async(req,res)=>{
    const {id} = req.params
    const temp = req.body
    const update = {
        Phone: temp.Phone,
        Email: temp.Email,
        Province: temp.Province,
        Canton: temp.Canton,
        District: temp.District
    }
    await pool.query('UPDATE ProfileInfo SET ? WHERE Identification = ?', [update, id])
    req.flash('alerta', 'Información cambiada correctamente')
    res.redirect('/profile')
})


module.exports = router