var artista = document.getElementById("artista");
var nombre = document.getElementById("nombrearte");
var precio = document.getElementById("precio");
var descripcion =  document.getElementById("descripcion");
var imagen =  document.getElementById("imagen");
var largo =  document.getElementById("largo");
var ancho =  document.getElementById("ancho");
var peso =  document.getElementById("peso");
var categoria =  document.getElementById("categoria");
var productos = document.getElementById("productos");
var carritos = document.getElementById("productoscarrito");
var factura = document.getElementById("factura");
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

// let valorid = 1;
// var obraarte = '/1';
// function obtenerid(valor){
//      obraarte = '/'+Object.assign(valor);
//      alert(obraarte);
// }
// alert('obra2'+valorid);

// });

// var obra = firebase.database().ref('pintura'+obraarte+'/nombre');
// obra.once('value',function(snapshot){
//     nombre.innerText = snapshot.val();
// });


// var obra = firebase.database().ref('pintura'+obraarte+'/precio');
// obra.once('value',function(snapshot){
//     precio.innerText = 'Q'+snapshot.val()+'.00';
// });

// var obra = firebase.database().ref('pintura'+obraarte+'/artista');
// obra.once('value',function(snapshot){
//     artista.innerText = 'Artista: '+snapshot.val();
// });

// var obra = firebase.database().ref('pintura'+obraarte+'/URL');
// obra.once('value',function(snapshot){
//     imagen.src = snapshot.val();
// });

// var obra = firebase.database().ref('pintura'+obraarte+'/descripcion');
// obra.once('value',function(snapshot){
//     descripcion.innerText = snapshot.val();
// });

// var obra = firebase.database().ref('pintura'+obraarte+'/largo');
// obra.once('value',function(snapshot){
//     largo.innerText = snapshot.val()+' cm';
// });

// var obra = firebase.database().ref('pintura'+obraarte+'/peso');
// obra.once('value',function(snapshot){
//     peso.innerText = snapshot.val()+' gr';
// });

// var obra = firebase.database().ref('pintura'+obraarte+'/ancho');
// obra.once('value',function(snapshot){
//     ancho.innerText = snapshot.val()+' cm';
// });


function obtenerID(){
    var refid = firebase.database().ref('id/valor');
    refid.on('value',function(snapshot){
        id = '/'+snapshot.val();
        var obra = firebase.database().ref('pintura'+id+'/nombre');
        obra.once('value',function(snapshot){
            nombre.innerText = snapshot.val();
        });


        var obra = firebase.database().ref('pintura'+id+'/precio');
        obra.once('value',function(snapshot){
            precio.innerText = 'Q'+snapshot.val()+'.00';
        });

        var obra = firebase.database().ref('pintura'+id+'/artista');
        obra.once('value',function(snapshot){
            artista.innerText = 'Artista: '+snapshot.val();
        });

        var obra = firebase.database().ref('pintura'+id+'/URL');
        obra.once('value',function(snapshot){
            imagen.src = snapshot.val();
        });

        var obra = firebase.database().ref('pintura'+id+'/descripcion');
        obra.once('value',function(snapshot){
            descripcion.innerText = snapshot.val();
        });

        var obra = firebase.database().ref('pintura'+id+'/largo');
        obra.once('value',function(snapshot){
            largo.innerText = snapshot.val()+' cm';
        });

        var obra = firebase.database().ref('pintura'+id+'/peso');
        obra.once('value',function(snapshot){
            peso.innerText = snapshot.val()+' gr';
        });

        var obra = firebase.database().ref('pintura'+id+'/ancho');
        obra.once('value',function(snapshot){
            ancho.innerText = snapshot.val()+' cm';
        });
    });
}

function asignarID(id){
    var firebaseRef = firebase.database().ref();
    firebaseRef.child("id").update({
        "valor": id
    });
}

function asignarIDcarrito(id){
    alert("Se ha agregado este producto al carrito");
    asignarID(id);
    var refid = firebase.database().ref('id/valor');
    refid.on('value',function(snapshot){
        valor = snapshot.val();
        agregarcarrito(valor);
    });
}

function carrito2(){
    var refid = firebase.database().ref('id/valor');
    refid.on('value',function(snapshot){
        valor = snapshot.val();
        // alert(valor);
        agregarcarrito(valor);
    });
}


function HTMLmostrarproductos(id,name,price,cat,img){
    return `<div class="col-md-6 col-lg-4">
    <div class="card text-center card-product">
      <div class="card-product__img">
        <img class="card-img" style="height: 270px;width: 263px;" src="${img}" alt="">
        <ul class="card-product__imgOverlay">
          <li><button><i class="ti-search"></i></button></li>
          <li><button onclick="asignarIDcarrito('${id}');"><i class="ti-shopping-cart"></i></button></li>
        </ul>
      </div>
      <div class="card-body">
        <p>${cat}</p>
        <h4 class="card-product__title" onclick="asignarID('${id}');"><a href="single-product.html">${name}</a></h4>
        <p class="card-product__price">Q${price}</p>
      </div>
    </div>
  </div>`
}

function HTMLmostrarcarrito(name,price,img){
    return `<tr>
    <td>
        <div class="media">
            <div class="d-flex">
                <img  style="height: 110px;width: 160px;"src="${img}" alt="">
            </div>
            <div class="media-body">
                <p>${name}</p>
            </div>
        </div>
    </td>
    <td>
        <h5>Q${price}.00</h5>
    </td>
    <td>
        <div class="product_count">
            <input type="text" name="qty" id="sst" maxlength="12" value="1"
                title="Quantity:" class="input-text qty">
            <button
                onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst )) result.value++;return false;"
                class="increase items-count" type="button"><i
                    class="lnr lnr-chevron-up"></i></button>
            <button
                onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst ) > 0 ) result.value--;return false;"
                class="reduced items-count" type="button"><i
                    class="lnr lnr-chevron-down"></i></button>
        </div>
    </td>
    <td>
        <h5>Q${price}.00</h5>
    </td>
</tr>`
}

function botonescarrito(total){
    return ` <tr class="bottom_button">
    <td>
        <a class="button" href="#">Actualizar Carrito</a>
    </td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td></td>
    <td>
        <h5>Subtotal</h5>
    </td>
    <td>
        <h5>Q${total}.00</h5>
    </td>
</tr>
<tr class="shipping_area">
    <td class="d-none d-md-block">

    </td>
    <td></td>
    <td>
        <h5>Shipping</h5>
    </td>
    <td>
        <div class="shipping_box">
            <ul class="list">
                <li><a href="#">Tarifa plana: $5.00</a></li>
                <li><a href="#">Sin Shipping</a></li>
                <li><a href="#">Tarifa interior: $10.00</a></li>
                <li class="active"><a href="#">Envío local: $2.00</a></li>
            </ul>
            <br />
            <a class="gray_btn" href="#">Actualizar datos</a>
        </div>
    </td>
</tr>
<tr class="out_button_area">
    <td class="d-none-l"></td>
    <td class=""></td>
    <td></td>
    <td>
        <div class="checkout_btn_inner d-flex align-items-center">
            <a class="gray_btn" href="category.html">Continuar comprando</a>
            <a class="primary-btn ml-2" href="confirmation.html">Finalizar la compra</a>
        </div>
    </td>
</tr>`
}

function HTMLfactura(name,precio){
    return `<tr>
    <td>
      <p>${name}</p>
    </td>
    <td>
      <h5>x 01</h5>
    </td>
    <td>
      <p>Q${precio}.00</p>
    </td>
  </tr>`
}

function resultadofactura(total){
    return`<tr>
    <td>
      <h4>Subtotal</h4>
    </td>
    <td>
      <h5></h5>
    </td>
    <td>
      <p>Q${total}.00</p>
    </td>
  </tr>
  <tr>
    <td>
      <h4>Shipping</h4>
    </td>
    <td>
      <h5></h5>
    </td>
    <td>
      <p>Tarfia plana: $50.00</p>
    </td>
  </tr>
  <tr>
    <td>
      <h4>Total</h4>
    </td>
    <td>
      <h5></h5>
    </td>
    <td>
      <h4>Q${total}.00</h4>
    </td>
  </tr> `
}


function mostrarProductos(){
    var lista;
    var pro = firebase.database().ref().child("pintura");
    pro.on('value',function(snapshot){
    var key = Object.keys(snapshot.val());
    for(var i=0; i <key.length;i++){
        var id = key[i];
        var pro1 = firebase.database().ref('pintura/'+id+'/nombre');//Inicio de pedir nombre
        pro1.on('value',function(snapshot){
            var name = snapshot.val();
            var pro2 = firebase.database().ref('pintura/'+id+'/precio');//Inicio de pedir producto
            pro2.on('value',function(snapshot){
                var price = snapshot.val();
                var pro3 = firebase.database().ref('pintura/'+id+'/categoria');//Inicio de pedir categoria
                    pro3.on('value',function(snapshot){
                    var category= snapshot.val();
                    var pro4 = firebase.database().ref('pintura/'+id+'/URL');//Inicio de pedir imagen
                    pro4.on('value',function(snapshot){
                        var photo = snapshot.val();
                        productos.innerHTML+=`${HTMLmostrarproductos(id,name,price,category,photo)}`;
                        // console.log(id+','+nombre+','+precio+','+categoria+','+url);
                    });
                });//fin de categoria
            });//fin de precio
        });//fin de nombre
    }

});
}
function mostrarcarrito(){
    var pro = firebase.database().ref().child("carrito");
    var total = 0;
    pro.on('value',function(snapshot){
        var key = Object.keys(snapshot.val());
        // console.log(key);
        for(var i=0; i<key.length;i++){
            var id = key[i];
            var pro1 = firebase.database().ref('carrito/'+id+'/nombre');//Inicio de pedir nombre
            pro1.on('value',function(snapshot){
                var name = snapshot.val();
                var pro2 = firebase.database().ref('carrito/'+id+'/precio');//Inicio de pedir nombre
                pro2.on('value',function(snapshot){
                    var price = snapshot.val();
                    var pro3 = firebase.database().ref('carrito/'+id+'/url');//Inicio de pedir nombre
                    pro3.on('value',function(snapshot){
                        var photo = snapshot.val();
                        total += price;
                        carritos.innerHTML+=`${HTMLmostrarcarrito(name,price,photo)}`;
                    });
                });
            });
        }
        carritos.innerHTML+=`${botonescarrito(total)}`;
    });
}

function mostrarfactura(){
    var pro = firebase.database().ref().child("carrito");
    var total = 0;
    pro.on('value',function(snapshot){
        var key = Object.keys(snapshot.val());
        // console.log(key);
        for(var i=0; i<key.length;i++){
            var id = key[i];
            var pro1 = firebase.database().ref('carrito/'+id+'/nombre');//Inicio de pedir nombre
            pro1.on('value',function(snapshot){
                var name = snapshot.val();
                var pro2 = firebase.database().ref('carrito/'+id+'/precio');//Inicio de pedir nombre
                pro2.on('value',function(snapshot){
                    var price = snapshot.val();
                    var pro3 = firebase.database().ref('carrito/'+id+'/url');//Inicio de pedir nombre
                    pro3.on('value',function(snapshot){
                        var photo = snapshot.val();
                        total += price;
                        factura.innerHTML+=`${HTMLfactura(name,price)}`;
                    });
                });
            });
        }
        factura.innerHTML+=`${resultadofactura(total)}`;
    });
}


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

function agregarcarrito(id){
    var pro1 = firebase.database().ref('pintura/'+id+'/nombre');//Inicio de pedir nombre
    pro1.on('value',function(snapshot){
        var name = snapshot.val();
        var pro2 = firebase.database().ref('pintura/'+id+'/precio');//Inicio de pedir producto
        pro2.on('value',function(snapshot){
            var price = snapshot.val();
            var pro3 = firebase.database().ref('pintura/'+id+'/URL');
            pro3.on('value',function(snapshot){
                photo = snapshot.val();
                firebase.database().ref('carrito/'+id).set({
                    nombre: name,
                    precio: price,
                    url: photo
                });
            });
        });
    });
 
    // var firebaseRef = firebase.database().ref();
    // firebaseRef.child("Carrito").set(null);
}

// agregarcarrito(1);

