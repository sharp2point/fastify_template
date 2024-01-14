import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

const options = {
  schema: {
    // querystring: {
    //   properties: {
    //     lastName:{type:'string'}
    //   },
    //   required:['lastName']
    // },
    // params: {
    //   properties: {
    //     name:{type:'string'}
    //   },
    //   required:['name']
    // },
    // response: {
    //   200: {
    //     properties: {
    //       message:{type:'string'}
    //     },
    //     required:['message']
    //   }
    // }
  }
}
//  http://localhost:3000
fastify.get('/',options, async (request, reply) => {
  return { hello: 'world' };
});

// http://localhost:3000/hello/Dimon?lastName=Borisov
fastify.route({
  method: "GET",
  url: '/hello/:name',
  schema: {
    querystring: {
      properties: {
        lastName:{type:'string'}
      },
      required:['lastName']
    },
    params: {
      properties: {
        name:{type:'string'}
      },
      required:['name']
    },
    response: {
      200: {
        properties: {
          message:{type:'string'}
        },
        required:['message']
      }
    }
  },
  handler: (req, res) => {
    return {
      message: `Hello ${req.params.name} ${req.query.lastName}`
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