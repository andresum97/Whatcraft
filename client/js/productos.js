var artista = document.getElementById("artista");
var nombre = document.getElementById("nombrearte");
var precio = document.getElementById("precio");
var descripcion =  document.getElementById("descripcion");
var imagen =  document.getElementById("imagen");
var largo =  document.getElementById("largo");
var ancho =  document.getElementById("ancho");
var peso =  document.getElementById("peso");
var categoria =  document.getElementById("categoria");
// var ID = document.getElementById("Ar1");

var rootRef = firebase.database().ref().child("pintura");

// rootRef.on("child_added", snap=> {
//     var artista = snap.child("artista").val();
//     var nombre = snap.child("nombre").val();
//     var descripcion = snap.child("nombre").val();

// var productos = [];
// rootRef.on("child_added", snap=> {
//     var id = snap.child("pintura");
// });

var valorid;
function obtenerid(valor){
    valorid =  valor;
    console.log('prueba'+valor);
}

var obraarte = '/'+String(valorid);
console.log('coso'+valorid);

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


function mostrarProductos(){
    var lista;
    var productos = firebase.database().ref().child("pintura");
    productos.on('value',function(snapshot){
    var key = Object.keys(snapshot.val());
    for(var i=0; i <key.length;i++){
        var id = key[i];
        var pro1 = firebase.database().ref('pintura/'+id+'/nombre');//Inicio de pedir nombre
        pro1.on('value',function(snapshot){
            var nombre = snapshot.val();
            var pro2 = firebase.database().ref('pintura/'+id+'/precio');//Inicio de pedir producto
            pro2.on('value',function(snapshot){
                var precio = snapshot.val();
                var pro3 = firebase.database().ref('pintura/'+id+'/categoria');//Inicio de pedir categoria
                    pro3.on('value',function(snapshot){
                    var categoria= snapshot.val();
                    console.log(id+','+nombre+','+precio+','+categoria);
                });//fin de categoria
            });//fin de precio
        });//fin de nombre
    }

});
}
mostrarProductos();

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

