"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with notfounds
 */
class NotFoundController {
  /**
   * Show a list of all notfounds.
   * GET notfounds
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  /*view para as URL's não encontradas */
  async index({ view }) {
    return view.render("notfound404");
  }
}

module.exports = NotFoundController;
