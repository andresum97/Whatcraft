function registrar(){
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirmPassword').value;
  var alerta = document.getElementById('alerta');
  



  if(password == confirmPassword){
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
      verificar()
    })
    /*.then(function(){
      document.location.href = 'login.html';
      //window.alert("Verifica tu cuenta en tu correo electrónico");
    })*/
    
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        alerta.innerHTML = `
        <div class="mt-3"></div>
        <div class="alert alert-danger" role="alert">
        Ingrese una contraseña de más de 6 caracteres por favor. 
        </div>
        `;
      }
      if (errorCode == "auth/email-already-in-use") {
        alerta.innerHTML = `
        <div class="mt-3"></div>
        <div class="alert alert-danger" role="alert">
        Este correo ya fue vinculado a una cuenta.
        </div>
        `;
      }
      if (errorCode == "auth/invalid-email") {
        
        alerta.innerHTML = `
        <div class="mt-3"></div>
        <div class="alert alert-danger" role="alert">
        Este correo no es válido, recuerde que debe llevar una @
        </div>
        `;
      }
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
  } else{
    
    alerta.innerHTML = `
        <div class="mt-3"></div>
        <div class="alert alert-danger" role="alert">
        Las contraseñas no coinciden, Por favor reingreselas.
        </div>
        `;
  }
  
  
}

function ingresar(){

  var emailL = document.getElementById('emailL').value;
  var passwordL = document.getElementById('passwordL').value;
  var alertaL = document.getElementById('alertaL');
//PONER ESTA OPCION PARA CUANDO QUIERA COMPRAR O METERSE AL CARRITO
  /*firebase.auth().onAuthStateChanged(function(user) {
    if(user.emailVerified){*/
      firebase.auth().signInWithEmailAndPassword(emailL, passwordL)
      .then(function(){
    
        document.location.href = 'index.html';
        
      })
    
      
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/invalid-email") {
          alertaL.innerHTML = `
          <div class="mt-3"></div>
          <div class="alert alert-danger" role="alert">
          Ingrese un usuario valido
          </div>
        `;
      }
        if (errorCode == "auth/user-not-found") {
            alertaL.innerHTML = `
            <div class="mt-3"></div>
            <div class="alert alert-danger" role="alert">
            Usuario no encontrado
            </div>
          `;
        }
        if (errorCode == "auth/wrong-password") {
            alertaL.innerHTML = `
            <div class="mt-3"></div>
            <div class="alert alert-danger" role="alert">
            Contrasena incorrecta
            </div>
            `;
        }
        
        // ...
      });
  
    /*}else{
      alertaL.innerHTML = `
            <div class="mt-3"></div>
            <div class="alert alert-danger" role="alert">
            Tu cuenta no está verificada por favor ve a tu correo y hazlo
            </div>
            `;
    }
  });*/
}

function observador(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      //aparece(user);
      cambiarLog(user);
      console.log("El usuario está logeado");
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
      console.log("El usuario no está logeado");
    }
  });
}
observador();
function aparece(user){
  var user = user;
  //var contenido = document.getElementById('contenido');
  /*if(user.emailVerified){
    contenido.innerHTML = `
    <p> Bienvenido </p>
    <button onClick='cerrar()'> cerrar sesion</button>  
    `;
  }*/
}
function cerrar(){
  firebase.auth().signOut()
  .then(function(){
      console.log('Saliendo...')
      document.location.href = 'login.html?#/';
  })
  .catch(function(error){
    console.log(error)
  })

}

function verificar(){
  var user = firebase.auth().currentUser;
  var alerta = document.getElementById('alerta');

  user.sendEmailVerification().then(function() {
    // Email sent.
    
    alerta.innerHTML = `
      <div class="mt-3"></div>
      <div class="alert alert-success" role="alert">
      Gracias! Verifica tu cuenta en tu correo electrónico.
      </div>
    `;
      
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });

}

function cambiarLog(user) {
  var user =user;
  var loginBTN = document.getElementById('login');

  if (loginBTN.innerHTML == 'Inicia Sesion'){
    loginBTN.innerHTML = 'Cerrar Sesion';
  }else {
    loginBTN.innerHTML = 'Inicia Sesion';
  }

}
function cambioPass(){
  var emailP = document.getElementById('emailP').value;
  //emailAddress = String(emailAddress);

  var auth = firebase.auth();
 

  auth.sendPasswordResetEmail(emailP).then(function() {
    // Email sent.
    console.log('correo enviado')
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
}

