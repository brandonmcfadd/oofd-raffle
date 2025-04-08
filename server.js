/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */

const path = require("path");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
});

const storage = require('node-persist');
const cache = require('nano-cache');

// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// View is a templating manager for fastify
const handlebars = require('handlebars');

handlebars.registerHelper('toJSON', function(object){
  return new handlebars.SafeString(JSON.stringify(object));
});

fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: handlebars,
  },
}); 

fastify.get("/", async function (request, reply) {  
  // The Handlebars code will be able to access the parameter values and build them into the page
  return reply.view("/src/pages/check.hbs");
});

fastify.get("/display", async function (request, reply) {  
  // The Handlebars code will be able to access the parameter values and build them into the page
  return reply.view("/src/pages/index.hbs");
});

fastify.get("/api/current_numbers", async function (request, reply) {
  await storage.init();

  const numbers = await storage.getItem("current_numbers") || [];

  return reply.send(numbers);
});

fastify.post("/api/current_numbers", async function (request, reply) {
  const { numbers } = request.body;

  if (!Array.isArray(numbers)) {
    return reply.code(400).send({ error: "Invalid input, expected an array" });
  }

  await storage.init();

  const existing = await storage.getItem("current_numbers") || [];

  // Append new entries
  const updated = existing.concat(numbers);

  await storage.setItem("current_numbers", updated);

  return reply.send({ status: "ok", count: updated.length });
});

fastify.post("/api/delete_number", async function (request, reply) {
  const { number } = request.body;

  if (!number) {
    return reply.code(400).send({ error: "Missing number to delete" });
  }

  await storage.init();
  const numbers = (await storage.getItem("current_numbers")) || [];

  const filtered = numbers.filter(entry => entry.number !== number);

  await storage.setItem("current_numbers", filtered);
  return { success: true, deleted: number };
});


// Run the server and report out to the logs
fastify.listen(
  { port: Number(process.env.PORT ?? 3000), host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
    fastify.log.info(`server listening on ${address}`);
  }
);

