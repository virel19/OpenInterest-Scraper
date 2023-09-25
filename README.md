# OpenInterest-Scraper

I created this script to automate the process of gathering market data from a decentralized exchange to analyze market sentiment. It will then send me an email notification when predefined conditions are met. Open interest is a powerful indicator that can tell us the market participation and liquidity, which can be instrumental in predicting future price movements and identifying potential trading opportunities.

#### Predefined Conditions

* If long positions exceed 80% of open interest, it sends a "Short" email notification.
* If short positions exceed 80% of open interest, it sends a "Long" email notification.
* If open interest exceeds $100,000,000, it sends an "Open Interest" notification.

This is what it looks like in the console and it will keep running every 10 min to get the most up-to-date information. This will also be the same information sent to you via email when the conditions are met.

```
Date: 9/25/2023, 10:51:02 AM
Open interest: $96,132,589
Long positions:  $74,490,558
Short positions:  $21,642,031
Long Dominance: 77.49%
Market sentiment is favoring longs you should think about SHORTING the market.
```
## Disclaimer

While the data exclusively pertains to the Arbitrum network, it holds the potential to unlock valuable insights into the larger market dynamics and trends across a spectrum of networks and chains. However, it's essential to emphasize that this data alone should not be the sole basis for making trading decisions; rather, it should complement a broader set of analytical tools and considerations.

