const http = require('http');
const fs = require('fs');

const request = new Request("https://api.opendota.com/api/heroStats", {method: "GET"});

fetch(request)
  .then((response) => { return response.json();})
  .then((response) => {
    saveFile(JSON.stringify(response));
  });

function saveFile(fileContents){
  fs.writeFile('./Files/data.json', fileContents, {flag: 'w+'},err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
}