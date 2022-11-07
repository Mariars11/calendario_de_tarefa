//variaveis globais
var buttonNovaTarefa = document.getElementById('buttonNovaTarefa');
var buttonCancelar = document.getElementById('buttonCancelar');
var novaTarefa = document.getElementById('novaTarefa');
var formNovaTarefa = document.getElementById('formNovaTarefa');
var inputNomeTarefa = document.getElementById('nomeTarefa');
var inputDataTarefa = document.getElementById('dataTarefa');
var divMensagemErro = document.getElementById('mensagemErro');
var inputDescricao = document.getElementById('descricao');
var tabelaTarefas = document.getElementById('tabelaTarefas');

var listaTarefas = [];
var editarId = null;

function atualizarTabelaTarefas(){
    if(listaTarefas.length === 0){
        tabelaTarefas.innerHTML = '<tr><td colspan="4">Nenhuma Tarefa</td></tr>'
        return;
    }
    tabelaTarefas.innerHTML = '';
    for(var i = 0; i < listaTarefas.length; i++){
        var tarefa = listaTarefas[i];
        var linha = document.createElement('tr');
        var celulaNome = document.createElement('td');
        var celulaData = document.createElement('td');
        var celulaDescricao = document.createElement('td');
        var celula_Acoes = document.createElement('td');
        var botaoExcluir = document.createElement('button');
        botaoExcluir.setAttribute('data-tarefaexcluir', i);
        var botaoEditar = document.createElement('button');
        botaoEditar.setAttribute('data-tarefaeditar', i);
        botaoExcluir.classList.add('btn');
        botaoExcluir.classList.add('btn-outline-danger');
        botaoEditar.classList.add('btn');
        botaoEditar.classList.add('btn-outline-primary');
        botaoExcluir.addEventListener('click', removerTarefa);
        botaoEditar.addEventListener('click', editarTarefa);

        celulaNome.innerText = tarefa.nome;
        celulaData.innerText = tarefa.data;
        celulaDescricao.innerText = tarefa.descricao;
        botaoExcluir.innerText = "Remover";
        botaoEditar.innerText = "Editar";
        celula_Acoes.appendChild(botaoEditar);
        celula_Acoes.appendChild(botaoExcluir);

        linha.appendChild(celulaNome);
        linha.appendChild(celulaData);
        linha.appendChild(celulaDescricao);
        linha.appendChild(celula_Acoes);
        tabelaTarefas.appendChild(linha);
    }
}

function removerTarefa(event){
    var posicao = event.target.getAttribute('data-tarefaexcluir');
    listaTarefas.splice(posicao, 1);
    atualizarTabelaTarefas();
}
//nao consegui implementar por completo
function editarTarefa(event){
    document.getElementById('salvar').innerText = 'Atualizar'
    var posicao = event.target.getAttribute('data-tarefaeditar');
    mostrarNovaTarefa();
    document.getElementById('nomeTarefa').value = listaTarefas[posicao].nome;
    //document.getElementById('dataTarefa').value = listaTarefas[posicao].(Date.parse(data));
    document.getElementById('descricao').value = listaTarefas[posicao].descricao;

}

function limparNovaTarefa() {
    // ao clicar no botao cancelar:
    //limpa os campos
    document.getElementById('salvar').innerText = 'Salvar'
    inputNomeTarefa.value = '';
    inputDataTarefa.value = '';
    inputDescricao.value = '';
    //retira a borda vermelha
    inputNomeTarefa.classList.remove('is-invalid');
    inputDataTarefa.classList.remove('is-invalid');
    //retira a mensagem de erro
    divMensagemErro.classList.add('d-none');
    divMensagemErro.innerHTML = '';
}

function mostrarNovaTarefa() {
    novaTarefa.classList.remove('d-none');
}

function ocultarNovaTarefa() { 
    limparNovaTarefa();
    novaTarefa.classList.add('d-none');
}

function novaTarefaValida(nomeTarefa, dataTarefa) {
    var validacaoOk = true;
    var erro = '';
    if (nomeTarefa.trim().length === 0) { //trim: retorna a string limpa (sem espaço ou tabulação)
        erro = 'O nome da tarefa é obrigatório!';
        inputNomeTarefa.classList.add('is-invalid');
        validacaoOk = false;
    } else {
        inputNomeTarefa.classList.remove('is-invalid');
    }
    var timestampTarefa = Date.parse(dataTarefa);
    var timestampAtual = (new Date()).getTime();
    //validação da data (dia e hora)
    if (isNaN(timestampTarefa) || timestampTarefa < timestampAtual) {
        if (erro.length > 0) {
            erro += '<br>'
        }
        erro += 'A data da tarefa é obrigatória e deve estar no futuro!';
        inputDataTarefa.classList.add('is-invalid');
        validacaoOk = false;
    } else {
        inputDataTarefa.classList.remove('is-invalid');
    }

    if (!validacaoOk) {
        divMensagemErro.innerHTML = erro;
        divMensagemErro.classList.remove('d-none');
    } else {
        divMensagemErro.classList.add('d-none');
    }

    return validacaoOk;
}

function salvarNovaTarefa(event) {
    event.preventDefault(); //evita que o evento padrao ocorra: enviar para o servidor
    var nomeTarefa = inputNomeTarefa.value;
    var dataTarefa = inputDataTarefa.value;
    var descricao = inputDescricao.value;
    if (novaTarefaValida(nomeTarefa, dataTarefa)) {
            console.log('Tarefa é válida!');
                listaTarefas.push({
                    nome: nomeTarefa,
                    data: new Date(dataTarefa),
                    descricao: descricao,
                });
                atualizarTabelaTarefas();
                ocultarNovaTarefa();
    } else {
        console.log('Tarefa é inválido!');
    }
}

buttonNovaTarefa.addEventListener('click', mostrarNovaTarefa);
buttonCancelar.addEventListener('click', ocultarNovaTarefa);
formNovaTarefa.addEventListener('submit', salvarNovaTarefa);
window.addEventListener('load', atualizarTabelaTarefas);