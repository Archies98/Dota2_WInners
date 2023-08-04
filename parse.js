const fs = require('fs');

// read hero data from data.json
fs.readFile('./Files/data.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  data = JSON.parse(data);

  // total number of objects which is equal to total number of heroes
  var size = Object.keys(data).length;

  winrate = [];
  for(let i = 0; i < size; i++){

    // In-game hero name the users see
    heroName = data[i]['localized_name'];
    pick = 0;
    win = 0;
    // sum up 1-pick, 2-pick, 3-pick and so on until 8-pick
    // sum up 1-win, 2-win, 3-win and so on until 8-win
    for(let j = 1; j < 9; j++){
        pick += data[i][j.toString()+"_pick"];
        win += data[i][j.toString()+"_win"];
    }
    // calculated winrate up to 2 decimal points
    heroWinrate = ((win/pick)*100).toFixed(2);
    winrate.push([heroName, heroWinrate]);
  }

  // sort the winrate array in descending order with regards to the calculated win rate
  winrate.sort(function(a, b) {
    a = a[1];
    b = b[1];

    return a < b ? 1 : (a > b ? -1 : 0);
    });

    fs.writeFile('./Files/winrate.json', JSON.stringify(winrate), {'flag':'w+'}, err => {
      if(err){
        console.error(err);
      }
    });
});