import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;

async function getDb() {
if (!db) {
    db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS wallet_pairs (
            sol_address TEXT PRIMARY KEY,
            eth_address TEXT NOT NULL
        )
    `);
    }
    return db;
}

export async function query(sql: string, params: any[] = []) {
    const db = await getDb();
    return db.all(sql, params);
}

export async function run(sql: string, params: any[] = []) {
    const db = await getDb();
    return db.run(sql, params);
}