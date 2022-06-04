var input = document.getElementById("msg");

document.getElementById("butao").addEventListener("click", (() => {
    enviarMSG();
}));

document.getElementById("botao").addEventListener("click", (() => {

    removerDB(document.getElementById("key").value);
}));
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        enviarMSG();
    }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, set, push, remove, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCMqDHkB1GoicDVJUppgXhFQFZVqhI2x0Q",
    authDomain: "chat-di-cria.firebaseapp.com",
    databaseURL: "https://chat-di-cria-default-rtdb.firebaseio.com",
    projectId: "chat-di-cria",
    storageBucket: "chat-di-cria.appspot.com",
    messagingSenderId: "130787943537",
    appId: "1:130787943537:web:110d41ec09e632dc6167d0"
  };

const app = initializeApp(firebaseConfig);

var db = getDatabase(app);
const dbRef = ref(db, 'exemplo');

var meuhtml = "";
var key = "";

var nomeUsuario = prompt("Digite seu nome");

if(nomeUsuario == "" || nomeUsuario != nomeUsuario){
    nomeUsuario = "Anon"
}

onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    meuhtml = "";
    snapshot.forEach(function (childSnapshot) {
        key = childSnapshot.key;
        if(nomeUsuario == childSnapshot.val().nome){
        meuhtml += '<div class="msg"><div class="self"><div class="eu"><b>' + childSnapshot.val().nome+ '</i></b><span>' + childSnapshot.val().mensagem + '<span><br><div class="hour"> Enviado às ' + childSnapshot.val().horario + '</span><div class="botaoDel" onclick=deletar("'+`${key}`+'"); id="'+`${key}`+'" style="padding:4px; cursor:pointer">DELETAR</div></div></div></div></div>';



        }
        else{
            meuhtml += '<div class="msg"><div class="content"><div class="outros"><b>' + childSnapshot.val().nome + '</i></b><span>' + childSnapshot.val().mensagem + '<span><br><div class="hour"> Enviado às ' + childSnapshot.val().horario + '</span></div></div></div></div>';
        }
});
atualizarHTML();  
});

function enviarMSG() {

    var datahj = new Date();
    var hora = datahj.getHours() + ":" + datahj.getMinutes() + ":" + datahj.getSeconds()

    push(ref(db, 'exemplo'), {
        nome: nomeUsuario,
        horario: hora,
        data: datahj,
        mensagem: document.getElementById("msg").value
    });

    document.getElementById("msg").value = "";
}

function atualizarHTML() {
    document.getElementById("conteudo").innerHTML = meuhtml
    ajustarScroll();
}

function ajustarScroll() {
    var divConteudo = document.getElementById("conteudo");
    divConteudo.scrollTop = divConteudo.scrollHeight;
}

function removerDB(butao){
    remove(ref(db, 'exemplo/' + butao));
}

