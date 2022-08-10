"use strict";

const Env = use("Env");

/*
|--------------------------------------------------------------------------
| Redis Subscribers
|--------------------------------------------------------------------------
|
| Here you can register the subscribers to redis channels. Adonis assumes
| your listeners are stored inside `app/Listeners` directory.
|
*/

// const Redis = use('Redis')

/**
 * Inline subscriber
 */
// Redis.subscribe('news', async () => {
// })

/**
 * Binding method from a module saved inside `app/Listeners/News`
 */
// Redis.subcribe('news', 'News.onMessage')

module.exports = {
  connection: "redis",

  redis: {
    port: Env.get("REDIS_PORT"), // Redis port
    host: Env.get("REDIS_HOST"), // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    // password: "auth",
    db: 0,
  },
};
