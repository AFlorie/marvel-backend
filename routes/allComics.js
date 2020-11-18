const express = require("express");
const axios = require("axios");
const router = express.Router();
const md5 = require("crypto-js/md5");

// TimeStamp
const date = new Date();
const ts = Math.floor(date.getTime() / 1000);
//console.log(ts);

// hash // md5(ts+privateKey+publicKey)
const public_key = process.env.PUBLIC_KEY;
const private_key = process.env.PRIVATE_KEY;
const hash = md5(ts + private_key + public_key);

/*For example, a user with a public key of "1234" and a private key of "abcd" could construct a valid call as follows: 
http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150
 (the hash value is the md5 digest of 1abcd1234) */

router.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${public_key}&hash=${hash}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
