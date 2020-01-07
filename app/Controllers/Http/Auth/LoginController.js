"use strict";

class LoginController {

  /*chama a view login*/
  async create({ view }) {
    return view.render("login.login");
  }

  /*Realiza autenticação (cria uma session) */
  async store({ request, auth, response, session }) {
    //const value_email = request.only("email");

    try {
      await auth
        .remember(true)
        .attempt(request.input("email"), request.input("password"));

      return response.route("main.index");
    } catch (err) {
      session.flash({ successMessage: "E-mail ou senha incorretos." });
      return response.redirect("back");
    }
  }

  /*Realiza o logout da session */
  async destroy({ auth, response }) {
    await auth.logout();

    return response.route("login.create");
  }
}

module.exports = LoginController;
