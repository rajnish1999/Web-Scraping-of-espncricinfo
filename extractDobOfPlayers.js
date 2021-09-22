const request = require('request');
const cheerio = require('cheerio');

const url = 'https://www.espncricinfo.com/series/india-women-in-australia-2021-22-1263613/australia-women-vs-india-women-1st-odi-1263617/full-scorecard';

request(url, (err, res, body) => {
    if(err){
        console.log(err);
    }else{
        extractHtml(body);
    }
})

const extractHtml = (html) => {
    const selectorTool = cheerio.load(html);
    const tableArr = selectorTool('.table tbody');
    let k=0;
    for(let i=0;i<4;i++){
        const individualTableRows = selectorTool(tableArr[i]).find('tr');
        for(let j=0;j<individualTableRows.length;j++){
            const individualRowCols = selectorTool(individualTableRows[j]).find('td');
            const partialLink = selectorTool(individualRowCols[0]).find('a').attr('href');
            const link = "https://www.espncricinfo.com"+partialLink;

            if(partialLink){
                extractDOB(link);
            }
        }
    }
}

const extractDOB = (link) => {
    request(link, (err, res, body) => {
        if(err){
            console.log("error is: "+err);
        }else{
            const selectorTool = cheerio.load(body);
            const playerDetails = selectorTool('.player_overview-grid .player-card-description')
            const playerName = selectorTool(playerDetails[0]).text();
            const dobArr = selectorTool(playerDetails[1]).text().split(',');
            const dob = dobArr[0]+","+dobArr[1];
            console.log("Name of player: "+playerName+"\n"+"Date Of Birth is: "+dob+"\n");
        }
    })
}