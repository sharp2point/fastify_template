import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});
fastify.route({
  method: "GET",
  url: '/hello/:name',
  schema: {
    params: {
      properties: {
        name:{type:'string'}
      },
      required:['name']
    },
    response: {
      200: {
        properties: {
          name:{type:'string'}
          },
          required:['name']
      }
    }
  },
  handler: (req, res) => {
    return {
      message: `Hello ${req.params.name}`
    }
  }
})


const start = async () => {
    fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }
        fastify.log.info(`server listening on ${address}`)
    });
}
start();