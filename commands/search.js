module.exports = {
    name: 'search',
    description: "this is a ping command!",
    execute(message,args) {
        const puppeteer = require('puppeteer');
        const player = args.shift().toLowerCase();
        const url = 'https://euw.op.gg/summoners/euw/' + player;
        scrapePage(url);
        
        async function scrapePage(url) {
            const browser = await puppeteer.launch(); 
            const page = await browser.newPage();
            await page.goto(url);

            const [el] = await page.$x('//*[@id="content-container"]/div[2]/div[2]/div[1]/div[1]');
            const txt = await el.getProperty('textContent');
            const rawText = await txt.jsonValue();

            message.channel.send(rawText);
        }

        
    }
}