// Abrir/fechar menu
function menuTrigger() {
    $('.menu').toggleClass('menu--open');
    $('.btn-menu').toggleClass('menu--open');
    $('.menu-content').toggleClass('menu--open');
    $('.btn-openAsideForm').toggle();
}

// Contato input
function contatoTipoChange(el) {
    let valor = $(el).val();
    let inputNextContact = $(el).parents('.linha').find('.inputForm[data-input]');
    switch (valor) {
        case 'Celular':
            $(inputNextContact).removeClass('tel');
            $(inputNextContact).attr('placeholder', '(00) 0.0000-0000');
            $(inputNextContact).attr('type', 'text');
            break;
        case 'Telefone':
            $(inputNextContact).removeClass('cel');
            $(inputNextContact).attr('placeholder', '(00) 0000-0000');
            $(inputNextContact).attr('type', 'text');
            break;
        case 'Email':
            $(inputNextContact).removeClass('cel');
            $(inputNextContact).removeClass('tel');
            $(inputNextContact).attr('placeholder', 'example@hotmail.com.br');
            $(inputNextContact).attr('type', 'email');
            break;
    }

}
// Fechar menu lateral
function closeForm(el) {
    var form = $(el).parents('form');
    resetForm(form);
    $(el).parents('.asideForm').removeClass('asideForm--open')
    $('.openAsideForm-content').show(400);
}

// Limpar campos do form
function resetForm(form) {
    $(form)[0].reset();
}

// Cadastrar unidade
function novaUnidade(el) {
    var form = $(el).parents('.asideForm').find('form');
    resetForm(form);
    openAsideForm();
}

// Abri menu lateral
function openAsideForm() {
    $('.asideForm').addClass('asideForm--open');
    $('.openAsideForm-content').hide(400);
}

// Adicionar novo contato

function createLinhaImagem(el) {
    $(el).parent('.imagens').siblings('.camposImagem').append(`
        <div class="linha">
            <div class="input-container col-xl-11 col-lg-11 col-md-11 col-sm-11 col-11">
                <p class="text-error"></p>
                <div class="inputFile">
                    <div class="inputFile__image">
                        <button type="button" class="btn btn-closeImagem" onclick="closeImagem(this)">
                            <i class="fas fa-times"></i>
                        </button>
                        <img src="https://s2.glbimg.com/of-wm12tGeAcF_chWnw-0wlWP6E=/0x0:695x522/695x522/s.glbimg.com/po/tt/f/original/2014/02/13/inspiron-3000-e-nova-linha-de-desktop-compacto-com-processador-haswell.jpg"
                            class="inputFile__image-img">
                        <p onclick="ampliarImagem(this)">
                            <span style="margin-right: 5px;"><i
                                    class="fas fa-search-plus"></i></span> Ampliar

                        </p>
                    </div>
                    <label for="image-1" class="inputFile__label">
                        <span class="nomeArquivo">Selecione uma imagem...</span>
                    </label>
                    <input type="file" name="image-1" id="image-1" class="inputForm inputFile__label-input" onchange="readURL(this)">
                </div>

            </div>
            <div class="input-container">
                <button type="button" class="btn btn-excluirLinha" onclick="deleteLinhaContato(this)" title="Remover linha">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    `);
    ordenarListaContatos($(el).parent('.imagens').siblings('.camposImagem'))
}


function ordenarListaContatos(parent) {
    $(parent).children('.linha').each((index, el) => {
        $(el).find('.inputForm').each((i, input) => {
            let idAttribute = $(input).attr('id').split('-')[0];
            $(input).attr('id', `${idAttribute}-${index}`)
            $(input).attr('name', `${idAttribute}[${index}]`);
            $(input).siblings('.inputFile__label').attr('for', `${idAttribute}-${index}`)

        });
    });
}

function deleteLinhaContato(el) {
    $(el).parents('.linha').remove();
    ordenarListaContatos($('.camposContato'));
}


function ordenarPorColuna(el) {
    if ($(el).is('.asc')) {
        $(el).removeClass('asc');
        $(el).addClass('desc selected');
        sortOrder = -1;
    } else {
        $(el).addClass('asc selected');
        $(el).removeClass('desc');
        sortOrder = 1;
    }

    $(el).siblings().removeClass('asc selected');
    $(el).siblings().removeClass('desc selected');
    var arrData = $(el).parents('.table').find('tbody > tr:has(td)').get(); // Pega todas as linhas da tabela que possuem colunas

    arrData.sort(function(a, b) {
        var val1 = $(a).children('td').text().toUpperCase();
        var val2 = $(b).children('td').text().toUpperCase();

        if ($.isNumeric(val1) && $.isNumeric(val2)) {
            return sortOrder == 1 ? val1 - val2 : val2 - val1;
        } else {
            return (val1 < val2) ? -sortOrder : (val1 > val2) ? sortOrder : 0;
        }
    });

    $.each(arrData, function(index, row) {
        $(el).parents('.table').find('tbody').append(row);
    });
}

$('.cel').mask('(00) 9.0000-0000');
$('.tel').mask('(00) 0000-0000');
$('.cnpj').mask('00.000.000/0000-00');
$('.cpf').mask('000.000.000-00');
$('.rg').mask('00.000.000-00');
$('.cep').mask('00000-000');


$('.table:not(.table-dashboard) tbody td').hover(function() {
    let columnAtribute = $(this).attr('column');
    $('td').removeClass('td-hover');
    $('.table tbody td[column=' + columnAtribute + ']').addClass('td-hover');
}, function() {
    $('td').removeClass('td-hover');
});

$('.table tbody td').hover(function() {
    $(this).parent().addClass("hover");
    if ($(this).parent().has('td[rowspan]').length == 0) {
        $(this).parent().prevAll('tr:has(td[rowspan]):first').find('td[rowspan]').addClass("hover");
    }

}, function() {
    $(this)
        .parent()
        .removeClass("hover")
        .prevAll('tr:has(td[rowspan]):first')
        .find('td[rowspan]')
        .removeClass("hover");

});

function selectLinha(el, id) {
    let linhasLen = $(el).parents('tbody').find('.checkboxList-input:checked').length;
    if (linhasLen > 0) {
        $(el).parents('.table').find('.subheader').slideDown(0);
    } else {
        $(el).parents('.table').find('.subheader').slideUp(0);
    }
    let checked = $(el).prop('checked');
    let rowspan = $(el).parents('td').next('td').attr('rowspan');
    if (checked) {
        $(el).parents('tr').addClass('selected')
    } else {
        $(el).parents('tr').removeClass('selected')
    }
    $(el).parents('.table').find('.qtd-linhas').html(`${linhasLen} Linhas selecionadas`);

}

function excluirLinha(el) {
    let linhasLen = $(el).parents('.table').find('.checkboxList-input:checked').length;
    $(el).parents('.table').find('.checkboxList-input:checked').each(function() {
        console.log($(this).parents('tr'));
        $(this).parents('tr').remove();
    });

    linhasLen = $(el).parents('.table').find('.checkboxList-input:checked').length;
    if (linhasLen > 0) {
        $(el).parents('.table').find('.subheader').slideDown(0);
    } else {
        $(el).parents('.table').find('.subheader').slideUp(0);
    }
    $(el).parents('.table').find('.qtd-linhas').html(`${linhasLen} Linhas selecionadas`);
}


function editLinha(el) {
    let form = $('form');
    resetForm(form);
    openAsideForm();

    $('#NumeroImobilizado').val('ID-02847');
    $('#Unidade_Id option[value="UnidadeX"]').attr('selected', true);
    $('#Cliente_Id option[value="ClienteX"]').attr('selected', true);
    $('#Area').val('E1 | 1º ANDAR | DIRETORIA DME');
    $('#PlacaAntiga').val('501326');
    $('#PlacaNome').val(' - ');
    $('#CentroCusto').val('MW08070047');
    $('#DescricaoCentroCusto').val('Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut at et perspiciatis placeat quaerat quidem aliquam deleniti, est, asperiores ducimus molestias consectetur quae explicabo tempore repellat amet, repellendus excepturi. Maiores!');
    $('#ContaContabil').val('');
    $('#DescricaoContaContabil').val('Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut at et perspiciatis placeat quaerat quidem aliquam deleniti, est, asperiores ducimus molestias consectetur quae explicabo tempore repellat amet, repellendus excepturi. Maiores!');
    $('#DescricaoFinal').val('CADEIRA ESTR PVC ASS. TECIDO COM BRACO COM ROD');
    $('#DataAquisicao').val(new Date().toISOString().split('T')[0]);
    $('#ValorAquisicao').val('00,00');
    $('#Depreciacao').val('');
    $('#Residual').val('');

}
// Pesquisa CEP
function pesquisaCEP(el) {
    $('.cep-loading').fadeIn(400);
    let cep = $(el).val().replace('-', '');

    if (cep.trim() == '') {
        $(el).parent('.input-container').find('p.text-error').text('Preencha esse campo para fazer a pesquisa por CEP');
        $('.cep-loading').hide(0);
        return;
    }
    $.ajax({
        url: `https://viacep.com.br//ws/${cep}/json/`,
        type: 'GET',
        success: function(data) {
            if (data.erro == true) {
                $(el).parent('.input-container').find('p.text-error').text('Este CEP é inválido!');
            } else {
                populaEndereco(data)
                $('.cep-loading').hide(0);
            }


        },
        error: function(data) {
            $(el).parent('.input-container').find('p.text-error').text('Este CEP é inválido!');
            $('.cep-loading').hide(0);
        },
    })
}

function populaEndereco(json) {
    if (json.logradouro == '' || json.logradouro == undefined) {
        $('#Logradouro').val('Logradouro');
    } else {
        let logradouroArray = json.logradouro.split(' ');
        let logradouroTipo = logradouroArray[0];

        if (logradouroArray[1] == 'Particular' || logradouroArray[1] == 'Sanitária') {
            logradouroTipo = logradouroArray[0] + ' ' + logradouroArray[1];
            logradouroArray.splice(0, 1)
            logradouroArray.splice(0, 1)
        }
        if (logradouroArray.length < 1) {
            $('#Logradouro').val('Logradouro')
        } else {
            $('#Logradouro').val(logradouroArray.join(' '))
        }
        $('#LogradouroTipo_Id option').attr('selected', false);
        $('#LogradouroTipo_Id option[value="' + logradouroTipo + '"]').attr('selected', true);
        $('#LogradouroTipo_Id').trigger('change')
        $('#LogradouroTipo_Id').change();
    }

    if (json.bairro == '' || json.bairro == undefined) {
        $('#Bairro').val('Bairro');
    } else {
        $('#Bairro').val(json.bairro);
    }

    if (json.cidade == '' || json.cidade == undefined) {
        $('#Cidade').val('Cidade');
    } else {
        $('#Cidade').val(json.cidade);
    }

    $('#Complemento').val(json.complemento);

    $('#UF option').attr('selected', false);
    $('#UF option[value="' + json.uf + '"]').attr('selected', true);
    $('#UF').trigger('change')
    $('#UF').change();

}

// Campos obrigatórios
$('.inputForm[required]').focusout(function() {
    if ($(this).val().trim() == '' || $(this).val() == undefined) {
        $(this).parent('.input-container').find('p.text-error').text('Esse campo é obrigatório!')
    } else {
        $(this).parent('.input-container').find('p.text-error').text('')

    }
})

// Remove sinais de campos CPJCNPJ, CEP, etc 
function formataCampos(e, el) {
    e.preventDefault();

    // CPFCNPJ
    let campo = $(el).parents('form').find('#CPFCNPJ').val().replaceAll('.', '').replaceAll('/', '').replaceAll('-', '');
    $(el).parents('form').find('#CPFCNPJ').val(campo);

    // CPFCNPJ
    campo = $(el).parents('form').find('#CEP').val().replaceAll('.', '').replaceAll('/', '').replaceAll('-', '');
    $(el).parents('form').find('#CEP').val(campo);

    $(el).parents('form').submit();
}


// Barra de Progresso
function fnProgressBarLoading() {
    NProgress.start();
    window.addEventListener("load", function(event) {
        NProgress.done();
    });
}
fnProgressBarLoading()

function fecharModal(el) {
    console.log($(el))
    $(el).parents('.modal').removeClass('modal--open');
    $('body').removeClass('modal--open');
}

function openModal() {
    $('.modal').removeClass('modal--open');
    $('.modal').addClass('modal--open');
    $('body').addClass('modal--open');

    var myChart = new Chart('Aquisicao', {
        type: 'pie',
        data: {
            labels: ['Edifícios', 'Máquinas/Veículos/Hardware', 'Infra-estrutura', 'Maquinas e Equipamentos'],
            datasets: [{
                label: 'Valor Aquisição',
                data: [12, 19, 3, 5],
                backgroundColor: [
                    '#11009A',
                    '#004BD3',
                    '#0077F0',
                    '#009FF0'
                ],
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: true,
            hover: {
                mode: 'index'
            },
            title: {
                display: true,
                text: "Valor Aquisição",
                fontStyle: "normal",
                fontColor: "#333",
                fontSize: 30,
                position: 'top'
            },
            maintainAspectRatio: false,
            responsiveAnimationDuration: 3000,
            legend: {
                position: 'right',
                align: 'end',
                fontSize: 16
            },
            pieceLabel: { mode: 'percentage', precision: 2 }
        }
    });
}



function readURL(el) {
    if (el.files && el.files[0]) {
        var fileName = $(el).val().split('\\');
        fileName = fileName[fileName.length - 1]
        $(el).parents('.inputFile').find('.nomeArquivo').attr('title', fileName);
        fileName = fileName.length > 20 ? fileName.slice(0, 19) + '...' : fileName;
        $(el).parents('.inputFile').find('.nomeArquivo').html(fileName);
        var reader = new FileReader();
        reader.onload = function(e) {
            $(el).parents('.inputFile').find('.inputFile__image-img').attr('src', e.target.result);
        }
        reader.readAsDataURL(el.files[0]); // convert to base64 string
    } else {
        $(el).parents('.inputFile').find('.inputFile__image-img').attr('src', '');
        $(el).parents('.inputFile').find('.nomeArquivo').html('Selecione uma imagem...');
        $(el).parents('.inputFile').find('.nomeArquivo').attr('title', '');
    }
}


function ampliarImagem(el) {
    $(el).parent('.inputFile__image').addClass('inputFile__image--open');
}

function closeImagem(el) {
    $(el).parent('.inputFile__image').removeClass('inputFile__image--open');
}

function toggleColumns() {
    $('.table thead tr th.column-hidden').fadeToggle(200)
    $('.table tbody tr td.column-hidden').fadeToggle(200)
}