const express = require('express')
const path = require('path')
const app = express()
const {bots, playerRecord} = require('./data')
const {shuffleArray,home} = require('./utils')
require('dotenv').config()

app.use(express.json())

app.get('/api/robots', (req, res) => {
    try {
        res.status(200).send(botsArr)
    } catch (error) {
        console.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
    }
})

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: process.env.ROLLBARR_KEY,
  captureUncaught: true,
  captureUnhandledRejections: true,
})

//rollbar.log("Hello world!");
/*MiddleWare*/
app.get('/', (req,res) =>  {
    res.sendFile(path.join( __dirname, "./public/index.html"))  
    rollbar.log("page served")
})//serve home page
app.get('/styles', (req,res) => 
{res.sendFile(path.join( __dirname, "./public/index.css")) 
rollbar.log("css served")} )//serve home page
app.get('/js', (req,res) => {
res.sendFile(path.join( __dirname, "./public/index.js"))  
rollbar.log("js served")})//serve home page

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        res.status(200).send({choices, compDuo})
        rollbar.log("robots sent")
    } catch (error) {
        console.log('ERROR GETTING FIVE BOTS', error)
        rollbar.error("Robots not sent")
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            res.status(200).send('You lost!')
        } else {
            playerRecord.losses++
            res.status(200).send('You won!')
        }
        rollbar.info("succesfful duel")
    } catch (error) {
        console.log('ERROR DUELING', error)
        rollbar.error("Duel failed")
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
        rollbar.log("player records sent")
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        rollbar.error("ERROR GETTING PLAYER STATS")
        res.sendStatus(400)
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    rollbar.info("server launched")
  console.log(`Listening on port ${port}`)
})