const assert = require('assert');

describe('formatDate', function () {
    it('should return formatted date', function () {
        assert.equal(formatDate(new Date(1573349512000)), "2019/11/10 2:31")
    });
})

describe('kelvinToCelsius', function () {
    it('should return temperature in celsius', function () {
        assert.equal(kelvinToCelsius(373), "100.00 Celsius")
    });
})

function formatDate(date) {
    return date.getFullYear() + '/' +
        (date.getMonth() + 1) + '/' +
        date.getDate() + ' ' +
        date.getHours() + ':' +
        date.getMinutes();
}

function kelvinToCelsius(temp){
    temp = temp - 273;
    return temp.toFixed(2) + " Celsius"
}