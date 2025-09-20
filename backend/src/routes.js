import express from "express";
import { driver } from "./db.js";

const router = express.Router();

// === Get papers by author ===
router.get("/papers", async (req, res) => {
  const { author } = req.query;
  const session = driver.session();
  try {
    const query = `
      MATCH (a:Author {name: $author})-[:WROTE]->(p:Paper)
      OPTIONAL MATCH (p)-[:HAS_TOPIC]->(t:Topic)
      OPTIONAL MATCH (p)-[:USES]->(d:Dataset)
      RETURN p.title AS title, p.year AS year, p.doi AS doi,
             collect(DISTINCT t.name) AS topics,
             collect(DISTINCT d.name) AS datasets
    `;
    const result = await session.run(query, { author });
    res.json(result.records.map(r => r.toObject()));
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
});

// === Get papers by topic ===
router.get("/papers/topic/:topic", async (req, res) => {
  const { topic } = req.params;
  const session = driver.session();
  try {
    const query = `
      MATCH (p:Paper)-[:HAS_TOPIC]->(t:Topic {name: $topic})
      RETURN p.title AS title, p.year AS year, p.doi AS doi
    `;
    const result = await session.run(query, { topic });
    res.json(result.records.map(r => r.toObject()));
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
});

// === Add new paper ===
router.post("/papers", async (req, res) => {
  const { title, doi, year, author, institution, topic, dataset } = req.body;
  const session = driver.session();
  try {
    const query = `
      MERGE (a:Author {name: $author})
      MERGE (i:Institution {name: $institution})
      MERGE (a)-[:AFFILIATED_WITH]->(i)
      MERGE (p:Paper {title: $title, doi: $doi, year: $year})
      MERGE (a)-[:WROTE]->(p)
      MERGE (t:Topic {name: $topic})
      MERGE (p)-[:HAS_TOPIC]->(t)
      MERGE (d:Dataset {name: $dataset})
      MERGE (p)-[:USES]->(d)
      RETURN p
    `;
    const result = await session.run(query, {
      title,
      doi,
      year,
      author,
      institution,
      topic,
      dataset
    });
    res.json({ message: "Paper added successfully ✅", paper: result.records[0].toObject() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
});

export default router;
