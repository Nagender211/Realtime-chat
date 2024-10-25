const path=require('path');
const http=require('http')
const express=require('express');



const socketio=require('socket.io')
// Set up views engine

const chatForm=require('./utils/ChatForm.js')



const app=express();
const server=http.createServer(app);


const io=socketio(server);

app.use(express.static(path.join(__dirname,'public')));
const botName='Admin'

io.on('connection', socket=>{
    console.log('user connected');

    socket.emit('message', chatForm(botName,'Welcome to realTime chat Application'));


    // when new user joins
    socket.broadcast.emit('message', chatForm(botName,'A user is joined'));


    // when user is disconncts
    socket.on('disconnect', ()=>{
        // console.log('user disconnected');
        io.emit('message', chatForm(botName,'a user as left the chat'));
    })

    socket.on('chatMessage', (msg)=>{
        io.emit('message', chatForm('USER',msg))
    })




})

// app.use(express.json());

const PORT=3000

server.listen(PORT,()=> console.log(`server is running port ${PORT}`))