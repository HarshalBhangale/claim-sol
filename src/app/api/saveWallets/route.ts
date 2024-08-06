// import { NextResponse } from 'next/server';
// import { PublicKey } from '@solana/web3.js';
// import { Pool } from 'pg';
// import nacl from 'tweetnacl';

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// });

// export async function POST(request: Request) {
//   const { sol, eth, sig } = await request.json();

//   try {
//     // Verify the signature
//     const message = `Now you certify that you want to receive tokens in the following wallet. Eth wallet: ${eth}, your Solana wallet: ${sol}`;
//     const encodedMessage = new TextEncoder().encode(message);
//     const signature = Buffer.from(sig, 'base64');
//     const publicKey = new PublicKey(sol);

//     const isValid = nacl.sign.detached.verify(
//       encodedMessage,
//       signature,
//       publicKey.toBuffer()
//     );

//     if (!isValid) {
//       return NextResponse.json({ message: 'Did you sign the request using your presale wallet?' }, { status: 400 });
//     }

//     // Save to database
//     const client = await pool.connect();
//     try {
//       await client.query(
//         'INSERT INTO wallet_pairs (sol_address, eth_address) VALUES ($1, $2) ON CONFLICT (sol_address) DO UPDATE SET eth_address = $2',
//         [sol, eth]
//       );
//       return NextResponse.json({ message: 'Successfully saved' });
//     } finally {
//       client.release();
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl';
import { run } from '@/components/utils/db';

export async function POST(request: Request) {
  try {
    const { sol, eth, sig } = await request.json();

    // Verify the signature
    const message = `Now you certify that you want to receive tokens in the following wallet. Eth wallet: ${eth}, your Solana wallet: ${sol}`;
    const encodedMessage = new TextEncoder().encode(message);
    const signature = Buffer.from(sig, 'base64');
    const publicKey = new PublicKey(sol);

    const isValid = nacl.sign.detached.verify(
      encodedMessage,
      signature,
      publicKey.toBuffer()
    );

    if (!isValid) {
      return NextResponse.json({ message: 'Did you sign the request using your presale wallet?' }, { status: 400 });
    }

    // Save to database
    await run(
      'INSERT OR REPLACE INTO wallet_pairs (sol_address, eth_address) VALUES (?, ?)',
      [sol, eth]
    );
    return NextResponse.json({ message: 'Successfully saved' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal server error', error: (error as any).message }, { status: 500 });
  }
}