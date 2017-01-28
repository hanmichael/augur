webpackJsonp([7,11],{1114:function(e,t,a){"use strict";var n=a(13),r=a.n(n),l=a(586),o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},i=function(e){return r.a.createElement("section",{id:"login_message_view"},r.a.createElement("div",{className:"page-content"},r.a.createElement("h1",null,"Welcome to the Augur beta test!"),r.a.createElement("p",null,"This is a beta test in advance of Augur's live release. There are bugs. There are features being\n        added, improved, and re-designed. There are a few hundred enhancements scheduled to be added in the next few\n        months. Your thoughtful feedback now is essential. Please use the feedback button at the bottom left of\n        every page to submit your feedback, or feel free to send an email to ",r.a.createElement("a",{className:"link",href:"mailto:hugs@augur.net?subject=Beta Testing feedback"},"hugs@augur.net"),". From your submissions, the development team will coordinate fixes and new features. Changes and fixes will be\n        displayed when you log in again."),r.a.createElement("h2",null,"Important information:"),r.a.createElement("ol",null,r.a.createElement("li",null,"Because Augur is a ",r.a.createElement("b",null,"completely decentralized")," system, if you lose your login credentials it is impossible to recover them. Please ",r.a.createElement("a",{className:"link",href:"http://blog.augur.net/faq/how-do-i-savebackup-my-wallet/",target:"_blank",rel:"noopener noreferrer"},"take appropriate measures")," to protect the safety of your password, and create a way to recover your credentials if you forget them."),r.a.createElement("li",null,"Do not send real Ether (ETH) to your Augur account while we are testing! Each account will be given 10,000 testnet ETH tokens for beta testing. Please note that testnet ETH has no value except for testing: it is merely an on-contract IOU (a token) for testnet Ether."),r.a.createElement("li",null,"Reputation (REP) is a unique and important part of the Augur trading platform. If you own REP tokens, you must visit\n          the site periodically to fulfill your reporting obligations. During beta testing, each new account will\n          receive 47 testnet REP (they have no value except for testing). Each reporting cycle will last 2 days. Every\n          two-day cycle will consist of a commit phase, a reveal phase, and a challenge phase. Because the test\n          cycle is dramatically compressed (the main net cycle will be 60 days long) it is recommended that\n          users visit the site at least every 2 days to maintain your REP and simulate “real money” trading,\n          resolution, and reporting conditions. Learn ",r.a.createElement("a",{className:"link",href:"https://www.youtube.com/watch?v=sCms-snzHk4",target:"_blank",rel:"noopener noreferrer"},"how Augur's Reputation tokens work"),"."),r.a.createElement("li",null,'A note on price/time priority on the blockchain.  The site is only as fast as Ethereum blocks are mined.  Augur\'s matching engine sorts order books by price, then by block number, then by transaction index. Within a single block, transactions are ordered by the miner who mines the block.  When constructing a block, miners typically order transactions first by gasprice (highest to lowest), and then by the order received (oldest to newest).  So, Augur\'s "price/blocknumber/transaction index priority" ordering is generally equivalent to price/time priority, if there are differing gasprices within the block, the transaction index is not guaranteed to be time-ordered.  (Presently, Augur does not attempt to adjust gasprices in response to other pending transactions, although, if desired, gasprice can be adjusted manually using the API, by changing the "gasPrice" field attached to every sendTransaction payload.)')),r.a.createElement("h2",null,"Technical updates:"),r.a.createElement("h3",null,"January 24, 2017"),r.a.createElement("ol",null,r.a.createElement("li",null,"Moved updateTradesInProgress trading actions post-processing to a new augur.js function, calculateTradeTotals."),r.a.createElement("li",null,"Moved placeTrade loop-thru-trading actions to new executeTradingActions function in augur.js."),r.a.createElement("li",null,"Added optional doNotMakeOrders parameter to executeTradingActions, placeTrade, placeBuy, placeSell, and placeShortSell functions."),r.a.createElement("li",null,"Fixed selectOrder references."),r.a.createElement("li",null,"Fixed isShortAsk parameter formatting in sell function.")),r.a.createElement("h3",null,"January 23, 2017"),r.a.createElement("ol",null,r.a.createElement("li",null,"Increased augur.js unit test coverage by about 10%.")),r.a.createElement("h3",null,"January 21, 2017"),r.a.createElement("ol",null,r.a.createElement("li",null,"augur.js minified build now works correctly.")),r.a.createElement("h3",null,"January 19, 2017"),r.a.createElement("ol",null,r.a.createElement("li",null,"Moved (almost) all trading logic from UI to augur.js."),r.a.createElement("li",null,"Added license link to footer."),r.a.createElement("li",null,"Added popover text for long outcome names in market preview panels.")),e.marketsLink&&r.a.createElement(l.a,o({className:"lets-do-this-button"},e.marketsLink),"Let's do this!")))};i.propTypes={marketsLink:n.PropTypes.object},t.default=i}});