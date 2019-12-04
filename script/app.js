// Initialize Firebase
var config = {
  apiKey: "AIzaSyBJxBNuXiEauS-aZ4aKfaA5HDDWYNGWj3U",
  authDomain: "integrum-7eaa8.firebaseapp.com",
  databaseURL: "https://integrum-7eaa8.firebaseio.com",
  projectId: "integrum-7eaa8",
  storageBucket: "integrum-7eaa8.appspot.com",
  messagingSenderId: "446362697550",
  appId: "1:446362697550:web:9e680b01f48580aecbe81f"
};
firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
  carregarDados(user);
  if(user){
    document.querySelector("#menuLogin").style.display = "none";
    document.querySelector("#menuInicio").style.display = "inline-block";
    document.querySelector("#menuHoras").style.display = "inline-block";
} else{
    document.querySelector("#menuLogin").style.display = "inline-block";
    document.querySelector("#menuInicio").style.display = "none";
    document.querySelector("#menuHoras").style.display = "none";
}
});


function cadastrarUsuario(email, senha){
    auth.createUserWithEmailAndPassword(email, senha).then(cred => {
      alterarTela('usuario-logado');
      formularioDeCadastro.reset();
      console.log("usuário cadastrado: ", cred.user);
  });
}

function login(){
    const form = document.querySelector('#form-login');
    const email = form['email'].value;
    const senha = form['senha'].value;
    auth.signInWithEmailAndPassword(email, senha).then(cred => {
      alterarTela('usuario-logado');
      form.reset();
      console.log(cred.user)
  });
}

function carregarDados(){


}


//db.setings({timestampsInSnapshots: true});

function exibir(ref){
    const docRef = db.doc(ref);
    docRef.get().then(function(doc){
    if(doc && doc.exists){
      const myData = doc.data();
      console.log(myData.teste);
      console.log(docRef);
    }
  }).catch(function(error) {console.log(error)});
}

function exibir2(docRef){
    docRef.get().then(function(doc){
    if(doc && doc.exists){
      const myData = doc.data();
      console.log(myData);
      exibir2(myData.teste[2]);
    }
  }).catch(function(error) {console.log(error)});
}

function listarGruposForm(){
  let grupos = [];
  db.collection("grupos")
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              grupos.push(doc.data());
          });
          preencherFormGrupos(grupos);
      })
      .catch(function(error) {
          console.log("Erro ao listar Grupos: ", error);
      });
}

function listarAtividadesForm(){
  let grupoid = document.querySelector("#sel-grupo").value;
  let atividades = [];
  db.collection("grupos/"+grupoid+"/atividades")
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              atividades.push(doc.data());
          });
          preencherFormAtividades(atividades);
      })
      .catch(function(error) {
          console.log("Erro ao listar Atividades: ", error);
      });
}

function listarAtividadesFeitas(g) {
  let atividades = [];
  let u = auth.currentUser;
  const div = document.querySelector("#atividades-listadas");

    db.collection("usuarios/"+u.uid+"/atividades").where("grupo", "==", g)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            atividades.push(doc.data());
        });
        div.innerHTML = "";
        for (var i = 0; i < atividades.length; i++) {
          div.innerHTML += '<div class="template-atividade"><span>'+atividades[i].descricao+'</span><p>'+atividades[i].horas+' horas</p></div>';
        }
      console.log(atividades);
    })
    .catch(function(error) {
        console.log("Erro listarAtividades(): ", error);
    });

}

/*
exibir2(db.doc('atividades/g1a1'));
console.log(exibir('atividades/g1a2'));
console.log(exibir('atividades/g1a3'));
console.log(exibir('atividades/g1a4'));
*/
