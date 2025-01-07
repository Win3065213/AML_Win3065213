---
Status: "proposed"
Date: "2024-12-31"
Decision-Makers: ["Team Lead", "Database Architect", "Backend Developers"]
Consulted: ["Database Experts", "System Architect"]
Informed: ["Frontend Team", "Stakeholders"]
---

# Adopting Three-Tier Architecture for Advanced Library Management System

## Context and Problem Statement

The Advanced Library Management System is designed to manage the various library resources across multiple branches. The system should be able to support a number of user groups such as library staff, members, administrators, and features such as cataloging, borrowing, returning, viewing, searching, managing digital resources, and membership. It is becoming increasingly challenging single-layer architecture to keep up with user demands such as security, efficient data management, and scalability issues. Furthermore, new features along with more user activities would be more apparent in the future, so we really need to update the system.


## Decision Drivers

* Scalibility: The Advanced Library Management System should be able to support an increasing number of users and a growing collection of physical and digital resources.

* Maintainablity: The Advanced Library Management System should have a modular structure to help with updates and additional features while the system must remain stable.

* Data Security: Library and user information must be kept and managed securely.

* User Experience: The system needs to load fast and have a responsive interface for staffs and members, especially during peak times.


## Considered Options

* Three-Tier or N-Tier Architecture: Will separate the application between layers to increase maintainability, security, and scalability.

* Monolithic Architecture: Will combine all the codes into a single codebase where all the functions are included. This will be very easy and simple initially but hard for modularity and scalibility.

* Microservices Architecture: Will break down the application into smaller independent services, compartmentalizing when necessary. This can scale really well but the setup and managemnet are a bit more complex.


## Decision Outcome

Chosen Option: Three-Tier or N-tier Architecture provides clear separation of concerns, which enhances maintainability and scalability, while keeping the development and deployment complexity manageable, while also being able to add more layers as necessary.


### Consequences

* Good, because it improves maintainability. Modifications and improvements can be made to each layer or component without affecting the entire system.

* Good, because scalibility is enhanced. Horizontal scaling can be implemented to support an increasing number of users and resources.

* Good, because security is increased. User data is kept in the data layer, thus it is harder to get direct access from the Presentation Layer.

* Bad, because the complexity in intial setup and configuration, thus needing more resouces and time for implementation.

* Bad, because communication through layers might have affect performance resulting in some lag and respone times, especially during peak times.


### Confirmation

* The Three-Tier or N-Tier model meets the Advanced Library Management System's requirements for now and in the future. It can be balanced between simplicity and modularity, and the choice has been reviewed by each member of the architecture and development team.
* The N-tier because it allows flexibility in development, thus enabling us to freely add new layers as needed.

## Pros and Cons of the Options

### Monolithic Architecture (hatchworks.com, 2024)

* The Monolithic Architecture has a simple the initial setup and deployment, thus, applications can be developed quickly, and overhead could be reduced.

* Good, because the initial setup and deployment is simplified, thus resulting in faster development and iteration sprintsm while reducing overhead in managing multiple components.

* Good, because it is easier to develop and test as a single codebase, thus it is easier to manage in smaller applications with a straightforward approach.

* Neutral, because it may be suitable for small-scale applications with limited user requirements and features.

* Bad, because it limits in modularity, thus it would be hard to implement or add features without affecting the whole system.


### Microservices Architecture (hatchworks.com, 2024)

* The Microservices Architecture allows using diverse technologies and frameworks.

* Good, because it scales really well while supporting horizontal scaling. Individual services could also be scaled independently based on demand.

* Good, because it increases stability as failure in one service doesn't necessarily affect others, improving overall resilience of the system.

* Neutral, because it can take more time for implementation and deployment as managing multiple services becomes more complex.

* Bad, because a lot of complexity in setup, configuration, and management can be encountered. Thus, requires reliable orchestration and service discovery mechanisms.

* Bad, because the increased overhead of communication between services can lead to more latency issues and complex dubugging processes.

### Three-tier or N-Tier Architecture (N-Tier Architecture Style: Definition and Advantages, 2024)

* Good, because there is clear separation between the layers such as presentation, application, business and data layers.

* Good, because it is easier to develop and deploy compared to microservices, with sufficient scalability for most use cases.

* Neutral because the interfaces need to be designed well to reduce potential bottlenecks.

* Bad, because while scalable, it does not offer the same level of flexibility as microservices.

## More Information

Adopting an N-tier architecture lets the system to scale while remaining mainable and manageable. The approach aligns well with the library management system's needs for maintainability, security and good User Experience.
The system will be monitored and periodically evaluated for performance and scalability, with architecture diagrams and design patterns maintained.