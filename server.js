const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { prueba, db , subir} = require("./conexion");
const { where } = require('firebase/firestore');
const app = express();
const storage = multer({

  storage: multer.memoryStorage()




})

const fields = [
  { name: 'usuario', maxCount: 1 },
  { name: 'comentario'},
  { name: 'archivo', maxCount: 1 }
];


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));




app.post('/upload', storage.fields(fields),subir, async (req, res) => {
  
 
  
 
});


app.post('/agregar_usuario', async (req, res) => {
  const query = prueba.query(prueba.collection(db,'usuarios'),where('email', '==', req.body.email));

  const collection = prueba.collection(db, 'usuarios');

  const docs = await prueba.getDocs(query);
  if(docs.empty)
  {
    await prueba.addDoc(collection, {
      usuario: req.body.usuario,
      contraseña: req.body.contraseña,
      email: req.body.email,

      
    },
    
    res.send('Usuario creado')
    
    );
  }
else{
  res.send('existe');
}

 
});

app.post('/login', async (req, res) => {

  const collection = prueba.query(prueba.collection(db,'usuarios'),where('email', '==', req.body.email),where('contraseña', '==', req.body.contraseña));


  const docs = await prueba.getDocs(collection);
  if(docs.empty)
  {
    res.send("Usuario no encontrado");
  }
  const doc= docs.forEach((snap)=>{res.send(JSON.stringify(snap.data()))})

});




app.get('/publicar', async (req, res) => 
{
  const collection = prueba.query(prueba.collection(db,'publicaciones'),where('existe', '==', "true"));
  const docs = await prueba.getDocs(collection);
  const data = [];


docs.forEach((snap) => 
{
    data.push(snap.data());
});

if (data.length === 0) {
    res.send("Usuario no encontrado");
} else {
    res.send(JSON.stringify(data));
}


})

app.get('/', (req, res) => {
  res.render('App');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
