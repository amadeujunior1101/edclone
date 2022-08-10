"use strict";

const User = use("App/Models/User");
const randomstring = require("randomstring");
const Mail = use("Mail");
const Queue = require("../../../lib/Queue");

class RegisterController {
  /*chama a view de inscrição */
  async create({ request, view }) {
    const url = request.url();

    if (url == "/subscription-teacher") {
      return view.render("auth.subscription-teacher");
    } else {
      return view.render("auth.subscription-student");
    }
  }

  /* Realiza a inscrição como professor ou aluno*/
  async store({ request, response, session }) {
    const url = request.url();

    if (url == "/registration/teacher") {
      const user = await User.create({
        name: request.input("name"),
        email: request.input("email"),
        password: request.input("password"),
        token: randomstring.generate({
          length: 20,
          charset: "alphabetic",
        }),
        path_profile_image: "profile-edclone.jpg",
        ext_profile_image: "jpg",
        type_user_id: 1,
      });

      // adicionar job Registration na fila
      // await Queue.add({ user });
      await Mail.send(
        ["auth.emails.confirm_email"],
        user.toJSON(),
        (message) => {
          message
            .to(user.email)
            .from("edClone@adonisjs.com")
            .subject("Obrigado por confirmar seu endereço de e-mail");
        }
      );

      //display success message
      session.flash({
        successMessage: `Registro bem sucedido! Você receberá um e-mail para acessar o sistema!.`,
      });
    } else {
      const user = await User.create({
        name: request.input("name"),
        email: request.input("email"),
        password: request.input("password"),
        token: randomstring.generate({
          length: 20,
          charset: "alphabetic",
        }),
        path_profile_image: "profile-edclone.jpg",
        ext_profile_image: "jpg",
        type_user_id: 2,
      });
      const user2 = {
        name: request.input("name"),
        email: request.input("email"),
        password: request.input("password"),
      };
      try {
        const q = await Queue.add({ user2 });
        console.log("queue====>", q);
      } catch (error) {
        console.log("error queue", error);
        return new Error("error", error);
      }

      // adicionar job Registration na fila
      // await Mail.send(
      //   ["auth.emails.confirm_email"],
      //   user.toJSON(),
      //   (message) => {
      //     message
      //       .to(user.email)
      //       .from("edClone@adonisjs.com")
      //       .subject("Obrigado por confirmar seu endereço de e-mail");
      //   }
      // );

      session.flash({
        successMessage: `Registro bem sucedido! Você receberá um e-mail para acessar o sistema!.`,
      });
    }
    return response.redirect("back");
  }

  /*Confirmação do e-mail do usuário */
  async confirmEmail({ params, session, response }) {
    const user = await User.findBy("token", params.token);

    user.token = null;

    await user.save();

    return response.redirect("/login");
  }
}

module.exports = RegisterController;
