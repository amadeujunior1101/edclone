"use strict";

const User = use("App/Models/User");
const Classe = use("App/Models/Classe");
const UserClasse = use("App/Models/UserClasse");
const Post = use("App/Models/Post");

class UserController {

  async index({ view, auth }) {
    if (auth.user.type_user_id == 1) {

      /*exibe as classes do professor */
      const classes = await Classe.query()
        .where("user_id", auth.user.id)
        .orderBy("classes.id", "desc")
        .fetch();

      //return classes

      /*exibe as tarefas*/
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
          "tasks.description AS tasks_description",
          "tasks.delivery_date AS tasks_date"
        )
        .where("user_id", auth.user.id)
        .orderBy("classes.id", "desc")
        .fetch();

      //return tasks

      /*exibe as informações do usuário */
      const user = await User.query()
        .where("id", auth.user.id)
        .fetch();

      //return user

      const userNavBar = await User.query()
        .where("id", auth.user.id)
        .fetch();

      /*carrega os posts */
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
        .leftJoin("files", function () {
          this.on("files.post_id", "posts.id");
        })
        .select(
          "users.name AS name_user",
          "users.id AS id_user",
          "users.path_profile_image AS profile_image",
          "classes.title AS classe_title",
          "classes.id AS classe_id",
          "type_users.name AS type_user",
          "posts.id AS post_id",
          "posts.title AS title",
          "posts.content AS content",
          "posts.created_at AS create_date",
          "files.name AS file_name"
        )
        .where("classes.user_id", auth.user.id)
        .orderBy("posts.id", "desc")
        .fetch();

      //return posts;

      /*carrega a view passando os parametros */
      return view.render("main-teacher.main", {
        name: auth.user.name,
        classe: classes.toJSON(),
        tasks: tasks.toJSON(),
        posts: posts.toJSON(),
        profile: auth.user.id,
        user: user.toJSON(),
        userNavBar: userNavBar.toJSON()
      });

    } else {

      /*classes em que o aluno está inserido */
      const user_classe = await UserClasse.query()
        .with("classe")
        .where("user_id", auth.user.id)
        .fetch();

      //return user_classe

      /*dados do usuário */
      const user = await User.query()
        .where("id", auth.user.id)
        .fetch();

      //return user

      const userNavBar = await User.query()
        .where("id", auth.user.id)
        .fetch();

      /*tarefas do aluno */
      const tasks = await Classe.query()
        .innerJoin("tasks", function () {
          this.on("tasks.classe_id", "classes.id");
        })
        .innerJoin("user_classes", function () {
          this.on("user_classes.classe_id", "classes.id");
        })
        .select(
          "classes.id AS classe_id",
          "classes.title AS classe_title",
          "tasks.id AS tasks_id",
          "tasks.title AS tasks_title",
          "tasks.description AS tasks_description",
          "tasks.delivery_date AS tasks_date"
        )
        .where("user_classes.user_id", auth.user.id)
        .fetch();

      //return tasks

      /*carrega os posts */
      const posts = await Post.query()
        .innerJoin("classes", function () {
          this.on("posts.classe_id", "classes.id");
        })
        .innerJoin("user_classes", function () {
          this.on("user_classes.classe_id", "classes.id");
        })
        .innerJoin("users", function () {
          this.on("posts.user_id", "users.id");
        })
        .innerJoin("type_users", function () {
          this.on("users.type_user_id", "type_users.id");
        })
        .leftJoin("files", function () {
          this.on("files.post_id", "posts.id");
        })
        .select(
          "users.name AS name_user",
          "users.id AS id_user",
          "users.path_profile_image AS profile_image",
          "classes.id AS classe_id",
          "classes.title AS classe_title",
          "type_users.name AS type_user",
          "posts.id AS post_id",
          "posts.title AS title",
          "posts.content AS content",
          "posts.created_at AS create_date",
          "files.name AS file_name"
        )
        .where("user_classes.user_id", auth.user.id)
        .orderBy("posts.id", "desc")
        .fetch();

      /*carrega a view e passa os parametros */
      return view.render("main-student.main", {
        name: auth.user.name,
        classe: user_classe.toJSON(),
        posts: posts.toJSON(),
        tasks_group: tasks.toJSON(),
        profile: auth.user.id,
        user: user.toJSON(),
        userNavBar: userNavBar.toJSON()
      });
    }
  }

  /*chama a view home */
  async show({ view }) {
    return view.render("home.home");
  }
}

module.exports = UserController;
