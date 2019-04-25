import { Query, Resolver } from 'type-graphql'

@Resolver()
class HelloResolver {
  @Query(() => String, {
    name: 'helloWorld',
    description: 'Return a hello world string',
  })
  async hello() {
    return 'Hello world'
  }
}

export default [HelloResolver]
