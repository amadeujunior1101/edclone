const Mail = use("Mail");

module.exports = {
  key: "RegistrationMail",
  async handle({ data }) {
    const { user } = data;
    // enviando o email de confirmação
    await Mail.send(["auth.emails.confirm_email"], user.toJSON(), (message) => {
      message
        .to(user.email)
        .from("edClone@adonisjs.com")
        .subject("Obrigado por confirmar seu endereço de e-mail");
    });
  },
};
