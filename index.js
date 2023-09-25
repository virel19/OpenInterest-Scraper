const puppeteer = require('puppeteer');
const { sendShortEmail, sendLongEmail, sendOpenInterest } = require('./sendEmail');

async function run() {
    try {
        // Launch browser
        const browser = await puppeteer.launch({
            headless: 'new',
        });
        const page = await browser.newPage();
        await page.goto('https://app.gmx.io/#/dashboard', { waitUntil: 'networkidle0' });

        await page.screenshot({ path: 'example.png', fullPage: true });

        const data = await page.evaluate(async () => {
            const appCard = document.querySelector('.App-card');
            const overviewTitle = appCard.querySelector('.App-card-title');

            if (overviewTitle.textContent.trim() == 'Overview') {
                const overviewCard = overviewTitle.closest('.App-card');
                const overviewContent = overviewCard.querySelectorAll('.App-card-content .App-card-row');

                const result = {};

                for (const x of overviewContent) {
                    const cardLabel = x.querySelector('.label').innerText;
                    if (cardLabel == 'Open Interest') {
                        const openInterestCardRow = x.closest('.App-card-row');
                        const openInterest = openInterestCardRow.querySelector('.Tooltip.nowrap .Tooltip-handle').innerText;
                        result.openInterest = parseFloat(openInterest.replace(/[^0-9.-]+/g, ''));
                    }
                    if (cardLabel == 'Long Positions') {
                        const longPositionCardRow = x.closest('.App-card-row');
                        const longPosition = longPositionCardRow.querySelector('.Tooltip.nowrap .Tooltip-handle').innerText;
                        result.longPosition = parseFloat(longPosition.replace(/[^0-9.-]+/g, ''));
                    }
                    if (cardLabel == 'Short Positions') {
                        const shortPositionCardRow = x.closest('.App-card-row');
                        const shortPosition = shortPositionCardRow.querySelector('.Tooltip.nowrap .Tooltip-handle').innerText;
                        result.shortPosition = parseFloat(shortPosition.replace(/[^0-9.-]+/g, ''));
                    }
                }

                return result;
            } else {
                console.log('No Overview Card');
                return null;
            }
        });

        let openInterestPercentage = data.openInterest * 0.80;
        let currentDominance = 0;
        let currentFav = '';
        let dominance = '';
        const timestamp = new Date().toLocaleString();


        if (data.longPosition > data.shortPosition) {
            currentDominance = (data.longPosition / data.openInterest) * 100;
            dominance = 'Long';
            currentFav = 'SHORTING';
        }

        if (data.shortPosition > data.longPosition) {
            currentDominance = (data.shortPosition / data.openInterest) * 100;
            dominance = 'Short';
            currentFav = 'LONGING';
        }

        if (data) {

            const emailContent = 
            `
            Date: ${timestamp}
            Open interest: $${data.openInterest.toLocaleString()}
            Long positions:  $${data.longPosition.toLocaleString()}
            Short positions:  $${data.shortPosition.toLocaleString()}
            ${dominance} Dominance: ${currentDominance.toFixed(2)}%
            Market sentiment is favoring longs you should think about ${currentFav} the market.
            `;

            const emailContent1 = `Open Interest is $${data.openInterest.toLocaleString()}`;

            if (data.longPosition >= openInterestPercentage) {
                sendShortEmail(emailContent);
            }

            if (data.shortPosition >= openInterestPercentage) {
                sendLongEmail(emailContent);
            }

            if(data.openInterest >= 100000000){
                sendOpenInterest(emailContent1);
            }

            console.log('Date:', timestamp);
            console.log(`Open interest: $${data.openInterest.toLocaleString()}`);
            console.log(`Long positions:  $${data.longPosition.toLocaleString()}`);
            console.log(`Short positions:  $${data.shortPosition.toLocaleString()}`);
            console.log(`${dominance} Dominance: ${currentDominance.toFixed(2)}%`);
            console.log(`Market sentiment is favoring longs you should think about ${currentFav} the market.`);
            console.log('\n');

        } else {
            console.log('Data is null.');
        }

        await browser.close();
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Initial run
run();

// Run every 10 minutes
setInterval(run, 600000);
