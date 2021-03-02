const request = require('request')

const forecast = ({latitude, longitude} = {} , callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=27b92a3a4ae58aac945958353221de86&query='+ latitude + ',' + longitude
    request({url, json : true}, (error, {body})=>{
        {
            if(error)
            {
                callback('Unable to connect weather sevice!', undefined)
            }
            else if(body.error)
            {
                callback('Unable to find location.', undefined) 
            }
            else
            {
                const location = body.location.name
                const temperature = body.current.temperature
                const weather_description = body.current.weather_descriptions[0].toLowerCase()
    
                callback(undefined, `It is currently ${temperature}°C out. The weather is ${weather_description} today.`)
            }
        }
    })
}

module.exports = forecast