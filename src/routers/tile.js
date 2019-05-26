const express = require('express')
const Tile = require('../models/tile')
var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost');

const router = new express.Router()

router.get ('/tiles', async (req,res)=>{
    try {
        const tiles = await Tile.find({})
        res.send(tiles)
    } catch(e){
        res.status(500).res.send()
    }
})
router.get ('/tiles/:id',  (req,res)=>{
        redis.get(req.params.id, (err, reply)=>{
            if (err){
                return res.send(err)
            }
            else if (reply){
                console.log ("Returning ", reply, " from Redis cache")
                return res.send(reply)
            }
            else {
                console.log ("Not found in")
                Tile.find({ link: req.params.id }, (err,doc)=>{
                    if (err || !doc){
                        return res.status(400).send()
                    }
                    redis.set(req.params.id, JSON.stringify(doc), () => {
                        console.log (JSON.stringify(doc), "cached in Redis")
                        return res.send(doc);
                    })
                })
            }
        })
    })
router.patch ('/tiles/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age']
    const isValidOp = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if (!isValidOp) {
        return res.status(400).send()
    }
    try {
        const tile = await Tile.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!tile){
            return res.status(404).send()
        }
        res.send(tile)
    } catch {
        res.status(500).send()
    }
})
router.delete ('/tiles/:id', async (req,res)=>{
    try {
        const tile = await Tile.findByIdAndDelete(req.params.id)
        if (!tile){
            return res.status(404).send()
        }
        res.send(tile)
    } catch {
        res.status(500).send()
    }
})

router.post('/tiles', async (req,res)=>{
    const tile = new Tile(req.body)
    try {
        await tile.save()
        res.send(tile)
    } catch (e){
        res.status(400).send(e)
    }
})

module.exports = router