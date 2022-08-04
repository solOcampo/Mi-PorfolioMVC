const express=require('express');
const path=require('path');
const livereload=require('livereload')

const LiveReloadServer=livereload.createServer()
const connectlivereload=require('connect-livereload')
const app=express()
const port=3000

// Rutas
const mainRouter=require('./routers/main')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'public')));
LiveReloadServer.watch(path.join(__dirname,'public'));
app.use(connectlivereload());

app.use('/',mainRouter);

// app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'views','home.html')));
// app.get('/about',(req,res)=>res.sendFile(path.join(__dirname,'views','about.html')));

LiveReloadServer.server.once('connection', () => {
    setTimeout(() => {
        LiveReloadServer.refresh('/')
        
    }, 50);
})
app.listen(port,()=> console.log(`Servidor levantado con exito en http://localhost:${port}`));
