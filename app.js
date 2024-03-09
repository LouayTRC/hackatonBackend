const express=require('express');
const mongoose=require('mongoose');
const app=express();
const cors=require('cors');
const authRouter=require('./Routes/Auth');
mongoose.connect('mongodb+srv://louaytrc:aaaaaaaa@hackatonisi.08pp875.mongodb.net/?retryWrites=true&w=majority&appName=hackatonISI')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
const corsOpts = {
  origin: '*',
  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
  ],

  allowedHeaders: [
    ['Content-Type', 'Authorization']
  ],
};
app.use(cors(corsOpts));

app.use('/api/auth',authRouter);

app.use((req, res) => {
  res.json({ message: "serveur works" });
});


module.exports = app;