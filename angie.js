firebase.initializeApp({
  apiKey: "AIzaSyCgXdm96Jw77wwlOdBUeHo_-9P-CGkltqc",
  authDomain: "whapsapp-example.firebaseapp.com",
  projectId: "whapsapp-example",
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//agregar documentos

function guardar(){
  let nombre = document.getElementById('nombre').value;
  let apellido = document.getElementById('apellido').value;
  let born = document.getElementById('born').value;

  db.collection("users").add({
      first: nombre,
      last: apellido,
      born: born
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById('nombre').value = '';
      document.getElementById('apellido').value = '';
      document.getElementById('born').value = '';
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}
//LEER DOCUMENTOS
let tablita = document.getElementById('tablita');
db.collection("users").onSnapshot((querySnapshot) => {
  tablita.innerHTML='';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tablita.innerHTML += `
        <tr>
          <th scope="row">${doc.id}</th>
          <td>${doc.data().first}</td>
          <td>${doc.data().last}</td>
          <td>${doc.data().born}</td>
          <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
          <td><button class="btn btn-warning"onclick="editar('${doc.id}','${doc.data().first}', '${doc.data().last}','${doc.data().born}')">Editar</button></td>
        </tr>`
    });
});
///// BORRAR DOCUMENTOS
function eliminar(id){
  db.collection("users").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
}

///EDITAR DOCUMENTOS//
function editar(id, name, last, born){
  document.getElementById('nombre').value = name;
  document.getElementById('apellido').value = last;
  document.getElementById('born').value = born;
  let btn = document.getElementById('boton');
  btn.innerHTML = 'Editar';

  btn.onclick= function(){
    var washingtonRef = db.collection("users").doc(id);

    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let born = document.getElementById('born').value;

    return washingtonRef.update({
      first: nombre,
      last: apellido,
      born: born
    })
    .then(()=> {
        console.log("Document successfully updated!");
        btn.innerHTML = "Guardar";
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('born').value = '';


    })
    .catch((error)=> {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }
}
