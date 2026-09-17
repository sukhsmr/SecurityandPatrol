import mysql from 'mysql2/promise';

// Cached on globalThis (not a plain module-level variable) because Next.js
// dev mode re-evaluates this module on every hot reload; a plain `let pool`
// would create a brand new connection pool — and leave the old one's
// connections open — on every single file save, eventually exhausting
// MySQL's connection limit ("Too many connections"). globalThis survives
// HMR reloads, so the pool is created once and reused.
const globalForDb = globalThis as typeof globalThis & {
  __securityPatrolDbPool?: mysql.Pool;
};

function getPool() {
  if (!globalForDb.__securityPatrolDbPool) {
    globalForDb.__securityPatrolDbPool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'securityand_patrol',
      waitForConnections: true,
      connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 5,
      dateStrings: true,
    });
  }
  return globalForDb.__securityPatrolDbPool;
}

export async function query<T>(sql: string, params: unknown[] = []): Promise<T> {
  const [rows] = await getPool().execute(sql, params as never);
  return rows as T;
}
