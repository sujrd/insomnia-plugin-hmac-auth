# HMAC Authentication Plugin

This plugin enables HMAC based authentication for requests in [Insomnia REST Client](https://insomnia.rest/). It works with REST and GraphQL requests.

## Install (Source)

```
mkdir -p $HOME/.config/Insomnia/plugins
cd $HOME/.config/Insomnia/plugins
git clone https://github.com/sujrd/insomnia-plugin-hmac-auth.git insomnia-plugin-hmac-auth
cd insomnia-plugin-hmac-auth
npm install
```

## Installation (Package)

Inside Insomnia plugin manager simply install the `insomnia-plugin-hmac-auth` plugin.

## Usage

In you environment add these variables:

```
{
    UUID: "user name or uuid",
    SECRET: "sign secret"
}
```

Once these are defined, the plugin will add the following headers to every request:

```
X-Date: [date time of the request]
Authorization: APIAuth [uuid]:[signature]
MD5-Content: [md5 hash of the request body]
```
