import db from '../db'; // Import your database connection
import { company } from '../schema'; // Import your schema

export const seedCompanies = async () => {
  await db.insert(company).values([
    { name: 'Air Mas Logistik', initials: 'AML' },
    { name: 'Palma Agro Sentosa', initials: 'PAS' },
  ]);
  console.log('Companies seeded');
};
