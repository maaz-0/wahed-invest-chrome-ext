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
            var recentClosingPriceString = dailyPrices[keys[0]]['4. close'];
            var recentClosingPriceDecimal = parseFloat(recentClosingPriceString).toFixed(2);
            
            $(id + '-price').text('$' + recentClosingPriceDecimal);
        });
    });
    
}