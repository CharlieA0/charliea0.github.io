Want to become an virtual millionaire overnight? Too lazy to keep up with online trading games like Market Watch? Dream of hacking the stock market with the perfect algo?

At least, that's what Bronxville's Programming Club dreamt of. Believe-it-or-not, we have lot of members who are also in Bronxville's Investment Club. They wanted to write a program to simulate trading stocks based on some mathematical model. With the crisp scent of sandalwood and freshly minted 100-dollar bills suddenly wafting through the room, the rest of us didn't need much convincing.

So after a vote (after all, we are a autonomous collective not a dictatorship), we decided to work on an algorithmic trading simulation. Our program would repeatedly get the current stock price, then make a decision to 'buy' or 'sell' some number of shares. The simulation would end after the program runs out of cash, shares, or completes a certain number of trades.

There are much better and easier ways of testing quantitative trading algorithms than hacking together a program in Python (Quantopian comes to mind), but we wanted to do it from scratch. We used MarketOnDemand's web API as our data source. The program makes a request for a particular stock symbol and their servers return a JSON containing the price, volume, market capitalization, and other statistics on the stock. This is definitely not the most elegant way to get data. To prevent our program making too many requests (basically DOSing them) and causing MarketOnDemand's servers to blacklist our IP address, we added a 2 second sleeping period between trades.

Since we are but humble programmers, we decided to hold a joint meeting with Bronxville's Investment Club to generate ideas for which algorithms to try. Students were interested in a pivot algorithm which would compare the change in prices of 2 competing companies (say Target and Best Buy). If Target increased more than Best Buy, the program would buy Target and sell Best Buy. Otherwise, it would buy Best Buy and sell Target.

Students in the Investment Club were also interested in programs which could execute trades for them (for their MarketWatch trading game) when they were off-line. We wrote a threshold program which would buy or sell stocks when they reached a certain price or at a certain time. We also tried a program that made trades based on the change in a stock volume.

Finally, I wanted to run a program which traded based on the price's exponential moving average. The ETA is a fun piece of math which calculates the average of a series, but weighs recent values exponentially more. So the most recent value might be weighted to make up half the ETA, then the second would be a fourth, the third an eighth, and so on. Thinking about this in terms of signal processing, the function is really just a kind of low-pass filter.

Since the algorithm makes trades based on an average of the most recent prices, it makes money when the stock price zig-zags over a relatively steady trend (technically, this is called volatility). Really, what we are doing is discarding high frequency component of the signal on the assumption this is just noise and doesn't add much to the overall trend. This is very similar to what is done in many 'lossy' data compression algorithms such as JPEG.

This trading strategy is called means-marginalization. Quantitative finance funds' attempts to use it to arbitrage small price fluctuations one of the reasons stock markets have recently seen dramatic decreases in volatility and increases in liquidity.

Anyway, below you can read about our results in the attached PowerPoint or look over the source of our project.

* Please do not interpret anything said here as 'investment advice.' Also remember every quantitative trading strategy we tried lost money.
