import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.NewsletterSubscriptionCreateInput[] = [
  {
    email: 'test1@test.com',
    language: 'fr',
    isSubscribed: true
  },
  {
    email: 'test2@test.com',
    language: 'en',
    isSubscribed: true
  },
  {
    email: 'test3@test.com',
    language: 'fr',
    isSubscribed: false
  },
  {
    email: 'test4@test.com',
    language: 'en',
    isSubscribed: true
  },
  {
    email: 'test5@test.com',
    language: 'fr',
    isSubscribed: true
  }
]

export async function main() {
  console.log(`Début de la création de ${userData.length} utilisateurs test...`)
  
  for (const u of userData) {
    const user = await prisma.newsletterSubscription.create({ data: u })
    console.log(`Utilisateur créé avec l'email: ${user.email}`)
  }
  
  console.log('Création des utilisateurs test terminée avec succès!')
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });