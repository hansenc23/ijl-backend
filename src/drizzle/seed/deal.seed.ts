import db from '../db';
import { deal } from '../schema';

export const seedDeals = async () => {
  await db.insert(deal).values([
    {
      company_id: 1,
      goods_description: 'Semen',
      quantity: 40000,
      rate_per_tonne: 250000,
      voyage_id: 1,
      unit_weight: 40,
      total_price: 400000000,
      created_at: new Date(),
    },
    {
      company_id: 2,
      goods_description: 'Kayu',
      quantity: 10000,
      rate_per_tonne: 200000,
      voyage_id: 1,
      unit_weight: 40,
      total_price: 80000000,
      created_at: new Date(),
    },
  ]);
  console.log('Deals seeded');
};
