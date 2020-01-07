"use strict";

const User = use("App/Models/User");
const Classe = use("App/Models/Classe");
const UserClasse = use("App/Models/UserClasse");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with members
 */
class MemberController {
  /**
   * Show a list of all members.
   * GET members
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /*exibe uma classe na parte dos membros */
  async index({ view, params, auth }) {
    const classes = await Classe.query()
      .with("user")
      .where("id", params.id)
      .fetch();

    const user_classe = await UserClasse.query()
      .with("classe")
      .where("user_id", auth.user.id)
      .fetch();

    const userNavBar = await User.query()
      .where("id", auth.user.id)
      .fetch();

    const user_classe2 = await UserClasse.query()
      .innerJoin("classes", function () {
        this.on("user_classes.classe_id", "classes.id");
      })
      .innerJoin("users", function () {
        this.on("user_classes.user_id", "users.id");
      })
      .where("user_classes.classe_id", params.id)
      .fetch();

    //return user_classe2

    if (auth.user.type_user_id == 2) {
      return view.render("classe-student.classe-student-members", {
        info_group: classes.toJSON(),
        classe_groups: user_classe.toJSON(),
        classe_members: user_classe2.toJSON(),
        page: "members",
        param: params.id,
        userNavBar: userNavBar.toJSON()
      });

    } else {
      const classesAll = await Classe.query()
        .with("user")
        .where("user_id", auth.user.id)
        .fetch();

      return view.render("classe-teacher.classe-teacher-members", {
        info_group: classes.toJSON(),
        classe_groups: classesAll.toJSON(),
        classe_members: user_classe2.toJSON(),
        page: "members",
        param: params.id,
        userNavBar: userNavBar.toJSON()
      });

    }
  }
}

module.exports = MemberController;
