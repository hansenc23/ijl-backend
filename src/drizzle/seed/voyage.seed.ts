import db from '../db'; // Import your database connection
import { voyage } from '../schema'; // Import your schema

export const seedVoyages = async () => {
  await db.insert(voyage).values([
    {
      voyage_number: '919',
      from_location: 'SURABAYA',
      to_location: 'TIMIKA',
      ship_id: 1,
    },
  ]);
  console.log('Voyages seeded');
};
