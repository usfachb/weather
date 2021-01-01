const request = require('request')

const foreCast = (lantitude , longitude , callback) => {
    const forecastUrl = 'http://api.weatherstack.com/forecast?access_key=2d092dc997daf7f72b9f66e85e494b0e&query=' + longitude+ ',' + lantitude
    request({url: forecastUrl , json:true} , (err , res) => {
        if(err){
            callback('Make sure you are connected to internet', undefined)
        }else if(res.body.error){
            callback(res.body.error.info, undefined)
        }else{
            callback(undefined , {
                city:res.body.location.name,
                country:res.body.location.country,
                time:res.body.location.localtime,
                temperature:res.body.current.temperature
            })
        }
    })
}

module.exports = foreCast