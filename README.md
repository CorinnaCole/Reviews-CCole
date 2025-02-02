# Project Summary

This project is premised on a fictional online retalier - Atelier Fashions - which has requested a comprehensive rebuild of the back end of their e-commerce site, inclusive of the server, controllers and database. The project team is also tasked with migrating the existing data from the old system and for delivering the data in a form that fullfills the contract with the front-end requirements. The overall product must be deployed on Amazon EC2 instances with at least two stand-alone servers and a load balancer to reduce the bottlenecks and latency related to high volume of server traffic. Accordingly, the overall system must be load tested prior to delivery to the client, Atelier Fashions.

The front-end of the site is designed as a series of micro-services, each with its own data set and unique data delivery requirements. Therefore, each member of the project team is responsible for architecting, building and deploying the requisite back-end functionality related to one of these micro-services. I worked on the product reviews. 

Note that while the code of this project is available, the data used is properietary and unavailable in this repo. Similarly, the specific modifications to the NGINX load balancer were made directly on the deployed EC2 instance and are consequently also unavailable. 

**<h1 text-decoration='underline'>Tech Stack</h1>**

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

**<h1 text-decoration='underline'>Database</h1>**

**<h2>1. Selection</h2>** 
The existing data-set was pre-organized into several stand-alone traunches of (at the minimum) 15m+ records in csv files. Furthermore, each record had its own key/id to assist in the look up of associated records (i.e. a single product review may have multiple pictures uploaded by the reviewer). A SQL database was the logical choice for the new database given the data's relational structure.  I selected Postgres for its json building capabilities and strongly supported (and free!) PgAdmin interface. 

**<h2>2. Structure </h2>** 
Below is a diagram of the Atelier Reviews database schema:
![Schema Diagram](./SDC_files/aReviews/ReviewsSchemaDiagram.png) The database contains four tables: 
* *<span>Reviews</span>*: This table contains most of the review content, such as the reviewer's name, the product reviewed, and the written review.
*  *<span>Photos</span>*: The reviewer has the option to upload photos as part of their review. This is a one-to-many relationship (i.e. one review record to many photos). The primary key from the Reviews table is a foriegn key, it is also an indexed relationship from Photos to Reviews.
*  *<span>Characteristics</span>*: On the front-end, the reviewer is invited to rate the product on certain pre-set characteristics which are contingent on the product. For example, a pair of shoes may be rated on 'size' and 'width', but sunglasses may be reviewed on 'style'. The Characteristics table links the product to each of the characteristics on which it may be rated. It is therefore a many-to-many relationship.
*  *<span>Characteristics Reviews</span>*: This table links the reviewer's numeric ratings of all the product's characteristics to the rest of the review. Each row in this table accounts for the reviewer's score of a single characteristic. That characteristic is linked to the product through the charactertic id and connected to the specific review by the review_id.   

**<h2>3. ETL Process </h2>**
The data was provided in CSV files with cumulitively over 31m records. Minimal clean-up was required, other than the product_id required indexing to allow appropriate look-up as well as auto-incrementing to account for event that there were missing ids.

**<h1 text-decoration='underline'>Deployment and Load Testing</h1>**
As noted above, the database, server and NGINX load balancer were deployed on their separate EC2 Instances. When deployed, the system was able to handle 5000 requests per second at ~15ms average response and an error rate hovering around 1%
  

