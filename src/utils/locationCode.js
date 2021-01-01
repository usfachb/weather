const request = require('request')
// const chalk = require('chalk')

const locationCode = (address, callback) => {
    const mapBoxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYWNoYWFiYjA3IiwiYSI6ImNramJyemwzcDdvNXAycWxiMzJtdjJ4MnIifQ.mq7xp68jacwEgQvpoWRRdQ"
    request({ url: mapBoxUrl, json: true }, (err, res) => {
        if (err) {
            callback('make sure you connected to internet', undefined)
        } else if (res.body.features.length == 0) {
            callback('Location: Not Found', undefined)
        }else{
            callback(undefined , {
                lantitude:res.body.features[0].center[0],
                longitude:res.body.features[0].center[1],
                location:res.body.features[0].text
            })
        }
    })
}
module.exports = locationCode