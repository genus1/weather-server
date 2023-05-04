import request from 'postman-request'

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2108fda310f967031e77d7d2ad2afe78&query='+ latitude +','+ longitude +'&units=f'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Weather Service.', undefined)  //undefined not needed in callback it will be added by system
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature +
            ' degrees. It feels like ' + body.current.feelslike + ' degrees.')
        }
    })
}

export default forecast
