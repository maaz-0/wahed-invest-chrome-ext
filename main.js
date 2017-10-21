"use strict";

const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={0}&apikey=9O46WYH5QWK1N8CF'
var tickers = ['AMIGX', 'AMINX', 'AMIDX', 'GLD', 'WISEX'];

function initialize(){
    console.log('hello, world');
    $('#amigx').on('click', updatePrices);
}

function updatePrices() {

    tickers.forEach(function(ticker) {
        $.get(url.replace('{0}', ticker), function(data) {
            
            var id = '#' + ticker.toLowerCase();
            var dailyPrices = data['Time Series (Daily)'];
            
            var keys = Object.keys(dailyPrices);
            var recentClosingPrice = getPriceForDay(dailyPrices[keys[0]]);
            var priorClosingPrice = getPriceForDay(dailyPrices[keys[1]]);
            
            var selector = id + '-price > span';
            $(selector).text('$' + recentClosingPrice);

            if (recentClosingPrice > priorClosingPrice) {
                $(selector).removeClass('down').addClass('up');
            } else if (recentClosingPrice < priorClosingPrice) {
                $(selector).removeClass('up').addClass('down');
            } else {
                $(selector).removeClass('up down');
            }
        });
    });
    
}

function getPriceForDay(day) {
    var priceString = day['4. close'];
    return parseFloat(priceString).toFixed(2);
}