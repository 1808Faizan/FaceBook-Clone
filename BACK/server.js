import app from './app.js';

app.listen(process.env.Port,()=>{
    console.log(`server starting on port ${process.env.PORT}`);  
})