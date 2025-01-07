---
status: "proposed"
date: "2024-10-31"
decision-makers: ["Team Lead", "Database Architect", "Backend Developers"]
consulted: ["Database Experts", "System Architect"]
informed: ["Frontend Team", "Stakeholders"]
---
# Database Selection for Advanced Library Management System (MySQL)

## Advanced Library Management System (ALMS)

## Technology Choice for Database
## Context and Problem Statement

The Advanced Library Management System is in need of a fast, secure, reliable, and an easily scalable database to manage a huge amount of data from many library branches. User records, transaction history, access permissions, media information, etc are should be kept securely in a reliable database system. The suitable database system needs to be easily maintained, should be affordable and cost-effective, and be compatible with the library system's architecture. Thus, the database needs to handle multiple user activity efficiently while ensuring data integrity, and supporting complex queries.

## Decision Drivers

* Data Integrity and Reliability: Library data such as records, catalogs and transaction history should be accurate and consistent.
* Ease of Maintenance: administering and managing the database should be simple so that different types of users can use them easily without requiring much additional training and thus, support long-term stability.
* Scalability: The database needs to be able to handle a growing set of data and an increasing number of users, together with the growing library system.
* Compatibility: The database should support the chosen three-tier architecture of the library system and should work seamlessly well witht the architecture.
* Cost-Effectiveness: The chosen database system should be affordable, since the library system's data sets and users will keep on expanding and increasing.


## Considered Options

* MySQL: This is a relational database that is open-source, reliable,beginner-friendly and has a robust community support.
* PostgreSQL: This is a relational database that is rich in features, is open-source, and includes JSON support and complex query handling.
* MongoDB: This is a NoSQL document database, mainly used for scalibility and flexibility needs, and is optimized for unstructured and semi-structured data.
* Oracle: This is a commercial relational database, usually used for ebterorise software, and has advanced security features, robust support for complex transactions, and high-performance.


## Decision Outcome

## Chosen Option: MySQL

MySQL was chosen for the Advanced Library Management System as it is affordable, cost-effective, compatible with the architecture and reliable in managing structured data. It also has great performance, extensive support and has ease of use.


### Consequences

It is an open-source relational database management system that focuses on managing structured data, ACID compliance, and being cost-effective.

* Good, because MySQL has robust community support and extensive documentation, thus troubleshooting and setup is very easy.
* Good, because MySQL is open-source, affordable, and cost-effective, especially as the load of data increases.
* Good, because it integrates well with reporting and analysis tools, since it is compatible with SQL.
* Bad, because it has less support for complex data types compared to alternatives like PostgreSQL. 
* Bad, because MySQL is less flexible when scaling horizontally, and could potentially affect long-term scalibility in large deployments.

### Confirmation

MySQL database will be comfirmed in the advanced library management system's database after reviewing data reliability and performance tests that adhere to the three-tier architecture. Design reviews by corresponding stakeholders will ensure the design and architecture are in syn and the implementation can be carried out smoothly. Any areas of imporvements and/or limitations will be documented along the way.


## Pros and Cons of the Options

### Mysql (blueclawdb, n.d.) (remoteplatz, n.d.)

* Good, because it has widespread usage and popular demand with great community support.
* Good, because it is inherently an optimized system for transactional workloads and structured data.
* Neutral, because it doesn't have much flexibility for semi-structured data like some other databases.
* Bad, because there is less options for advanced indexing than PostgreSQL.

### PostgreSQL (Dhruv, n.d.)

* It is an open-source relational database management system and has a lot of features, including suport for JSON-handling and complex queries.

* Good, because it supports complex SQL capabilities, and can handle advanced data requirements.
* Good, because it can handle JSON and relational data types, and thus, has more flexibility.
* Neutral, because it may require more configuration, and setup to increase performance when compared to MySQL. even though it is open-source.
* Bad, because it is more resource-intensive, potentially costing more when scaling.

### MongoDB (knowledgenile, n.d.)

* It is a NoSQL document database for scalibility and flexibility, optimized for unstructured and semi-structured data.

* Good, because it supports flexible schema designs, thus data structures can be changed and improved without much downtime.
* Good, because it has high scalibility, especially as the applications have increased data requirements.
* Neutral, because it doesn't support native SQL, and could become complicated and challenging to integrate well.
* Bad, because it doesn't have strong relational integrity, thus consistency could affected.


## More Information

MySQL was chosen as it has great community support, good performance in transactional systems and strong relational integrity. All these qualities go along well with our desired system. The team will have to revise the decision if scalibility or flexibiity needs increase greatly.
