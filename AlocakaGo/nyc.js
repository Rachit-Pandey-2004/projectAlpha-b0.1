/*
 * Using EventEmitter to recall the function
 * Author Rachit Pandey
 * Starting Date: 12/08/2023
 * Description : NYC pogo Maps
 * Working Stable
 */
const events = require('events');
const unwrap=require('./code');
//now creates its object
const eEmitter = new events.EventEmitter();
var request;
var response;
var data;
var url;
var o = 0;
var n = 0;
async function tester() {
    //o=Date.now();
    //o=parseInt(Date.now()/1000);
    //o = Math.floor(Date.now() / 1000);
    await setTimeout((e) => {
        eEmitter.emit('getData')
    }, 45000);
}
//main part to getData
eEmitter.on('getData', async () => {
    try {
        console.log("searching.....");
        n = Date.now();
        url = `https://nycpokemap.com/query2.php?mons=63,19&time=${n}&since=${o}`;
        request = new Request(url, {
            method: 'GET',
            headers: {
                'Host': 'nycpokemap.com',
                'Accept-Encoding': 'gzip, deflate, br',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Referer': 'https://nycpokemap.com/',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'TE': 'trailers',
            }
        });
        try {
            response = await fetch(request);
            data = await response.json();
            o=data.meta.inserted;
            console.log(data.pokemons);
        }
        catch (fetchError) {
            console.error(`Error fetching data : ${fetchError}`);
        }
    }
    catch (error) {
        console.error(`Error fetching data : ${error}`);
    }
    finally {
        await tester();
    }
})

eEmitter.emit('getData');