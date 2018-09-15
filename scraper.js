var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
// scrape the table at this link
request('http://www.ercot.com/content/cdr/html/20180912_real_time_spp', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var tableRows = [];
        var headers = [];
        var tableContent = [];
        //collect all row items
        $('#yesterday tr').each(function(i, element){
            var a = $(this);
            tableRows.push(a.text().trim() + ",");
        });
        //collect all header items then data items and then concatenate
        $('#yesterday th').each(function(i, element){
          var a = $(this);
          headers.push(a.text().trim());
        });
        $('#yesterday td').each(function(i, element){
            var a = $(this);
            tableContent.push(a.text().trim());
          });
       var tableData = headers.concat(tableContent);
       console.log(tableData);


        //   depending on method, export one table or the other
    fs.writeFile("import.txt", tableData, function(err) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
          return console.log(err);
        }
      
        // Otherwise, it will print: "movies.txt was updated!"
        console.log("import.txt was updated!");
      
      })
    
    // console.log(tableRows[0]);
    // console.log(tableRows[1]);
    // console.log(tableRows[2]);
      }
    });
