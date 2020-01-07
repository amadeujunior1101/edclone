"use strict";

const Task = use("App/Models/Task");
const User = use("App/Models/User");
const Classe = use("App/Models/Classe");

class TaskController { 

  /*chama a view para criação da tarefa */
  async create({ view, auth }) {

    const classes = await Classe.query()
      .where("user_id", auth.user.id)
      .orderBy("classes.id", "desc")
      .fetch();

    return view.render("tasks.form-create-task", {
      classe: classes.toJSON(),
    });
  }

  /*cria uma tarefa */
  async store({ request, auth, response, session }) {
    const values = request.all();
    //return values

    const find = await Classe.query()
      .where("id", values.cod_grupo)
      .fetch();

    if (find.size() == 0) {
      return response.route("main.index");
    } else {
      //Carregamento do arquivo
      const files = await request.file("files", {
        size: "2mb",
        types: ["image", "pdf", "zip", "png", "jpg", "application"]
      });

      if (files) {
        if (files.size > 2097152) {
          //display message
          session
            .flash({
              Message: "Arquivo excede o tamanho suportado! max. 2MB!."
            })
            .flashAll();

          return response.redirect("back");
        } else if (
          files.extname == "zip" ||
          files.extname == "jpg" ||
          files.extname == "png" ||
          files.extname == "pdf"
        ) {
          const fileName = new Date().getTime() + "." + files.extname;
          await files.move(
            `./public/classes/${values.cod_grupo}/tasks/${auth.user.id}/files`,
            { name: fileName }
          );

          await Task.create({
            title: request.input("task_title"),
            description: request.input("task_description"),
            delivery_date: request.input("task_delivery_date"),
            classe_id: values.cod_grupo,
            file: fileName,
            name: files.clientName,
            type: files.type,
            subtype: files.subtype
          });

          return response.route("main.index");
        } else {
          //display message
          session
            .flash({
              Message:
                "Tipo de arquivo não suportado! Use extensões zip | jpg | png | pdf - max. 2MB!."
            })
            .flashAll();

          return response.redirect("back");
        }
      }

      if (request.input("task_delivery_date") == null) {
        session
          .flash({
            MessageDate: "Informe a data."
          })
          .flashAll();
        return response.redirect("back");
      } else {

        await Task.create({
          title: request.input("task_title"),
          description: request.input("task_description"),
          delivery_date: request.input("task_delivery_date"),
          classe_id: values.cod_grupo
        });
        return response.route("main.index");

      }

    }

  }

  /*exibe as tarefas criadas */
  async show({ params, view, auth }) {
    const valor = params.id;

    const tasks = await Classe.query()
      .innerJoin("tasks", function () {
        this.on("tasks.classe_id", "classes.id");
      })
      .select(
        "classes.id AS id",
        "classes.title AS title",
        "tasks.id AS tasks_id",
        "tasks.delivery_date AS date",
        "tasks.title AS tasks_title",
        "tasks.description AS tasks_description"
        //"tasks.delivery_date AS tasks_date"
      )
      .where("user_id", auth.user.id)
      .where("tasks.id", valor)
      .orderBy("classes.id", "desc")
      .fetch();

    //return tasks

    const userNavBar = await User.query()
      .where("id", auth.user.id)
      .fetch();

    return view.render("tasks.form-task-teacher", {
      info: tasks.toJSON(),
      userNavBar: userNavBar.toJSON()
    });
  }
}

module.exports = TaskController;
