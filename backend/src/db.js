import neo4j from "neo4j-driver";
import dotenv from "dotenv";

dotenv.config();

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

export async function testConnection() {
  const session = driver.session();
  try {
    const result = await session.run("RETURN 'Connected to Neo4j ' AS message");
    console.log(result.records[0].get("message"));
  } catch (err) {
    console.error(" Neo4j connection failed:", err);
  } finally {
    await session.close();
  }
}

export { driver };
