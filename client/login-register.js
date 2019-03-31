function registrar(){
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirmPassword').value;
  console.log(password);
  console.log(confirmPassword);
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
        window.alert("Ingrese una contraseña de más de 6 caracteres");
      }
      if (errorCode == "auth/email-already-in-use") {
        window.alert("Este correo ya fue vinculado auna cuenta");
      }
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
  } else{
    window.alert("Las contraseña no es igual");
  }
  
  
}

function ingresar(){

  var emailL = document.getElementById('emailL').value;
  var passwordL = document.getElementById('passwordL').value;


  firebase.auth().signInWithEmailAndPassword(emailL, passwordL)
  .then(function(){
    document.location.href = 'index.html';
  })

  
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == "auth/invalid-email") {
      window.alert("Ingrese un usuario valido");
  }
    if (errorCode == "auth/user-not-found") {
        window.alert("Usuario no encontrado");
    }
    if (errorCode == "auth/wrong-password") {
        window.alert("Contrasena incorrecta");
    }
    // ...
  });
}

function observador(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      //aparece(user);
      cambiarLog(user);
      console.log("existe usuario activo");
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      console.log('*****************************');
      console.log(user.emailVerified);
      console.log('*****************************');
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
      console.log("no existe usuario activo");
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

  user.sendEmailVerification().then(function() {
    // Email sent.
    window.alert("Verifica tu cuenta en tu correo electrónico");
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

