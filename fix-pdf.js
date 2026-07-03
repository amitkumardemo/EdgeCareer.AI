const { issueOfferLetter } = require('./actions/offer-letter');
async function run() {
  console.log("Generating...");
  try {
    await issueOfferLetter('c0a75c9c-12b1-4d2a-a795-2c8d7d3c5bd5');
    console.log("Done");
  } catch(e) {
    console.error(e);
  }
}
run();
