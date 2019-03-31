var artista = document.getElementById("artista");
var nombre = document.getElementById("nombrearte");
var precio = document.getElementById("precio");
var descripcion =  document.getElementById("descripcion");
var imagen =  document.getElementById("imagen");
var largo =  document.getElementById("largo");
var ancho =  document.getElementById("ancho");
var peso =  document.getElementById("peso");
var categoria =  document.getElementById("categoria");

var rootRef = firebase.database().ref().child("pintura");

// rootRef.on("child_added", snap=> {
//     var artista = snap.child("artista").val();
//     var nombre = snap.child("nombre").val();
//     var descripcion = snap.child("nombre").val();
var obraarte = '/Ar1';

// });
var obra = firebase.database().ref('pintura'+obraarte+'/nombre');
obra.once('value',function(snapshot){
    nombre.innerText = snapshot.val();
});

var obra = firebase.database().ref('pintura'+obraarte+'/precio');
obra.once('value',function(snapshot){
    precio.innerText = 'Q'+snapshot.val()+'.00';
});

var obra = firebase.database().ref('pintura'+obraarte+'/artista');
obra.once('value',function(snapshot){
    artista.innerText = 'Artista: '+snapshot.val();
});

var obra = firebase.database().ref('pintura'+obraarte+'/URL');
obra.once('value',function(snapshot){
    imagen.src = snapshot.val();
});

var obra = firebase.database().ref('pintura'+obraarte+'/descripcion');
obra.once('value',function(snapshot){
    descripcion.innerText = snapshot.val();
});

var obra = firebase.database().ref('pintura'+obraarte+'/largo');
obra.once('value',function(snapshot){
    largo.innerText = snapshot.val()+' cm';
});

var obra = firebase.database().ref('pintura'+obraarte+'/peso');
obra.once('value',function(snapshot){
    peso.innerText = snapshot.val()+' gr';
});

var obra = firebase.database().ref('pintura'+obraarte+'/ancho');
obra.once('value',function(snapshot){
    ancho.innerText = snapshot.val()+' cm';
});


function ingresarProducto(arteId,nom,art,desc,lar,anch,pes,prec,url,cat){
    firebase.database().ref('pintura/'+arteId).set({
        nombre: nom,
        artista: art,
        descripcion: desc,
        categoria: cat,
        largo: lar,
        ancho: anch,
        peso: pes,
        precio: prec,
        URL: url
    });   
}

