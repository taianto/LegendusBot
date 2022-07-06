module.exports = {
    name: 'search',
    description: "this is a ping command!",
    execute(message, args) {
        const puppeteer = require('puppeteer');

        console.log(args.length);
        if (args.length == 2) {
            const player = args.shift().toLowerCase();
            message.channel.send('Loading stats for ' + player + '...');

            const url = 'https://euw.op.gg/summoners/euw/' + player;
            scrapePage(url);
        }
        else {
            message.channel.send('Please use the correct arguments for this command:'
                + '\n!search (Player Name) (wr/kda)');
        }


        async function scrapePage(url) {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);

            const attribute = args.shift().toLowerCase();
            var output = null;
            if (attribute === 'wr') {
                const [wr] = await page.$x('//*[@id="content-container"]/div[2]/div[2]/div[1]/div[2]/div[1]/div[2]/strong');
                if (wr === undefined) {
                    message.channel.send('Error: Player not found');
                    return;
                }
                const wrText = await wr.getProperty('textContent');
                const wrRawText = await wrText.jsonValue();

                const [games] = await page.$x('//*[@id="content-container"]/div[2]/div[2]/div[1]/div[1]');
                const gamesText = await games.getProperty('textContent');
                const gamesRawText = await gamesText.jsonValue();

                output = 'Win Rate: ' + wrRawText + '%\n'
                    + 'Games: ' + gamesRawText;
            }
            else if (attribute === 'kda') {
                const [kdr] = await page.$x('//*[@id="content-container"]/div[2]/div[2]/div[1]/div[2]/div[2]/div[2]');
                if (kdr === undefined) {
                    message.channel.send('Error: Player not found');
                    return;
                }
                const kdrText = await kdr.getProperty('textContent');
                const kdrRawText = await kdrText.jsonValue();

                const [kda] = await page.$x('//*[@id="content-container"]/div[2]/div[2]/div[1]/div[2]/div[2]/div[1]');
                const kdaText = await kda.getProperty('textContent');
                const kdaRawText = await kdaText.jsonValue();

                output = 'KDR: ' + kdrRawText
                    + '\n' + kdaRawText;
            }
            else {
                message.channel.send('Please use the correct arguments for this command:'
                + '\n!search (Player Name) (wr/kda)');
                return;
            }
            //console.log(output);
            message.channel.send(output);
        }
    }
}