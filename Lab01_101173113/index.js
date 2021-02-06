const csv = require('csv-parser');
const fs = require('fs');

const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';
const title = 'country,year,population';

console.log("Deleting Canada.txt file if exists")
fs.unlink(canadaFile,(err) => {
    if (err){
        return console.error(err);
    }
    console.log("Canada txt file deleted successfuly");
});

console.log("Deleting Usa.txt file if exists")
fs.unlink(usaFile, (err) =>{
    if (err){
        return console.error(err);
    }
    console.log("Usa txt file deleted successfuly");
})

let canadaStream = fs.createWriteStream(canadaFile, {'flags': 'a'});
canadaStream.once('open', (fd) => {
    canadaStream.write(title+"\r\n");
});

let usaStream = fs.createWriteStream(usaFile, {'flags': 'a'});
usaStream.once('open', (fd) => {
    usaStream.write(title+"\r\n");
});

fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (row) => {
        if(row.country == 'Canada')
        {
            canadaStream.write(`${row.country},${row.year},${row.population}\r\n`)
        }

        if(row.country == 'United States')
        {
            usaStream.write(`${row.country},${row.year},${row.population}\r\n`)
        }
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });


