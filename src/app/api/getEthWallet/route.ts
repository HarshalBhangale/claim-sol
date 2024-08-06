// import { NextResponse } from 'next/server';
// import { Pool } from 'pg';

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// });

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const solAddress = searchParams.get('solAddress');

//   if (!solAddress) {
//     return NextResponse.json({ message: 'SOL address is required' }, { status: 400 });
//   }

//   try {
//     const client = await pool.connect();
//     try {
//       const result = await client.query('SELECT eth_address FROM wallet_pairs WHERE sol_address = $1', [solAddress]);
//       if (result.rows.length > 0) {
//         return NextResponse.json({ ethWallet: result.rows[0].eth_address });
//       } else {
//         return NextResponse.json({ message: 'No ETH wallet found for this SOL address' }, { status: 404 });
//       }
//     } finally {
//       client.release();
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/components/utils/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const solAddress = searchParams.get('solAddress');

    if (!solAddress) {
      return NextResponse.json({ message: 'SOL address is required' }, { status: 400 });
    }

    const result = await query('SELECT eth_address FROM wallet_pairs WHERE sol_address = ?', [solAddress]);
    if (result.length > 0) {
      return NextResponse.json({ ethWallet: result[0].eth_address });
    } else {
      return NextResponse.json({ message: 'No ETH wallet found for this SOL address' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}