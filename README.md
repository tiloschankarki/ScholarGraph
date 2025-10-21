# ScholarGraph  
### *Decentralized Knowledge Graph for Research Transparency*

---

## Inspiration  
We were inspired by the idea of making research more **transparent, trustworthy, and accessible**.  
With millions of papers published every year across journals and conferences, it becomes nearly impossible to **verify authenticity** or **trace relationships** between authors, publishers, and datasets.  

So we asked ourselves:  
> “What if Wikipedia’s openness, Google Scholar’s knowledge, and blockchain’s trust could be combined into one system?”  

That question led to **ScholarGraph** — a **decentralized knowledge graph (DKG)** that bridges **Neo4j** and **Polygon blockchain** to make research verification open, connected, and immutable.

---

## What It Does  
ScholarGraph connects academic entities — authors, papers, institutions, publishers, and datasets — into an **interactive knowledge graph** stored in **Neo4j**, while every paper’s **DOI** is hashed and stored on the **Polygon Amoy blockchain** for authenticity.

###  Key Features
-  **Search:** Query papers by author, topic, or dataset  
-  **Relationships:** Explore collaborations between authors and institutions  
-  **Verification:** Instantly check blockchain authenticity for any paper  
-  **Visualization:** Interact with a dynamic graph of research connections  

In short, **ScholarGraph** acts as a **trust layer + visual explorer** for scholarly knowledge.

---

##  How We Built It  

### ** Backend (Express + Neo4j + Ethers.js)**  
- API routes for querying and inserting papers into Neo4j  
- Every new paper’s DOI is hashed and logged on-chain via smart contracts  
- Verification endpoint checks blockchain authenticity  

### ** Blockchain (Solidity + Hardhat + Polygon Amoy)**  
- Smart contract stores DOI hashes for tamper-proof verification  
- Deployment handled with **Hardhat** + **Infura RPC provider**  

### ** Frontend (React + D3.js/vis.js)**  
- Landing page with an intelligent search bar  
- Dashboard to browse results or visualize research connections  
- Graph visualization showing relationships between entities  

### ** Data (Crossref API Integration)**  
- Pulled **200+ real papers** from Crossref’s public dataset  
- Automatically populated Neo4j with relationships:  
  - `(Author)-[:WROTE]->(Paper)`  
  - `(Paper)-[:PUBLISHED_BY]->(Publisher)`  
  - `(Paper)-[:HAS_TOPIC]->(Topic)`  
  - `(Paper)-[:USES]->(Dataset)`  
  - `(Paper)-[:CITES]->(Paper)`  

---

##  Tech Stack  
**Backend:** Node.js, Express, Neo4j Driver, Ethers.js  
**Blockchain:** Solidity, Hardhat, Polygon Amoy Testnet, Infura  
**Frontend:** React.js, D3.js, Axios  
**Database:** Neo4j AuraDB  
**Data Source:** Crossref REST API  

---

##  Challenges We Faced  
-  **Gas shortages:** Ran out of Amoy testnet tokens during deployment  
-  **Integration bugs:** Handling ESM vs CJS module imports with Hardhat and ABI  
-  **Backend-blockchain sync:** Ensuring paper logs were consistent between Neo4j and on-chain  
-  **UI Design:** Balancing simplicity with meaningful graph visualization  
-  **Learning Curve:** First time deploying contracts and connecting Neo4j with blockchain  

---

##  Accomplishments We’re Proud Of  
-  Deployed a fully functional smart contract on **Polygon Amoy**  
-  Built a **Neo4j–Blockchain integration pipeline** for academic data  
-  Seeded Neo4j with **hundreds of real research papers**  
-  Enabled **DOI authenticity verification** via smart contracts  
-  Overcame multiple integration, data, and tooling challenges as a team  

---

##  What We Learned  
- Building decentralized knowledge graphs (DKG)  
- Practical blockchain–API–database integration  
- Querying large-scale data in Neo4j  
- The importance of modular design for distributed systems  
- The value of collaboration and persistence through debugging hell 

---

##  What’s Next  
-  **AI integration:** Natural language search + paper summarization  
-  **Wallet integration:** MetaMask/WalletConnect for verified submissions  
-  **Data expansion:** Pull from arXiv, PubMed, and IEEE  
-  **Richer relationships:** Citation networks, co-authorship graphs, topic clustering  
-  **Societal Impact:** Build transparency and accountability in global research  

---

##  Team ScholarGraph  
**Developers:** Tiloschan Karki, Sebika Khulal  

---

## License  
This project is open source under the **MIT License**.
