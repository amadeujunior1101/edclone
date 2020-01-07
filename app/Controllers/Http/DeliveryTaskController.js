"use strict";

const User = use("App/Models/User");
const Classe = use("App/Models/Classe");
const Task = use("App/Models/Task");
const DeliveryTask = use("App/Models/DeliveryTask");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with deliverytasks
 */
class DeliveryTaskController {

  /**
   * Create/save a new deliverytask.
   * POST deliverytasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response 
   */

  /*envia a tarefa */
  async store({ request, auth, response, session }) {
    const values = request.all();

    const task = await Task.query()
      .where("id", values.cod_task)
      .fetch();

    //return task

    /*verifica se a tarefa exixte */
    if (task.size() == 0) {
      return response.route("main.index");
    } else {
      //Carregamento do arquivo
      const files = await request.file("files", {
        size: "2mb",
        types: ["image", "pdf", "zip", "png", "jpg", "application"]
      });

      //return files

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

          await DeliveryTask.create({
            status: "S",
            content: request.input("content"),
            task_id: values.cod_task,
            user_id: auth.user.id,
            file: fileName,
            name: files.clientName,
            type: files.type,
            subtype: files.subtype
          });

          //return post
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
      } else {
        await DeliveryTask.create({
          status: "S",
          content: values.content,
          task_id: values.cod_task,
          user_id: auth.user.id
        });

        return response.route("main.index");
      }
    }

  }

  /**
   * Display a single deliverytask.
   * GET deliverytasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, auth, view }) {
    const valor = params.id;

    const tasks = await Classe.query()
      .innerJoin("tasks", function () {
        this.on("tasks.classe_id", "classes.id");
      })
      .select(
        "classes.id AS classes_id",
        "classes.title AS title",
        "tasks.id AS tasks_id",
        "tasks.delivery_date AS date",
        "tasks.title AS tasks_title",
        "tasks.description AS tasks_description"
        //"tasks.delivery_date AS tasks_date"
      )

      .where("tasks.id", valor)
      .orderBy("classes.id", "desc")
      .fetch();

    //return tasks

    const userNavBar = await User.query()
      .where("id", auth.user.id)
      .fetch();

    /*carrega a view a passa os parametros */
    return view.render("delivery-tasks.form-delivery-task", {
      info: tasks.toJSON(),
      userNavBar: userNavBar.toJSON()
    });
  }

}

module.exports = DeliveryTaskController;
