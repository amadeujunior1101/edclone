// $(".more").click(function() {
//   $(".oculta").slideToggle();
//   //$("#ver").text('Menos')

// });

$(document).ready(function() {
  $("#myBtnClasses").click(function() {
    $("#myModalClasses").modal();
  });
});

$(document).ready(function() {
  $("#myBtnTasks").click(function() {
    $("#myModalTasks").modal();
  });
});

$(document).ready(function() {
  $("#myBtnDeliveryTasks").click(function() {
    $("#myModalDeliveryTasks").modal();
  });
});

/*$(document).ready(function() {
  $("#form_task").on("submit", function(event) {
    event.preventDefault();
    if ($("#cod_grupo").val() == "") {
      //Alerta de campo nome vazio
      $("#msg-error").html(
        '<div class="alert alert-danger" role="alert">Escolha uma classe!</div>'
      );
    } else if ($("#title").val() == "") {
      //Alerta de campo email vazio
      $("#msg-error").html(
        '<div class="alert alert-danger" role="alert">Insira um título!</div>'
      );
    } else if ($("#description").val() == "") {
      //Alerta de campo email vazio
      $("#msg-error").html(
        '<div class="alert alert-danger" role="alert">Insira uma descrição!</div>'
      );
    } else if ($("#delivery_date").val() == "") {
      //Alerta de campo email vazio
      $("#msg-error").html(
        '<div class="alert alert-danger" role="alert">Insira uma data!</div>'
      );
    } else {
      //Receber os dados do formul�rio
      var dados = $("#form_task").serialize(); 
      //console.log(dados)
      $.post("http://localhost:3333/create-task", dados, function(retorna) {
        if (retorna) {
          //Alerta de cadastro realizado com sucesso
          $("#msg").html(
            '<div class="alert alert-success" role="alert">Tarefa criada com sucesso!</div>'
          );

          //Limpar os campo
          $("#form_task")[0].reset();

          //Fechar a janela modal cadastrar
          $("#myModalTasks").modal("hide");

          //Limpar mensagem de erro
          $("#msg-error").html("");

          window.location.reload()
        } else {
        }
       
      }
      
      );
    }
  });
});*/
