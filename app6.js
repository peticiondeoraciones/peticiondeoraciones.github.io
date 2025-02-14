firebase.initializeApp({
    apiKey: "AIzaSyCDz-lBvMN1B97fcJHOp3Q_By8CoZI-zIs",
    authDomain: "proyecto2-32df6.firebaseapp.com",
    projectId: "proyecto2-32df6",
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Agregar documentos
function guardar(){
    var nombre = document.getElementById("nombre").value;
    var motivo = document.getElementById("motivo").value;

    db.collection("empleos").add({
        nombre: nombre, // Corregido "first" a "nombre"
        motivo: motivo
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById("nombre").value = "";
        document.getElementById("motivo").value = "";
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// Leer documentos
var tabla = document.getElementById("tabla");
db.collection("empleos").onSnapshot((querySnapshot) => {
    tabla.innerHTML = ""; // Limpiar el contenido antes de agregar nuevos datos
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`); // Muestra el ID y el nombre en la consola
        tabla.innerHTML += `
            <tr>
                <td>${doc.data().nombre}</td>
                <td>${doc.data().motivo}</td>
                <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            </tr>
        `;
    });
});
// Función para eliminar un documento por ID
function eliminar(id) {
    db.collection("empleos").doc(id).delete()
    .then(function () {
        console.log("Documento eliminado correctamente.");
    })
    .catch(function (error) {
        console.error("Error al eliminar el documento: ", error);
    });
}


