import request from 'postman-request'

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ2VudXMxIiwiYSI6ImNrY2NzY3N1ZTAwcmwycW82eWhmaWU5NTEifQ.gsV-Gg0Ft9vCQC_GJLqM5A&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to GeoCode Service.', undefined)  //undefined not needed in callback it will be added by system
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

export default geocode