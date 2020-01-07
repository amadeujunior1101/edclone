"use strict";

const File = use("App/Models/File");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  /**
   * Display a single file.
   * GET files/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /*exibe o arquivo para download */
  async show({ params, response }) {

    const url = params
    //return url
    const file = await File
      .findByOrFail('name', url.fileName);

    return response.download(`./public/classes/${url.cod_group}/posts/files/${file.file}`);
  }

}

module.exports = FileController;
