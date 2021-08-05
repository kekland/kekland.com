'use strict';

/**
 * run-function-button-plugin.js controller
 *
 * @description: A set of functions called "actions" of the `run-function-button-plugin` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  }
};
