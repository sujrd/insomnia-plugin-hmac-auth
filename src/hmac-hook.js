const CryptoJS = require("crypto-js");
const MD5      = require('crypto-js/md5');
const Hex      = require('crypto-js/enc-hex');
const Base64   = require('crypto-js/enc-base64');
const hmacSHA1 = require('crypto-js/hmac-sha1');

module.exports = function(context) {

  const request = context.request;

  const uuid   = request.getEnvironmentVariable("UUID");
  const secret = request.getEnvironmentVariable("SECRET");

  if(uuid === undefined || secret === undefined) {
    return;
  }

  const method  = request.getMethod();
  const xDate = (new Date()).toUTCString();
  const contentType = request.getHeader("Content-Type");

  const url = document.createElement('a');
  url.href  = request.getUrl();
  const path = url.pathname + url.search;

  const md5Hash      = Base64.stringify(MD5(request.getBodyText()));
  const canonicalStr = [method, contentType, md5Hash, path, xDate].join();
  const signature    = Hex.stringify(hmacSHA1(canonicalStr, secret));
  const authToken    = "APIAuth " + uuid + ":" + signature;

  console.log(`[hmac] Injecting date header X-Date: ${xDate}`);
  console.log(`[hmac] Injecting auth header Authorization: ${authToken}`);
  console.log(`[hmac] Injecting md5 header  Content-MD5: ${md5Hash}`);

  context.request.setHeader('X-Date', xDate);
  context.request.setHeader('X-TIME_ZONE', -1*(new Date()).getTimezoneOffset()/60);
  context.request.setHeader('Authorization', authToken);
  context.request.setHeader('Content-MD5', md5Hash);

};
