"use strict";

const User = use("App/Models/User");
const Classe = use("App/Models/Classe");
const UserClasse = use("App/Models/UserClasse");
const Post = use("App/Models/Post");
const randomstring = require("randomstring");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with classes
 */
class ClasseController {

  /**
   * Create/save a new classe.
   * POST classes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth, session, view }) {
    //const url = request.url()

    /*cria uma classe */
    if (auth.user.type_user_id == 1) {
      const valor = request.only("title");

      var classes = await Classe.query()
        .where("user_id", auth.user.id)
        .where("title", valor.title)
        .fetch();

      //return classes

      if (classes.size() == 0) {
        //return 'voce não está nesta classe!'
        //return user_classe2.size

        await Classe.create({
          title: request.input("title"),
          user_id: auth.user.id,
          key: randomstring.generate({
            length: 10,
            charset: "alphabetic"
          })
        });
        return response.route("main.index");
      } else {
        session.flash({
          successMessage: "Você já possui uma classe com este nome."
        });
        //return response.redirect('/main.index')
        return response.route("main.index");
      }

      /*insere umaluno numa classe */
    } else if (auth.user.type_user_id == 2) {
      const valor = request.only("codigo_turma");

      var user_classe2 = await UserClasse.query()
        .where("user_id", auth.user.id)
        .where("classe_id", valor.codigo_turma)
        .fetch();

      /*verifica se a classe exixte */
      if (user_classe2.size() == 0) {

        try {
          const turma = await Classe.findBy(
            "id",
            request.input("codigo_turma")
          );

          await UserClasse.create({
            user_id: auth.user.id,
            classe_id: turma.id
          });

          return response.route("main.index");

        } catch (err) {
          session.flash({ successMessage: "Codigo Inexistente." });
          return response.route("main.index");
        }
      } else {
        session.flash({ successMessage: "Você já está nesta classe." });
        return response.route("main.index");
      }
    }
  }

}

module.exports = ClasseController;
