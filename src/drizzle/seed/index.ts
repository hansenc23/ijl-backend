import { seedCompanies } from './company.seed';
import { seedShips } from './ship.seed';
import { seedVoyages } from './voyage.seed';
import { seedDeals } from './deal.seed';
import { poolConnection } from '../db';
const runSeeds = async () => {
  try {
    console.log('Running seeds...');
    await seedShips();
    await seedCompanies();
    await seedVoyages();
    await seedDeals();
    console.log('Seeding complete!');
    return;
  } catch (error) {
    console.error('Error running seeds:', error);
    return;
  } finally {
    await poolConnection.end();
    return;
  }
};

runSeeds();
