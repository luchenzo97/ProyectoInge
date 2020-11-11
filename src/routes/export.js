const express = require('express')
const router = express.Router()
const pool = require('../database')
const excel = require('exceljs')
const { isColab } = require('../lib/auth')
const fs = require('fs')

router.get('/noSelected', isColab, async (req, res, done) => {
    try {
        const applicants = await pool.query('SELECT * FROM Applicants WHERE Accepted = 0')
        const jsonApplicants = JSON.parse(JSON.stringify(applicants))
        let workbook = await new excel.Workbook()
        let worksheet = await workbook.addWorksheet('Aplicants')

        //Cabecera de la hoja de trabajo
        worksheet.columns = [
            { header: 'Name', key: 'ApplicantName', width: 10 },
            { header: 'Identification', key: 'ApplicantIdentification', width: 10 },
            { header: 'Phone', key: 'ApplicantPhone', width: 10 },
            { header: 'Email', key: 'ApplicantEmail', width: 10 },
            { header: 'Birth Date', key: 'ApplicantBirthDate', width: 10 },
            { header: 'Age', key: 'ApplicantAge', width: 10 },
            { header: 'Province', key: 'ApplicantProvince', width: 10 },
            { header: 'Canton', key: 'ApplicantCanton', width: 10 },
            { header: 'District', key: 'ApplicantDistrict', width: 10 },
            { header: 'Ocupation', key: 'ApplicantOcupation', width: 10 },
            { header: 'Ocupation Place', key: 'ApplicantOcupationPlace', width: 10 },
            { header: 'English Level', key: 'ApplicantEnglishLevel', width: 10 },
            { header: 'Devices', key: 'ApplicantDevices', width: 10 },
            { header: 'Connection', key: 'ApplicantConnection', width: 10 },
            { header: 'Availability', key: 'ApplicantAvailability', width: 10 },
            { header: 'About', key: 'ApplicantAbout', width: 10 },
            { header: 'Aspiration', key: 'ApplicantAspiration', width: 10 },
            { header: 'Hobbies', key: 'ApplicantHobbies', width: 10 },
            { header: 'Description', key: 'ApplicantDescription', width: 10 },
            { header: 'Expectation:', key: 'ApplicantExpectation:', width: 10 },
            { header: 'Impact', key: 'ApplicantImpact', width: 10 },
            { header: 'WomenInSTEM', key: 'ApplicantWomenInSTEM', width: 10 },
            { header: 'Condition', key: 'ApplicantCondition', width: 10 },
            { header: 'Condition Name', key: 'ApplicantConditionName', width: 10 },
            { header: 'Condition Assistance', key: 'ApplicantConditionAssistance', width: 10 },
            { header: 'Media Impact', key: 'ApplicantMediaImpact', width: 10 },
            { header: 'Empleate Grant', key: 'ApplicantEmpleateCondition', width: 10 },
            { header: 'Empleate Grant Name', key: 'ApplicantEmpleateConditionName', width: 10 },
            { header: 'Economic Apport', key: 'ApplicantEconomicStatus', width: 10 },
            { header: 'T-shirt Size', key: 'ApplicantTshirt', width: 10 },
            { header: 'Permision', key: 'ApplicantPermision', width: 10 },
            { header: 'Parent Name', key: 'ApplicantParentName', width: 10 },
            { header: 'Parent Phone', key: 'ApplicantParentPhone', width: 10 },
            { header: 'Parent Email', key: 'ApplicantParentEmail', width: 10 },
            { header: 'Comments', key: 'ApplicantComments', width: 10 },
        ]

        //Añade las filas del array a la hoja de trabajo
        await worksheet.addRows(jsonApplicants)

        //Escribe en el archivo (lo crea si no existe) "Averiguar como obtener el basedir sin usar proces.cwd()"
        const path = process.cwd() + '/resources/static/upload/'
        const fileName = "Aplicantes_no_selecionadas.xlsx"
        try {
            fs.unlinkSync(path + fileName)
            await workbook.xlsx.writeFile(path + "newfile.xlsx")
            fs.rename(path + "newfile.xlsx", path + fileName, (err) => {
                if (err) console.log('Error: ' + err)
            })
        } catch (err) {
            await workbook.xlsx.writeFile(path + fileName)
        }
        done(null, false, req.flash('alerta', 'Exportación realizada correctamente'), res.redirect('/registry/applicationsList'))
    } catch (err) {
        console.log(err)
        req.flash('error', 'No se pudo realizar la exportación')
        res.redirect('/registry/applicationsList')
    }

})

module.exports = router