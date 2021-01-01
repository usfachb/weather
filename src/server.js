const path = require('path')
const express = require('express')
const hbs = require('hbs')
const locationCode = require('./utils/locationCode')
const foreCats = require('./utils/forecast')
const app = express()
const PORT = process.env.PORT || 3000

// difine express paths config
const publicFolder = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views')
const componentsPath = path.join(__dirname, '../template/components')

// setup handelbars engine and view location
app.use(express.static(publicFolder))
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(componentsPath)

// App routes
app.get('/', (req, res) => {
    res.render('index', {
        header: 'Home page header',
        footer: 'Created by usfachb',
        title: 'Weather',
        name: 'youssef'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You have to provide an address'
        })
    }
    locationCode(req.query.address, (error, response) => {
        if (error) {
            return res.send({ error: error })
        }
        foreCats(response.lantitude, response.longitude, (error, data) => {
            if (error) {
                return res.send({ error: error })
            }
            res.send({
                data
            })
        })
    })
})

app.get('*', (req, res) => {
    res.status(404).send('This 404 Page')
})
app.listen(PORT, () => {
    console.log(`Running at port ${PORT}`);
})