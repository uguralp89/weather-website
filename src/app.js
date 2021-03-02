const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>
{
    res.render('index', {
        title: 'Weather App',
        name: 'Uğuralp Durmaz'
    })
})

app.get('/about', (req, res)=>
{
    res.render('about', {
        title: 'Weather App',
        name: 'Uğuralp Durmaz'
    })
})

app.get('/help', (req, res)=>
{
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Weather App',
        name: 'Uğuralp Durmaz'
    })
})


app.get('/weather', (req, res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide a location.'
        })
    }
    geocode(req.query.address, (error, data)=>{
        if(error)
        {
            return res.send({
                error
            })
        }

        forecast(data, (error, forecastData)=>{
            res.send({
                location : data.location,
                data : forecastData,
                queryAddress : req.query.address
            })
        })
    })
})


app.get('/help/*', (req, res)=> {

    res.render('404', {
        title: '404 Error',
        errorMessage:'Help article not found.',
        name: 'Uğuralp Durmaz'
    })
})

app.get('*', (req, res)=> {
    res.render('404', {
        title: '404 Error',
        errorMessage:'My 404 page.',
        name: 'Uğuralp Durmaz'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})