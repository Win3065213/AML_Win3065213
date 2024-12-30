const db = require('./database');

console.log('DB:', db); // Should log the promise-based pool, not undefined

async function testQuery() {
  try {
    const [rows] = await db.query('SELECT 1');
    console.log('Test query successful:', rows);
  } catch (error) {
    console.error('Error in test query:', error);
  }
}

testQuery();