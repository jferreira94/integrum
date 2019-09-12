function submeter(form){

  if (form.atividade.value == "invalida")
    alert("Você precisa selecionar uma atividade");
  else
    if(form.horas.value == 0)
      alert("Você precisa adicionar horas");
    else
      addTabela(form.atividade, form.horas);

  return false;
}

function addTabela(atividade, horas){
  var add= "<tr><td colspan='9'>" + atividade.value + "</td><td colspan='1'>" + horas.value + "</td></tr>";
  document.getElementById("teste").innerHTML += add;
}

function gerarPDF() {
		const filename  = 'formulario.pdf';
    var tabela = document.querySelector('#teste');
    var larguraEmPixel = tabela.offsetWidth;
    var alturaEmPixel = tabela.offsetHeight;
    var alturaEmMilimetros = (200/larguraEmPixel)*alturaEmPixel;
		html2canvas(tabela).then(canvas => {
			let pdf = new jsPDF('p', 'mm', 'a4');
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 5, 5, 200, alturaEmMilimetros);
			pdf.save(filename);
		});
	}
