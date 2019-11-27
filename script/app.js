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
var firestore = firebase.firestore();



function exibir(ref){
    const docRef = firestore.doc(ref);
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

exibir2(firestore.doc('atividades/g1a1'));
/*
console.log(exibir('atividades/g1a2'));
console.log(exibir('atividades/g1a3'));
console.log(exibir('atividades/g1a4'));
*/
