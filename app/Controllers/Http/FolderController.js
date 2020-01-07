"use strict";

const User = use("App/Models/User");
const Classe = use("App/Models/Classe");
const UserClasse = use("App/Models/UserClasse");
const Post = use("App/Models/Post");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with folders
 */
class FolderController {
  /**
   * Show a list of all folders.
   * GET folders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /*exibe uma classe na parte das pastas */
  async index({ view, params, auth }) {
    //const url = request.params;

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

    const posts = await Post.query()
      .innerJoin("classes", function () {
        this.on("posts.classe_id", "classes.id");
      })
      .innerJoin("users", function () {
        this.on("posts.user_id", "users.id");
      })
      .innerJoin("type_users", function () {
        this.on("users.type_user_id", "type_users.id");
      })
      .select(
        "users.name AS name_user",
        "classes.title AS classe_title",
        "type_users.name AS type_user",
        "posts.content AS content",
        "posts.created_at AS create_date"
      )
      .where("classes.id", params.id)
      .orderBy("posts.id", "desc")
      .fetch();

    if (auth.user.type_user_id == 2) {
      return view.render("classe-student.classe-student-folders", {
        info_group: classes.toJSON(),
        classe_groups: user_classe.toJSON(),
        posts: posts.toJSON(),
        page: "folders",
        param: params.id,
        userNavBar: userNavBar.toJSON()
      });

    } else {
      const classesAll = await Classe.query()
        .with("user")
        .where("user_id", auth.user.id)
        .fetch();

      return view.render("classe-teacher.classe-teacher-folders", {
        info_group: classes.toJSON(),
        classe_groups: classesAll.toJSON(),
        page: "folders",
        param: params.id,
        userNavBar: userNavBar.toJSON()
      });
    }
  }
}

module.exports = FolderController;
