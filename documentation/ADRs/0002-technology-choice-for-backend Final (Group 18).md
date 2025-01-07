# Backend Programming Language and Framework Selection for the Advanced Library Management System (Express.js)

## Advanced Library Management System (ALMS)
## Technology Choice for Backend
## Context and Problem Statement

The Advanced Library Management System needs to support multiple user roles such as Library Member and Admin, and handle a large amount of data including transactions and queries. 
It now requires a scalable, efficient back-end framework that would integrate well with the chosen Frontend stack and database systsems.
The development of the Advanced Library Management System is carried out by our team, and a suitable back-end framework will be chosen after careful consideration. 
The solution needs to give great productivity to the developers, integrate seamlessly with frontend and the chosen database system, and offer great performance for the users. The framework should ideally have a strong ecosystem and integration support.

## Decision Drivers

* { Decision Driver 1, e.g., Integration: The framework needs to be able to integrate well with the chosen options, Next.js for Frontend and Mysql for Database.}
* { Decision Driver 2, e.g., Ecosystem and Community Support: The chosen framework should have various resources of libraries and tools. It should also have a healthy, active community for long-time maintainability.}
* { Decision Driver 3, e.g., Ease of Development and Productivity: The chosen framework should offer a relatively smooth learning curve and contain easy-to-use tools and built-in functionalities for faster development.}
* { Decision Driver 4, e.g., Performance and Scalability: The frontend should be able to handle requests efficiently and grow safely together with the increased number of users.}

## Considered Options

* Express.js
* C# with ASP.NET Core
* Java with Spring Boot
* Laravel

## Decision Outcome

## Chosen Option: Express.js (Back-end)

* The advanced Library Management System requires a robust, lightweight and modular architecture, thus,Express.js with Next.js for front-end was chosen, as it also has a unified Javascript codebase.
* Express.js would provide a fast and interactive backend layer.
* This framework with their strong community support and resources satisfy the needs of a robust, scalable, secure library system.
* Express.js was chosen since the language has some of the best server-side rendering flexibility, integration issues and performance in the industry. 
* Even though the other frameworks offer interesting capabilities, Express.js's performance advantages and mature ecosystem is a better choice for the Advanced Library Management System with all its advantages.

### Consequences

* Good, because both frontend and backend frameworks use Javascript and thus, simplifies development, thus, it is easier to learn and maintain.
* Good, because the frameworks are lightweight and modular, thus can support horizontal scaling and has high performance.
* Good, because the large communities for both frameworks help in long-term maintainability and stability.
* Bad, because Express.js may require additional libraries and resources.

### Confirmation

Code and design reviews with team members after getting appropriate feedback from stakeholders will ensure the proper integration and alignment of various technologies, systems and architecture used for the system. 
Express.js, Next,js, together with MySQL will help create a highly-functional, robust, secure, scalable Advanced Library Management System and meet all the requirements. 
Performance tests of API endpoints and Loading times will verify their effectiveness, ensuring they meet all the necessary requirements.


## Pros and Cons of the Options

### Express.js (expressjs.com, n.d.)

* Good, because it has a huge ecosystem with middleware and packages, etc. 
* Good, because it also integrates really well with Next.js and could be a unified Javascript codebase, which could augment the modularity of the project and also be ready for long-term maintainability.
* Good, it is a fast, strong and popular language that is also lightweight
* Neutral, because it doesn't offer much structure and functions initially with a lot of flexibility, which could both be an advantage or a disadvantage depending on the situation, such as being hard to be consistent in larger projects.

### C# with ASP.NET Core(Yerygin, n.d.)

* Good, because it is a comprehensive framework and mostly unnecessary to add more frameworks and is also cross-platform. 
* Good, because it can be very scalable while providing excellent performance and has strong enterprise support.
* Bad, because it could require more resources than lightweight solutions.
* Bad, because it could be harder to train developers due to being harder to learn.

### Java with Spring Boot (Jayeshwarke, 2023)

* Good, because it has a big ecosystem that is mature and has great community support
* Good, because it has secure and robust enter-level features and scalability.
* Bad, because the startup and loadup times could be slower due to its nature
* Bad, because the learning curve could be bigger and contains unnecessary wording sometimes.

### Laravel (dolphinwebsolution, 2024)

* Good, because it has a very dedicated community.
* Good, because it has very secure and reliable features on initial project setup, such as authentication, and ORM.
* Bad, because the language is different (php) from our frontend which is (Next.js with Javascript or Typescript), so the developers may need more time to learn and develop.
* Bad, because the performance could suffer due to not being as lightweight as some frameworks and Node.js.

## More Information

The team has decided to go along with Express.js for the backend of the Advanced Library Management System. The technology choice will be revisited in six months to review the effectiveness and consider if any new features or functions should be added.
