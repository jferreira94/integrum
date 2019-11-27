function login(){
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
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

function gerarPDF() {
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


function escreverOpcao(value, texto){
  var resposta = '<option value=' + value + '>' + texto + '</option>'; //sem o "" no value <- lembrar pra caso de erro
    return resposta;
}

// seleção de atividades
function mudarAtividades(index){
  var atividades = document.getElementById("form_atividade");
  var outra = document.getElementById("outra_atividade");
  atividades.innerHTML = '<option value="invalida" disabled selected hidden>Selecione uma atividade</option>';

  switch (index) {
    case 1:
      atividades.style.display = "block";
      outra.style.display = "none";
      atividades.innerHTML +=
      escreverOpcao('Monitoria de Iniciação à Docência / Monitoria de Projetos', 'Monitoria de Iniciação à Docência / Monitoria de Projetos (96h)') +
      escreverOpcao('Bolsa de Extensão', 'Bolsa de Extensão (96h)') +
      escreverOpcao('Participação em docência no ensino fundamental e médio', 'Participação em docência no ensino fundamental e médio (64h)') +
      escreverOpcao('Iniciação científica/PET', 'Iniciação científica/PET (96h)') +
      escreverOpcao('Projeto social', 'Projeto social (32h)') +
      escreverOpcao('Curso de extensão (exceto curso de línguas nas Casas de Cultura)', 'Curso de extensão (exceto curso de línguas nas Casas de Cultura) (64h)') +
      escreverOpcao('Atividades de extensão oferecidas por outras instituições', 'Atividades de extensão oferecidas por outras instituições (32h)') +
      escreverOpcao('Grupo de Estudo / Aprendizagem cooperativa', 'Grupo de Estudo / Aprendizagem cooperativa (32h)') +
      escreverOpcao('Participação em Projeto de Pesquisa', 'Participação em Projeto de Pesquisa (20h)');
      break;
    case 2:
      atividades.style.display = "block";
      outra.style.display = "none";
      atividades.innerHTML +=
      escreverOpcao('Exposição', 'Exposição (12h)') +
      escreverOpcao('Visita ao Museu', 'Visita ao Museu (12h)') +
      escreverOpcao('Peça de teatro', 'Peça de teatro (12h)') +
      escreverOpcao('Recital', 'Recital (12h)') +
      escreverOpcao('Cine cultural', 'Cine cultural (12h)') +
      escreverOpcao('Campeonatos Esportivos', 'Campeonatos Esportivos (4h)') +
      escreverOpcao('Produção cultural (curtas, musicais, peças teatrais etc.)', 'Produção cultural (curtas, musicais, peças teatrais etc.) (32h)');
      break;
    case 3:
        atividades.style.display = "block";
        outra.style.display = "none";
        atividades.innerHTML +=
        escreverOpcao('Palestras e/ou mini-cursos específicos da área de atuação do curso - ministrados', 'Palestras e/ou mini-cursos específicos da área de atuação do curso - ministrados (32h)') +
        escreverOpcao('Palestras e/ou mini-cursos específicos da área de atuação do curso - participação', 'Palestras e/ou mini-cursos específicos da área de atuação do curso - participação (24h)') +
        escreverOpcao('Participações em eventos', 'Participações em eventos (20h/evento)(32h)') +
        escreverOpcao('Organização de Palestras e Eventos', 'Organização de Palestras e Eventos (32h)');
      break;
    case 4:
      atividades.style.display = "block";
      outra.style.display = "none";
      atividades.innerHTML +=
      escreverOpcao('Curso de aperfeiçoamento técnico', 'Curso de aperfeiçoamento técnico (20h/curso)(40h)') +
      escreverOpcao('Certificação específica', 'Certificação específica (40h/módulo)(64h)') +
      escreverOpcao('Visita técnica externa', 'Visita técnica externa (12h)') +
      escreverOpcao('Vivência profissional – área correlata ao curso', 'Vivência profissional – área correlata ao curso (64h)') +
      escreverOpcao('Estágio supervisionado não obrigatório', 'Estágio supervisionado não obrigatório (64h)') +
      escreverOpcao('Vivência profissional – outras áreas', 'Vivência profissional – outras áreas (4h/semestre)(20h)') +
      escreverOpcao('Curso de língua estrangeira', 'Curso de língua estrangeira (20% da carga horária)') +
      escreverOpcao('Disciplinas de outros cursos ou instituições de ens. superior', 'Disciplinas de outros cursos ou instituições de ens. superior (20h/disciplina)');
      break;
    case 5:
      atividades.style.display = "block";
      outra.style.display = "none";
      atividades.innerHTML +=
      escreverOpcao('Publicação de trabalhos científicos - completo', 'Publicação de trabalhos científicos - completo (48h/trabalho)(96h)') +
      escreverOpcao('Publicação de trabalhos científicos – resumo', 'Publicação de trabalhos científicos – resumo (exceto E.U. da UFC) (20h/trabalho)(60h)') +
      escreverOpcao('Monografia publicada em outro curso', 'Monografia publicada em outro curso (20h)') +
      escreverOpcao('Projeto de desenvolvimento de produto', 'Projeto de desenvolvimento de produto (32h/projeto)(3 projetos)');
      break;
      case 6:
        atividades.style.display = "block";
        outra.style.display = "none";
        atividades.innerHTML +=
        escreverOpcao('Vivência de Gestão', 'Vivência de Gestão (incluindo representações) (48h)');
        break;
    case 7:
      atividades.style.display = "none";
      outra.value = "";
      outra.style.display = "block";
      break;
    default:
      atividades.style.display = "none";
      outra.style.display = "none";
  }
}



///////////////////////////////////////////////////////////////////////
