import path from 'path'
import {fileURLToPath} from 'url'
import express from 'express'
import hbs from 'hbs'
import geocode from './utils/geocode.js'
import forecast from './utils/forecast.js'

//Set up __dirname and __filename to work with modules and es6
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

//Define Paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and veiws location for dynamic pages
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve static pages
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Roggy Doggy'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Roggy Doggy'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        helpText: 'This is an interesting help message.',
        title: 'Help',
        name: 'Roggy Doggy'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        //Return here works like Break to stop other .get from running
        //If not used you might get Cannot send headers after sent error
        return res.send({
            error: 'You must provide an address.'
        })
    } else {
        //The {} at end provides deaults for latitude etc so it will not crash
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {  //the ={} is an empty default if needed
            if (error) {
                return res.send({error})
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        //Return here works like Break to stop other .get from running
        //If not used you might get Cannot send headers after sent error
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Roggy Doggy',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Roggy Doggy',
        errorMessage: 'Page Not Found.'
    })
})

app.listen(port, () => {
    console.log ('Sever is up on port ' + port +'.')
})