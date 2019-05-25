const express = require('express')
const Tile = require('../models/tile')

const router = new express.Router()

router.get ('/tiles', async (req,res)=>{
    try {
        const tiles = await Tile.find({})
        res.send(tiles)
    } catch(e){
        res.status(500).res.send()
    }
})
router.get ('/tiles/:id', async (req,res)=>{
    try {
        const tile = await Tile.findById(req.params.id)
        if (!tile){
            return res.status(400).send()
        }
        res.send(tile)
    } catch {
        res.status(500).send()
    }
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