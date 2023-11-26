
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, query, Firestore, getDoc } = require("firebase/firestore");
const{ref, getDownloadURL, getStorage}= require("firebase/storage");
var admin= require("firebase-admin");

const firebaseConfig = {
  apiKey: "AIzaSyApRyuaLuNYDInX9xurroTsSt8MbimAsjE",
  authDomain: "prueba2-a8aaa.firebaseapp.com",
  projectId: "prueba2-a8aaa",
  storageBucket: "prueba2-a8aaa.appspot.com",
  messagingSenderId: "548102121103",
  appId: "1:548102121103:web:3fde452f25cf7dfb5a32fa",
  measurementId: "G-F3BGYF4L1Z"
  
};
//////////////////////////////////////////
const Buck = "prueba2-a8aaa.appspot.com";
var serviceAccount = require("./keys/key.json");
const App = initializeApp(firebaseConfig);
const db = getFirestore(App);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: Buck,
});
const bucked= admin.storage().bucket();
const stor= getStorage(App);

//////////////////////////////////////////

const subir= async(req,res,next)=>
{

  const archivo = req.files['archivo'][0]; 
  const usuario = req.body['usuario']; 
  const comentario = req.body['comentario'];
  

const imagen = archivo
const nombre= Date.now()+imagen.originalname
const file= bucked.file(nombre)
const stream= file.createWriteStream
({
  metadata:{
    contentType:imagen.mimetype
  } 

});
/////////////////////////////////////////////////////////
 // Esperar a que se complete la subida antes de continuar
 await new Promise((resolve, reject) => {
  stream
    .on('error', (error) => {
      console.error('Error al subir la imagen:', error);
      reject(error);
    })
    .on('finish', resolve);
  stream.end(imagen.buffer);
});
/////////////////////////////////////////
const rut = "gs://prueba2-a8aaa.appspot.com/" + nombre;
const fileRef = ref(stor, rut);

// Esperar a que se resuelva la promesa para obtener la URL
const url = await getDownloadURL(fileRef);

const colecion = collection(db, 'publicaciones');

await addDoc(colecion, {
  usuario: usuario,
  comentario: comentario,
  url: url,
  existe:'true'
},
);
} 
//////////////////////////////////////////////
exports.subir = subir;
exports.db = db;
exports.prueba = {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  getDoc
};