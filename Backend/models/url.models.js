const mongosse = require("mongoose");

const urlSchema = new mongosse.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: { type: Number },
      },
    ],
  },
  { timestamps: true },
);

const URL = mongosse.model("url", urlSchema);

module.exports = URL;
