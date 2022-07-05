module.exports = {
    name: 'search',
    description: "this is a ping command!",
    execute(message,args) {
        const puppeteer = require('puppeteer');
        const player = args.shift().toLowerCase();

        message.channel.send('Loading stats for ' + player + '...');

        const url = 'https://euw.op.gg/summoners/euw/' + player;
        scrapePage(url);
        
        async function scrapePage(url) {
            const browser = await puppeteer.launch(); 
            const page = await browser.newPage();
            await page.goto(url);

            const attribute = args.shift().toLowerCase();
            var output = null;
            if (attribute === 'wr') {
                const [wr] = await page.$x('//*[@id="content-container"]/div[2]/div[2]/div[1]/div[2]/div[1]/div[2]/strong');
                const [games] = await page.$x('//*[@id="content-container"]/div[2]/div[2]/div[1]/div[1]');
                const wrText = await wr.getProperty('textContent');
                const gamesText = await games.getProperty('textContent');
                const wrRawText = await wrText.jsonValue();
                const gamesRawText = await gamesText.jsonValue();
                output = 'Win Rate: ' + wrRawText + '%\n'
                + 'Games: ' + gamesRawText;
            }
            else if (attribute === 'kda') 

            console.log(output);
            message.channel.send(output);
        }

        
    }
}