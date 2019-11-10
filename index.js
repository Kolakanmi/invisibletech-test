// @flow
const axios = require('axios')
const fs = require('fs')
const standardInput = process.stdin;
const url = "https://api.openweathermap.org/data/2.5/weather"
let filename = "data.txt";
const auth = "&APPID=6d7a8bff3c4a4bad65deff7e69571c66";

function formatDate(date: Date): string {
    return date.getFullYear() + '/' +
        (date.getMonth() + 1) + '/' +
        date.getDate() + ' ' +
        date.getHours() + ':' +
        date.getMinutes();
}
function kelvinToCelsius(temp: number): string{
    temp = temp - 273;
    return temp.toFixed(2) + " Celsius"
}

function processOutput(cityOrZip: string | number, response: Object) {
    let timeMilliseconds = Number(response.data.dt) * 1000
    let date = new Date(timeMilliseconds);
    let timezone = Number(response.data.timezone) / 60;
    let timezoneDifference = timezone + date.getTimezoneOffset();
    let locationDate = new Date(timeMilliseconds + (timezoneDifference * 60 * 1000));
    //let locationTime = new Date(timeMilliseconds + (timezoneDifference * 60 * 1000)).toLocaleTimeString();
    let temperature = Number(response.data.main.temp)
    console.log(cityOrZip + ": ", kelvinToCelsius(temperature), " Time: ", formatDate(locationDate))
}

async function readWeatherFromApi(cityOrZip: string | number) {
    if (typeof cityOrZip === "string") {
        await axios.get(url+'?q='+cityOrZip+auth).then(response => {
            processOutput(cityOrZip, response)
        })
            .catch(err => console.log(err))
    } else {
        cityOrZip = Number(cityOrZip)
        await axios.get(url+'?zip='+cityOrZip+auth).then(response => {
            processOutput(cityOrZip, response)
        })
            .catch(err => console.log(err))
    }
}
standardInput.setEncoding('utf-8');
console.log("Enter File Path");
standardInput.on('data', function (data) {
    console.log(data)
    filename = data.toString();
    if (data === 'exit\n') {
        console.log("Program Exiting...")
        process.exit()
    } else  {
        //
        console.log("You entered: " + filename)
        fs.readFile(filename.trim(), 'utf-8', (err, d) => {
            let f = d.split(',')
            f.forEach(v => {
                v = v.trim();
                readWeatherFromApi(v)
            })
            console.log("Enter File Path")
        })
    }
})