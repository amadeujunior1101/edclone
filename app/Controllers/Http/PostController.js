"use strict";

const User = use("App/Models/User");
const Classe = use("App/Models/Classe");
const UserClasse = use("App/Models/UserClasse");
const Post = use("App/Models/Post");
const File = use("App/Models/File");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /*exibe os posts */
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
        "users.id AS id_user",
        "type_users.name AS type_user",
        "users.path_profile_image AS profile_image",
        "posts.title AS title",
        "posts.content AS content",
        "posts.created_at AS create_date"
      )
      .where("classes.id", params.id)
      .orderBy("posts.id", "desc")
      .fetch();

    //return posts

    if (auth.user.type_user_id == 2) {
      return view.render("classe-student.classe-student-post", {
        info_group: classes.toJSON(),
        classe_groups: user_classe.toJSON(),
        posts: posts.toJSON(),
        page: "posts",
        param: params.id,
        userNavBar: userNavBar.toJSON()
      });

      //return classes.toJSON()[0].user.name
    } else {
      const classesAll = await Classe.query()
        .with("user")
        .where("user_id", auth.user.id)
        .fetch();

      return view.render("classe-teacher.classe-teacher-post", {
        info_group: classes.toJSON(),
        classe_groups: classesAll.toJSON(),
        posts: posts.toJSON(),
        page: "posts",
        param: params.id,
        userNavBar: userNavBar.toJSON()
      });
      // return classesAll
    }
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  /*cria os posts */
  async store({ request, response, auth, session }) {

    const values = request.all();

    const classes = await Classe.query()
      .where("id", values.cod_grupo)
      .where("user_id", auth.user.id)
      .fetch();

    //return classes

    const user_classe = await UserClasse.query()
      .where("classe_id", values.cod_grupo)
      .where("user_id", auth.user.id)
      .fetch();

    //return user_classe

    if (classes.size() == 0 && user_classe.size() == 0) {
      return response.redirect("back");
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
          await files.move(`./public/classes/${values.cod_grupo}/posts/files`, { name: fileName });

          const post = await Post.create({
            title: values.post_title,
            content: values.content,
            user_id: auth.user.id,
            classe_id: values.cod_grupo
          });

          await File.create({
            post_id: post.id,
            file: fileName,
            name: files.clientName,
            type: files.type,
            subtype: files.subtype
          });

          //return post
          return response.redirect("back");
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
        await Post.create({
          title: values.post_title,
          content: values.content,
          user_id: auth.user.id,
          classe_id: values.cod_grupo
        });

        return response.redirect("back");
      }
    }
  }
}

module.exports = PostController;
