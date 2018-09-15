var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request('http://www.ercot.com/content/cdr/html/20180912_real_time_spp', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var tableRows = [];
        $('#yesterday tr').each(function(i, element){
            var a = $(this).children();
            tableRows.push(a.text());
        });
        fs.writeFile("test.txt", tableRows, function(err) {

            // If the code experiences any errors it will log the error to the console.
            if (err) {
              return console.log(err);
            }
          
            // Otherwise, it will print: "movies.txt was updated!"
            console.log("test.txt was updated!");
          
          })
    }
    console.log(tableRows);
});