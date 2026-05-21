import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  const dummyOrders = [
    {
      product_name: 'MaxMiles ULTRA 5W-30',
      volume: '4L',
      quantity: 2,
      status: 'new',
      telegram_username: 'davron_01',
      note: 'Please deliver before 5 PM.'
    },
    {
      product_name: 'MaxMiles POWER 10W-40',
      volume: '20L',
      quantity: 5,
      status: 'confirmed',
      telegram_username: 'auto_parts_uz',
      note: 'Regular wholesale customer.'
    },
    {
      product_name: 'MaxMiles GEARA 75W-90',
      volume: '1L',
      quantity: 4,
      status: 'delivered',
      telegram_username: 'johndoe_99',
      note: 'Left at the front desk.'
    },
    {
      product_name: 'MaxMiles MOTA 4T 10W-40',
      volume: '1L',
      quantity: 1,
      status: 'cancelled',
      telegram_username: 'bike_rider',
      note: 'Customer changed their mind.'
    }
  ];

  const { data, error } = await supabase.from('orders').insert(dummyOrders);

  if (error) {
    console.error('Error inserting orders:', error);
  } else {
    console.log('Successfully inserted dummy orders!');
  }
}

seed();
