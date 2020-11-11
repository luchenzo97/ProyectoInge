//Aca se definen la rutas de aplicación

const express = require('express')
const router = express.Router()
const pool = require('../database')
const { isNotLoggedIn, isColab } = require('../lib/auth')
const { generateKey, encryptData, sendEmail } = require('../lib/helpers')

router.get('/apply', isNotLoggedIn, (req, res) => {
    res.render('registry/apply')
})

router.post('/apply', isNotLoggedIn, async (req, res) => {

    const newApplicant = {
        ApplicantName: req.body.ApplicantName,

        ApplicantIdentification: req.body.ApplicantIdentification,

        ApplicantPhone: req.body.ApplicantPhone,

        ApplicantEmail: req.body.ApplicantEmail,

        ApplicantBirthDate: req.body.ApplicantBirthDate,

        ApplicantAge: req.body.ApplicantAge,

        ApplicantProvince: req.body.ApplicantProvince,

        ApplicantCanton: req.body.ApplicantCanton,

        ApplicantDistrict: req.body.ApplicantDistrict,

        ApplicantOcupation: req.body.ApplicantOcupation,

        ApplicantOcupationPlace: req.body.ApplicantOcupationPlace,

        ApplicantEnglishLevel: req.body.ApplicantEnglishLevel,

        ApplicantDevices: req.body.ApplicantDevices,

        ApplicantConnection: req.body.ApplicantConnection,

        ApplicantAvailability: req.body.ApplicantAvailability,

        ApplicantAbout: req.body.ApplicantAbout,

        ApplicantAspiration: req.body.ApplicantAspiration,

        ApplicantHobbies: req.body.ApplicantHobbies,

        ApplicantDescription: req.body.ApplicantDescription,

        ApplicantExpectation: req.body.ApplicantExpectation,

        ApplicantImpact: req.body.ApplicantImpact,

        ApplicantWomenInSTEM: req.body.ApplicantWomenInSTEM,

        ApplicantCondition: req.body.ApplicantCondition,

        ApplicantConditionName: req.body.ApplicantConditionName,

        ApplicantConditionAssistance: req.body.ApplicantConditionAssistance,

        ApplicantMediaImpact: req.body.ApplicantMediaImpact,

        ApplicantTry: req.body.ApplicantTry,

        ApplicantEmpleateCondition: req.body.ApplicantEmpleateCondition,

        ApplicantEmpleateConditionName: req.body.ApplicantEmpleateConditionName,

        ApplicantEconomicStatus: req.body.ApplicantEconomicStatus,

        ApplicantTshirt: req.body.ApplicantTshirt,

        ApplicantPermision: req.body.ApplicantPermision,

        ApplicantParentName: req.body.ApplicantParentName,

        ApplicantParentPhone: req.body.ApplicantParentPhone,

        ApplicantParentEmail: req.body.ApplicantParentEmail,

        ApplicantComments: req.body.ApplicantComments
    }
    await pool.query('INSERT INTO Applicants set ?', [newApplicant])
    req.flash('alerta', 'Aplicación a Mente guardada correctamente')
    res.redirect('../')
})

router.get('/applicationsList', isColab, async (req, res) => {
    const applicants = await pool.query('SELECT * FROM Applicants WHERE Accepted = false')
    res.render('registry/applicationsList', { applicants })
})

router.get('/applicant/:id', isColab, async (req, res) => {
    const { id } = req.params
    const Applicant = await pool.query('SELECT * FROM Applicants WHERE ApplicantIdentification = ?', [id])
    res.render('registry/applicant', { Applicant: Applicant[0] })
})

router.get('/applicant/delete/:id', isColab, async (req, res) => {
    const { id } = req.params  
    await pool.query('DELETE FROM Applicants WHERE ApplicantIdentification = ?', [id])
    req.flash('alerta', 'Aplicante eliminad@ correctamente')
    res.redirect('/registry/applicationsList')
})

router.get('/accept/:id', isColab, async (req, res) => {
    const { id } = req.params
    const applicant = await pool.query('SELECT * FROM Applicants WHERE ApplicantIdentification = ?', [id])
    const newProfile = {
        Name: applicant[0].ApplicantName,
        Identification: applicant[0].ApplicantIdentification,
        Phone: applicant[0].ApplicantPhone,
        Email: applicant[0].ApplicantEmail,
        BirthDate: applicant[0].ApplicantBirthDate,
        Province: applicant[0].ApplicantProvince,
        Canton: applicant[0].ApplicantCanton,
        District: applicant[0].ApplicantDistrict
    }
    try {
        await pool.query('INSERT INTO ProfileInfo set ?', [newProfile]) //Aca entraria a la lista de espera para ser aceptado
    }
    catch (error) {

    }
    //Esto va en authentication pero es hasta que se acepte
    const password = await generateKey(12).then()
    const newUser = {
        username: newProfile.Identification,
        password
    }
    newUser.password = await encryptData(password)
    try {
        
        await pool.query('INSERT INTO Users SET ?', [newUser])
        await pool.query('UPDATE Applicants SET Accepted = ? WHERE ApplicantIdentification = ?', [1, id])
        await sendEmail(newUser.username, newProfile.Email, password)
        req.flash('alerta', 'Registro guardado correctamente')
        res.redirect('/registry/applicationsList')
    } catch (error) {
        req.flash('error', 'Ya existe este usuario')
        res.redirect('/registry/applicationsList')
    }
})

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup')
})

router.post('/signup', isNotLoggedIn, async (req, res, next) => {
    const newGraduated = {
        GraduatedName: req.body.GraduatedName,
        GraduatedIdentification: req.body.GraduatedIdentification,
        GraduatedPhone: req.body.GraduatedPhone,
        GraduatedEmail: req.body.GraduatedEmail,
        RegisteredPassword: req.body.password

    }
    await pool.query('INSERT INTO RegistroGraduadas set ?', [newGraduated])
    req.flash('alerta', 'Registro como Graduada Mente guardada correctamente')
    res.redirect('../')
})

router.get('/signupColab', isNotLoggedIn, (req, res) => {
    res.render('auth/signupColab')
})

router.post('/signupColab', isNotLoggedIn, async (req, res, next) => {
    const temp = req.body
    const newProfile = {
        Name: temp.fullname,
        Identification: temp.identification,
        Phone: temp.phone,
        Email: temp.email,
        BirthDate: temp.birthdate,
        Province: temp.province,
        Canton: temp.canton,
        District: temp.district
    }
    await pool.query('INSERT INTO ProfileInfo set ?', [newProfile]) //Aca entraria a la lista de espera para ser aceptado

    //Esto va en authentication pero es hasta que se acepte
    const password = await generateKey(12).then()
    const newUser = {
        username: temp.identification,
        password
    }
    newUser.password = await encryptData(password)
    try {
        await pool.query('INSERT INTO Users SET ?', [newUser])
        const Colabname = {
            colabname: newUser.username
        }
        await pool.query('INSERT INTO RolColab SET ?', [Colabname])
        await sendEmail(newUser.username, newProfile.Email, password)
        req.flash('alerta', 'Registro guardado correctamente')
        res.redirect('../')
    } catch (error) {
        req.flash('error', 'Ya existe este usuario')
        res.redirect('../')
    }

})

router.get('/graduatedList', isColab, async (req, res) => {
    const graduated = await pool.query('SELECT * FROM RegistroGraduadas')
    res.render('registry/graduatedList', { graduated })
})

module.exports = router