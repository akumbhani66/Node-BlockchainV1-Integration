var MyWallet = require('blockchain.info/MyWallet')
var express = require('express')
var app = express()

app.get('/wallets/new', function (req, res) {
  console.log("creating wallet...");
  var options = {
    hd: true,
    apiHost:HOST,
    email: EMAIL,
  }

  MyWallet.create(PASSWORD,
    API_KEY,
    options,
    ).then(function (response) {
      res.status(200).send(`<u>Wallet Info.</u></br>` +
        `GUID(Wallet Id): ` + response.guid + `</br>` +
        `PASSWORD : PASSWORD` +
        `</br><a href='https://blockchain.info/wallet/#/login'>Click here to login.</a>`
      )
    }
  )
})

app.get('/wallet/enableHD', function(req, res) {
  var options = {
    apiCode: 'API_KEY',
    apiHost: HOST
  }
  var wallet = new MyWallet(WALLET_ID, WALLET_PASSWORD, options)
  wallet.enableHD().then(function (response) {
    res.status(200).send(">>>"+ response);
  })
})

app.get('/wallet/list/HDaccounts', function(req, res) {
  var options = {
    apiCode: API_KEY,
    apiHost: HOST
  }
  var wallet = new MyWallet(WALLET_ID, WALLET_PASSWORD, options)
  wallet.listAccounts().then(function (response) {
    res.status(200).send(">>>"+ response);
  })
})

app.get('/wallets/getBalance', function (req, res) {
  var options = {
    apiCode: API_KEY,
    apiHost: HOST,
  }
  var wallet = new MyWallet(WALLET_ID, WALLET_PASSWORD, options)
  wallet.getBalance()
          .then(function (response) {
            res.status(200).send("Balance is:" + response.balance)
          })
})

app.get('/wallets/addresses/createNewAddress', function(req, res) {
  console.log("called");

  var options = {
    label: "ABCD",// User's email will be label, Will set it later.
  }

  var options2 = {
     apiCode: API_KEY,
     apiHost: HOST,
  }

  var wallet = new MyWallet(WALLET_ID, WALLET_PASSWORD, options2)
  wallet.newAddress(options).then(function (response) {
    res.status(200).send(">>>"+ response);
  })
})

app.get('/wallet/allAddress', function(req, res) {
  var options = {
    apiCode: API_KEY,
    apiHost: HOST,
  }

  var wallet = new MyWallet(WALLET_ID, WALLET_PASSWORD, options)
  wallet.listAddresses().then(function (response) {
    res.status(200).send(">>>"+ JSON.stringify(response));
  })
})

app.listen(3001)
