const shortid = require("shortid");
const URL = require("../models/url.models");
async function handleGenerateNewShortURL(req, res) {
  const shortID = shortid.generate(3);
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "Url is required" });
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
}

async function handleGetAnaytics(req,res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({shortId});

  return res.json({
    totalClicks : result.visitHistory.length,
    analytics : result.visitHistory
  })
  
}
async function handleGetShortURL(req, res) {
try {
const shortId = req.params.shortId;

const entry = await URL.findOneAndUpdate(
  { shortId },
  {
    $push: {
      visitHistory: {
        timestamp: Date.now(),
      },
    },
  },
  { returnDocument: "after" }
);

if (!entry) {
  return res.status(404).send("Short URL not found");
}

let redirectURL = entry.redirectURL;

if (
  !redirectURL.startsWith("http://") &&
  !redirectURL.startsWith("https://")
) {
  redirectURL = "https://" + redirectURL;
}

return res.redirect(redirectURL);

} catch (error) {
console.error("Redirect Error:", error);
return res.status(500).send("Internal Server Error");
}
}
module.exports = {
  handleGenerateNewShortURL,
  handleGetAnaytics,
  handleGetShortURL
};
