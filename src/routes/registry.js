//Aca se definen la rutas de aplicación

const express = require('express')
const router = express.Router()
const pool = require('../database')
const { isNotLoggedIn, isColab } = require('../lib/auth')
const { encryptPassword, generatePassword } = require('../lib/helpers')

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
    try{
    await pool.query('INSERT INTO Applicants set ?', [newApplicant])
    req.flash('alerta', 'Aplicación a Mente guardada correctamente')
    }catch(e){
        req.flash('error', 'No se pudo guardar su aplicación a Mente')
    }
    res.redirect('../')
})

router.get('/applicationsList', isColab, async (req, res) => {
    const applicants = await pool.query('SELECT * FROM Applicants')
    res.render('registry/applicationsList', { applicants })
})

router.get('/applicant/:id', isColab, async (req, res) => {
    const { id } = req.params
    const Applicant = await pool.query('SELECT * FROM Applicants WHERE ApplicantIdentification = ?', [id])
    res.render('registry/applicant', { Applicant: Applicant[0] })
})

router.get('/applicant/delete/:id', isColab, async (req, res) => {
    const { ApplicantIdentification } = req.params
    await pool.query('DELETE FROM Applicants WHERE ApplicantIdentification = ?', [ApplicantIdentification])
    req.flash('alerta', 'Aplicante eliminad@ correctamente')
    res.redirect('registry/applicationsList')
})

router.get('/accept/:id', isColab, async (req, res) => {
    const password = await generatePassword().then()
    const { id } = req.params
    const Applicant = await pool.query('SELECT * FROM Applicants WHERE ApplicantIdentification = ?', [id])
    const NewUser = {
        username: Applicant[0].ApplicantIdentification,
        password
    }
    try {
        await pool.query('INSERT INTO MentesInfo SET ?', [Applicant[0]])
        NewUser.password = await encryptPassword(password)
        await pool.query('INSERT INTO UsersMentes SET ?', [NewUser])
        console.log(password)
        req.flash('alerta', 'Contraseña: ' + password)
    } catch (e) {
        req.flash('error', 'Posible entrada duplicada, revisar el log')
        console.log(e)
    }
    res.redirect('/registry/applicationsList')
})



module.exports = router