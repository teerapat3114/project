import express from "express"
import { Server } from "socket.io"
import mysql from "mysql"
import cors from "cors"
import multer from "multer"
import path from "path"
import fs from "fs"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const saltRounds = 10
const app = express()
const port = 4000

app.use(cors())
app.use(express.json()) 
app.use(express.static('public'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname +"_"+ Date.now() +path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "Pliangamessystem"
})

app.get('/main', (req,res) => {
    const sql = "SELECT * FROM post"
    db.query(sql, (err,result) => {
        if(err){
            console.log(err)
        }else{
            result.sort(function(a,b){
                return b.postTime - a.postTime
            })
            res.send(result)
        }
    })
})

app.get('/mypost', (req,res) => {
    const sql = "SELECT * FROM post WHERE ownerId = ?"
    db.query(sql, [1], (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.post('/savepost', upload.single('image') ,(req,res) => {
    const imageData = req.file.filename
    let postTime = new Date()
    postTime = postTime.toISOString().split('T')[0]+' '+postTime.toTimeString().split(' ')[0];
    const sql = "INSERT INTO post (format, place, picture, game, platform, wantedGame, wantedPlatform, ownerId, postTime) VALUES(?,?,?,?,?,?,?,?,?)"
    db.query( sql,[req.body.format, req.body.place, imageData, req.body.game, req.body.platform, 
        req.body.wantedGame, req.body.wantedPlatform, "1", postTime],
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.put('/editpost', upload.single('image'), (req,res)=>{
    const imageData = req.file.filename
    const sql = "UPDATE post SET format = ?, place = ?, picture = ?, game = ?, platform = ?, wantedGame = ?, wantedPlatform = ? WHERE id = ?"
    db.query(sql,[req.body.format, req.body.place, imageData, req.body.game, req.body.platform, 
        req.body.wantedGame, req.body.wantedPlatform, req.body.id],
    (err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.put('/editpostnoimage', (req,res) => {
    const sql = "UPDATE post SET format = ?, place = ?, game = ?, platform = ?, wantedGame = ?, wantedPlatform = ? WHERE id = ?"
    db.query(sql, [req.body.format, req.body.place, req.body.game, req.body.platform, 
        req.body.wantedGame, req.body.wantedPlatform, req.body.id],
    (err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)

        }
    })
})

app.delete('/deletepost/:id/:image', (req,res) => {
    const id = req.params.id
    const imagePath = `./public/images/${req.params.image}`
    const sql = "DELETE FROM post WHERE id = ?"
    db.query(sql, [id], (err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            fs.unlink(imagePath, (err) => {
                if(err){
                    console.log(err)
                }else{
                    console.log('image deleted')
                }
            })
        }
    })
})

// app.get('/getimg', (req,res) => {
//     const sql = "SELECT picture FROM post WHERE id = ?"
//     db.query(sql, [2],(err, result) => {
//         if(err){
//             console.log(err)
//         } else{
//             res.send(result)
//         }
//     })
// })



app.listen(port,()=> console.log(`Server started at port ${port}`))