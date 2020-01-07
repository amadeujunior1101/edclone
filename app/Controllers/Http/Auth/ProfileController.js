"use strict";

const User = use("App/Models/User");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with profiles
 */
class ProfileController {

  /*Exibe o perfil do usuário */
  async show({ auth, view, params, request }) {

    const url_id = request.params;

    const userNavBar = await User.query()
      .where("id", auth.user.id)
      .fetch();

    // return userNavBar

    const user = await User.query()
      .with("type_users")
      .where("id", params.id)
      .fetch();

    //return user

    if (url_id.id == auth.user.id) {
      return view.render("profile.profile", {
        profile: auth.user.id,
        user: user.toJSON(),
        auth: true,
        userNavBar: userNavBar.toJSON()
      });
    } else {
      return view.render("profile.profile", {
        profile: auth.user.id,
        user: user.toJSON(),
        auth: false,
        userNavBar: userNavBar.toJSON()
      });
    }

  }

  /*Altera a foto do perfil do usuário */
  async update({ request, auth, response }) {

    //Carregamento do arquivo
    const files = request.file("files", {
      size: "2mb" 
    });

    if (files) {
      const fileName = new Date().getTime() + "." + files.subtype;
      await files.move("./public/profile-image/img", { name: fileName });

      if (!files.moved()) {
        return files.errors();
      }

      await User.query()
        .where("id", auth.user.id)
        .update({ path_profile_image: fileName })
        .update({ ext_profile_image: files.subtype });

      return response.redirect("back");
    }
  }
}

module.exports = ProfileController;
