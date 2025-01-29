import db from '../db'; // Import your database connection
import { ship } from '../schema'; // Import your schema

export const seedShips = async () => {
  await db.insert(ship).values([
    { name: 'Grand', initials: 'GS', nahkoda: 'Sunggul Sinurat' },
    { name: 'Orion', initials: 'OS', nahkoda: 'Subekhan' },
    { name: 'Triton', initials: 'TS', nahkoda: 'Hamid Ola' },
  ]);
  console.log('Ships seeded');
};
