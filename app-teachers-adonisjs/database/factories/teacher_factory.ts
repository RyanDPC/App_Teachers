import factory from '@adonisjs/lucid/factories'
import Teacher from '#models/teacher'
export const TeacherFactory = factory
  .define(Teacher, async ({ faker }) => {
    const firstname = faker.person.firstName() // Génère un prénom réaliste
    const lastname = faker.person.lastName() // Génère un nom de famille réaliste
    return {
      firstname: firstname,
      lastname: lastname,
      nickname: `${firstname.charAt(0)}${lastname.charAt(0)}${lastname.slice(-1)}`, // Génère un surnom
      gender: faker.helpers.arrayElement(['M', 'F', 'O']), // Génère un genre aléatoire
      origine: faker.lorem.word(4), // Génère 4 mots aléatoires
      sectionId: faker.number.int({ min: 1, max: 6 }), // ID de section aléatoire
    }
  })
  .build()
