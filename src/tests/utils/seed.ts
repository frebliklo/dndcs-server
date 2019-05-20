import { prisma } from '../../generated/prisma-client'
import hashPassword from '../../utils/hashPassword'

const seed = async () => {
  const hashedPassword = await hashPassword('rødgrødmedfløde')

  const jane = await prisma.createUser({
    name: 'Jane',
    email: 'jane@example.com',
    emailVerified: true,
    password: hashedPassword,
  })

  const john = await prisma.createUser({
    name: 'John',
    email: 'john@doe.com',
    password: hashedPassword,
  })

  const arya = await prisma.createCharacter({
    name: 'Arya',
    hitDie: 8,
    dndClass: 'ROGUE',
    dndRace: 'HUMAN',
    owner: { connect: { id: jane.id } },
  })
}

export default seed
