const sec = [
  document.querySelector('#login'),
  document.querySelector('#usuario-logado'),
  document.querySelector('#minhas-horas'),
  document.querySelector('#add-atividade')
];

function carregarDados(u){
  if(u){

  } else{

  }
}

function listarAtividadesDoUsuario(u){
    const grupos = [
      [db.collection("usuarios/"+u.uid+"/atividades").where("grupo", "==", 1)],
      [db.collection("usuarios/"+u.uid+"/atividades").where("grupo", "==", 2)],
      [db.collection("usuarios/"+u.uid+"/atividades").where("grupo", "==", 3)],
      [db.collection("usuarios/"+u.uid+"/atividades").where("grupo", "==", 4)],
      [db.collection("usuarios/"+u.uid+"/atividades").where("grupo", "==", 5)],
      [db.collection("usuarios/"+u.uid+"/atividades").where("grupo", "==", 6)],
      [db.collection("usuarios/"+u.uid+"/atividades").where("grupo", "==", 7)]
    ];
    return grupos;
}



function preencherFormGrupos(array){
  const sel = document.querySelector("#sel-grupo");
  const sel2 = document.querySelector("#sel-grupo-horas");

  sel.innerHTML = '<option value="invalida" selected disabled hidden>Selecione um grupo</option>';
  sel2.innerHTML = '<option value="invalida" selected disabled hidden>Selecione um grupo para listar as atividades feitas</option>';

  for (var i = 0; i < array.length; i++) {
    sel.innerHTML += '<option value="'+(i+1)+'">'+array[i].descricao+'</option>';
    sel2.innerHTML += '<option value="'+(i+1)+'">'+array[i].descricao+'</option>';
  }
}

function preencherFormAtividades(array){
  const sel = document.querySelector("#sel-atividade");

  sel.innerHTML = '<option value="invalida" selected disabled hidden>Selecione uma atividade</option>';

  for (var i = 0; i < array.length; i++) {
    sel.innerHTML += '<option value="'+(i+1)+'">'+array[i].descricao+'</option>';
  }
}


alterarTela("login");
function alterarTela(tela){
  switch (tela) {
    case "login":
      for (var i = 0; i < sec.length; i++) {
        if (i==0) sec[i].style.display = "block";
        else sec[i].style.display = "none";
      }
      break;
    case "usuario-logado":
      for (var i = 0; i < sec.length; i++) {
        if (i==1) sec[i].style.display = "block";
        else sec[i].style.display = "none";
      }
      break;
    case "minhas-horas":
      for (var i = 0; i < sec.length; i++) {
        if (i==2) sec[i].style.display = "block";
        else sec[i].style.display = "none";
      }
      break;
    case "add-atividade":
      for (var i = 0; i < sec.length; i++) {
        if (i==3) sec[i].style.display = "block";
        else sec[i].style.display = "none";
      }
}}

function adicionarAtividade(){
  alterarTela("add-atividade");
}

function atividadeAdicionada(){
  const f = document.querySelector("#form-cadastro-atividade");
  const g = document.querySelector("#sel-grupo");
  const a = document.querySelector("#sel-atividade");
  const h = document.querySelector("#atividade-horas");
  let user = auth.currentUser;
  if(user){
    db.collection("usuarios/"+user.uid+"/atividades").add({
      grupo: g.value,
      atividade: a.value,
      descricao: a.innerHTML,
      horas: h.value
    }).then( ()=>{
      alterarTela("minhas-horas");
      f.reset();
    });
  } else{
    alert("favor logar para adicionar atividade");
  }
}







function submeter(form){

  if(form.grupo.value == "invalido")
    alert("Você precisa selecionar um grupo");
  else
    if (form.atividade.value == "invalida")
      alert("Você precisa selecionar uma atividade");
    else{
      if (form.horas.value <= 0)
        alert("Você precisa adicionar horas");
      else
        addAtividade(form.grupo.value, form.atividade, form.horas);
    }
  return false;
}

function addAtividade(grupo, atividade, horas){
  var grupo = document.getElementById(grupo); //ul
  grupo.innerHTML += '<li  class="' + grupo + 'atividade">' + atividade.value + ' (' + horas.value + ')</li>'
}

function gerarPDF2() {
		const filename  = 'formulario.pdf';
    var tabela = document.querySelector('#formulario');
    var larguraEmPixel = tabela.offsetWidth;
    var alturaEmPixel = tabela.offsetHeight;
    var alturaEmMilimetros = (200/larguraEmPixel)*alturaEmPixel;
		html2canvas(tabela).then(canvas => {
			let pdf = new jsPDF('p', 'mm', 'a4');
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 5, 5, 200, alturaEmMilimetros);
			pdf.save(filename);
		});
	}

  function gerarPDF() {
      var tabela = document.querySelector('#formulario-de-atividades-complementares');
  		html2canvas(tabela).then(canvas => {
        var myImage = canvas.toDataURL();
        downloadURI(myImage, "cartao-virtual.png");
  		});
  }

  var downloadURI = function(uri, name) {
      var link = document.createElement("a");

      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      clearDynamicLink(link);
  }

function escreverOpcao(value, texto){
  var resposta = '<option value=' + value + '>' + texto + '</option>'; //sem o "" no value <- lembrar pra caso de erro
    return resposta;
}


listarGruposForm();


///////////////////////////////////////////////////////////////////////
