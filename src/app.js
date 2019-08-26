const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forcast = require('./utils/forecast');

const app =  express();

// Define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to save
app.use(express.static(publicPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ali Al haddad'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ali Al haddad',
        helpText: 'This is some helpful text.'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ali Al haddad'
    });
});

app.get('/weather', (req, res) => {

    const {address=undefined} = req.query;
    if(!address) {
        return res.send({
            error: "You must provide an address"
        });
    }

    geocode(address, (error, geo) => {
        if(error) {
            return res.send({error})
        }

        forcast(geo.lat, geo.lng, (error, weather) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forcast: weather,
                location: geo.loc,
                address
            });
            
        });
    });
});



app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ali Al Haddad',
        errorMessage: 'Page not found'
    })
})
app.listen(3000, ()=> {
    console.log('Server is up on port 3000.')
})