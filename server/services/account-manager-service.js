import supabase from "../server.js"

async function routes (fastify, options) {
    const collection = fastify.mongo.db.collection('test_collection')

    fastify.get('/', async (request, reply) => {
        return { hello: 'world' }
    })

    fastify.post('/register', async (request, reply) => {
        console.log(request.body.email)
        console.log(request.body.password)
        const { data, error } = await signUpNewUser(request.body.email, request.body.password)
        console.log(data)
        console.log(error)

        if(data) {
            return data;
        }
        if(error) {
            return error;
        }
    })

    fastify.post('/login', async (request, reply) => {
        console.log(request.body.email)
        console.log(request.body.password)
        const { data, error } = await signInWithEmail(request.body.email, request.body.password)
        console.log(data)
        console.log(error)

        if(data) {
            return data;
        }
        if(error) {
            return error;
        }
    })

    /* EXAMPLES
    fastify.get('/animals', async (request, reply) => {
        const result = await collection.find().toArray()
        if (result.length === 0) {
        throw new Error('No documents found')
        }
        return result
    })

    fastify.get('/animals/:animal', async (request, reply) => {
        const result = await collection.findOne({ animal: request.params.animal })
        if (!result) {
        throw new Error('Invalid value')
        }
        return result
    })

    const animalBodyJsonSchema = {
        type: 'object',
        required: ['animal'],
        properties: {
        animal: { type: 'string' },
        },
    }

    const schema = {
        body: animalBodyJsonSchema,
    }

    fastify.post('/animals', { schema }, async (request, reply) => {
        // we can use the `request.body` object to get the data sent by the client
        const result = await collection.insertOne({ animal: request.body.animal })
        return result
    })
    */
  }

async function signUpNewUser(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })

    return { data, error}
}

async function signInWithEmail(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    return { data, error }
}
  
  //ESM
  export default routes;