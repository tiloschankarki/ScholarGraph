import "dotenv/config";
import fetch from "node-fetch";
import neo4j from "neo4j-driver";

// === Setup Neo4j ===
const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

async function main() {
  const session = driver.session();

  try {
    console.log("🌐 Fetching papers from Crossref…");
    const url = "https://api.crossref.org/works?filter=type:journal-article&rows=200";
    const response = await fetch(url);
    const data = await response.json();

    const papers = data.message.items;

    for (const paper of papers) {
      const title = paper.title?.[0] || "Untitled";
      const doi = paper.DOI;
      const year = paper.issued?.["date-parts"]?.[0]?.[0] || null;
      const authors = paper.author?.map(a => `${a.given || ""} ${a.family || ""}`.trim()) || [];
      const publisher = paper.publisher || "Unknown Publisher";
      const container = paper["container-title"]?.[0] || null;
      const topics = paper.subject || [];
      const link = paper.URL || paper.link?.[0]?.URL || null;

      if (!doi || !year) continue; // skip incomplete entries

      // Insert into Neo4j
      const query = `
        MERGE (p:Paper {doi: $doi})
          SET p.title = $title, p.year = $year, p.link = $link
        MERGE (pub:Publisher {name: $publisher})
        MERGE (p)-[:PUBLISHED_BY]->(pub)
        FOREACH (authorName IN $authors |
          MERGE (a:Author {name: authorName})
          MERGE (a)-[:WROTE]->(p)
        )
        FOREACH (topic IN $topics |
          MERGE (t:Topic {name: topic})
          MERGE (p)-[:HAS_TOPIC]->(t)
        )
        FOREACH (c IN CASE WHEN $container IS NOT NULL THEN [$container] ELSE [] END |
          MERGE (ct:Container {name: c})
          MERGE (p)-[:PART_OF]->(ct)
        )
      `;

      await session.run(query, {
        doi,
        title,
        year,
        link,
        publisher,
        authors,
        topics,
        container,
      });

      console.log(`✅ Inserted paper "${title}" (${year})`);
    }

    console.log("🎉 Finished seeding Neo4j with 200 papers!");
  } catch (err) {
    console.error("❌ Error seeding Neo4j:", err);
  } finally {
    await session.close();
    await driver.close();
  }
}

main();
