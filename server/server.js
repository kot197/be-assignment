// Import the framework and instantiate it
import Fastify from 'fastify'
import cors from '@fastify/cors'
import AccountManagerService from './services/account-manager-service.js'
import dbConnector from './db-connector.js'
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://gvxloqgfspnpjeqdtwzd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2eGxvcWdmc3BucGplcWR0d3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNDkwNjksImV4cCI6MjAzOTYyNTA2OX0.vo4aB3zutt0C5b8ptDsD0iuN69apKzPxEeU6RFOLyds')

const fastify = Fastify({
  logger: true
})

fastify.register(cors, {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
})
// Declare a route
fastify.register(dbConnector)
fastify.register(AccountManagerService);

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}

export default supabase;