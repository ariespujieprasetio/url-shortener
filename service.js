const { nanoid } = require("nanoid");
const validUrl = require("valid-url");
const repo = require("./repository");

const shortenUrl = async (url) => {
  if (!validUrl.isUri(url)) {
    throw new Error("Invalid URL");
  }

  let shortCode;
  let exists;

  do {
    shortCode = nanoid(6);
    exists = await repo.findByShortCode(shortCode);
  } while (exists);

  return repo.saveUrl(url, shortCode);
};

module.exports = { shortenUrl };
