import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fastify = Fastify({
  logger: true
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'dist'),
  prefix: '/dist/', // optional: default '/'
  //constraints: {host: '127.0.0.1'} // optional: default {}
});

// fastify.setNotFoundHandler(function (request, reply) {
//   reply.send({message:"Now Time"});
// });
//  http://localhost:3000
fastify.get('/', async (request, reply) => {
  return reply.sendFile('index.html');
  //reply.send("Hello")
});

// http://localhost:3000/hello/Dimon?lastName=Borisov
// fastify.route({
//   method: "GET",
//   url: '/hello/:name',
//   schema: {
//     querystring: {
//       properties: {
//         lastName:{type:'string'}
//       },
//       required:['lastName']
//     },
//     params: {
//       properties: {
//         name:{type:'string'}
//       },
//       required:['name']
//     },
//     response: {
//       200: {
//         properties: {
//           message:{type:'string'}
//         },
//         required:['message']
//       }
//     }
//   },
//   handler: (req, res) => {
//     return {
//       message: `Hello ${req.params.name} ${req.query.lastName}`
//     }
//   }
// })


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