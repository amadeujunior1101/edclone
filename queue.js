const Queue = require("./app/lib/Queue");

const RegistrationMail = require("./app/Jobs/RegistrationMail");

Queue.process(RegistrationMail.handle);
