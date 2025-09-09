# Table of Contents
**1. Introduction**
- **1.1 Overview**
- **1.2 Glossary**

**2. System Architecture**
- **2.1 Components**
- - **2.1.1 Django Framework**
- - **2.1.2 External APIs Integration**
- - **2.1.3 Encryption Mechanisms**
- **2.2 System Modules**
- - **2.2.1 User Authentication Module**
- - **2.2.2 Exercise and Nutrition Catalogues Module**
- **2.3 Third-Party Components**
- - **2.3.1 API-Ninjas API**
- - **2.3.2 Calorie Ninja**
- - **2.3.3 Cryptography Library**
- **2.4 Overall Design Philosophy**
- **2.5 Module Distribution**
- - **2.5.1 Client-Side Components**
- - - **2.5.1.1 Frontend Framework - React**
- - - **2.5.1.2 Cascading Style Sheets (CSS)**
- - **2.5.2 Server-Side Components**
- - - **2.5.2.1 Application Logic - Django Views and Controllers**
- - - **2.5.2.2 Database Management - Django Models**
- - **2.5.3 External Integrations**
- - - **2.5.3.1 API Integration Module**
- - - **2.5.3.2 Encryption Module**
- - - **2.5.5.1 User Authentication Module**
- - - **2.5.5.2 Interactive User Interface**

**3. High-Level Design**
- **3.1 Entity-Relationship Diagram (ERD)**
- - **3.1.1 FitFlex ERD**
- **3.2 Introduction Diagram**
- - **3.2.1 System Interaction Walkthrough**

**4. Problems and Resolution**

**5. Installation Guide**

**6. Appendicies**

# 1. Introduction
## 1.1 Overview
FitFlex is a health and fitness app designed to help users reach their fitness goals. It has different features, including workout tracking, exercise plans, nutrition tracking, and recovery guidance. The app is built using Django (a web development framework) and React (a JavaScript library for user interfaces). Our data is stored on a remote AWS RDS database so as to allow for multiple users to connect at once. Finally, it also uses third-party APIs to provide exercise and nutrition data, making it easier for users to access a variety of workout and food options.

## 1.2 Glossary
#### Django

Django is a tool that helps developers create websites and web applications quickly. It is written in Python and follows a structure that keeps code organized and efficient. Django makes it easier to build complex applications by handling common tasks like managing databases, setting up web pages, and securing user data. Developers like Django because it speeds up the process of building websites while keeping the code clean and reusable.

#### React.js
Javascript is a library that is used for building user interfaces. It is used to create dynamic and interactive web applications by efficiently managing the updating of components based on changes in data.

#### MySQL (Structured Query Language)
MySQL is an open source relational database management system. ‘Structured Query Language’ is used to manage and manipulate relational databases, allowing users to store, retrieve, update and delete data.
#### Node.js
Node.js is a Javascript runtime built that allows developers to run Javascript outside of the browser. It is efficient for handling multiple concurrent requests and is commonly used for backend services such as API’s. Node is highly scalable and is a high performance application.

#### API (Application Programming Interface)
An API is like a bridge that allows different software applications to communicate with each other. In FitFlex, APIs are used to fetch data about exercises and nutrition from external sources like https://api-ninjas.com/. This means that instead of manually adding thousands of workout routines and food items, the app can pull this data from an existing database. APIs help FitFlex provide users with up-to-date and reliable information, improving the overall experience.

#### Catalogue

A catalogue in FitFlex is a collection of organised data that helps users find what they need. There are two main catalogues:
Exercise Catalogue – A list of different workout exercises.
Nutrition Catalogue – A list of food items with their nutritional values, such as calories, protein, and fats


These catalogues rely on APIs to keep information accurate and up to date, making it easier for users to plan their workouts and meals.

#### Encryption
Encryption is a way of protecting sensitive data by converting it into a secure code that only authorized people can read. In FitFlex, encryption is used to keep user information safe, such as login details and personal fitness data. This ensures that no one else can access or steal user data, keeping privacy and security a top priority. Encryption is commonly used in banking apps, messaging services, and online platforms to prevent hacking and unauthorized access.
#### User Manual
A user manual is a guide that explains how to use an application. FitFlex provides a user manual that contains step-by-step instructions on how to navigate and use different features of the app. It includes:
- Simple explanations of each function
- Screenshots and visuals for better understanding
- Tips and best practices to help users get the most out of the app
- A good user manual makes it easier for both new and experienced users to understand how to use the app effectively.

# 2. System Architecture
This section will give an overview of the system architecture of FitFlex, offering a comprehensive view of the distribution of functionalities across potential system modules. The architecture is systematically designed, emphasising the interconnection between components to achieve the application's core objectives.

## 2.1 Components

### 2.1.1 Django Framework
At the core of FitFlex architecture lies the Django web framework. Employing the Model-View-Controller (MVC) architectural pattern, Django facilitates the seamless integration of the application's data models, user interfaces, and business logic. The Object-Relational Mapping (ORM) system within Django provides a robust mechanism for database interactions, ensuring data consistency and integrity.

### 2.1.2 External APIs Integration
To enrich the application's exercise and nutrition data, FitFlex seamlessly integrates with external APIs, notably  api.api-ninjas.com and api.calorieninjas.com. These APIs serve as vital components, allowing the application to dynamically fetch and update its Catalogues, thereby providing users with an extensive range of exercise and nutrition options.

### 2.1.3 Encryption Mechanisms
Ensuring the confidentiality and security of user data is paramount in FitFlex. The architecture incorporates advanced encryption mechanisms to safeguard sensitive information during storage and transmission. This includes encryption algorithms applied to user credentials, personal information, and any other data requiring protection.

## 2.2 System Modules

### 2.2.1 User Authentication Module
Integral to FitFlex functionality is the User Authentication Module. Using Django's built-in authentication system, this module manages user registration, login, and logout processes. It also plays a crucial role in safeguarding user data and controlling access to various features within the application.

### 2.2.2 Exercise and Nutrition Catalogues Module
The Exercise and Nutrition Catalogues Module serves as the repository for a diverse range of fitness and dietary options. Linked to external APIs, this module dynamically updates its catalogues, providing users with an extensive array of exercises and nutritional data for personal planning.

## 2.3 Third-Party Components

### 2.3.1 API-Ninjas API
The integration with the API-Ninjas API is a pivotal third-party component. It facilitates the real-time acquisition of exercise and nutrition data, ensuring that FitFlex remains up-to-date with the latest information for user planning.

### 2.3.2 Calorie Ninja
The integration with the CalorieNinjas API is an essential third-party feature in FitFlex. It allows the app to retrieve accurate and real-time nutritional data for various food items. By using this API, FitFlex can provide users with detailed information such as calorie content, macronutrients (proteins, fats, and carbohydrates), and other essential nutritional values. This ensures that users can track their meals effectively and make informed dietary choices based on up-to-date data.

### 2.3.3 Cryptography Library
The use of a cryptography library contributes to robust data encryption. It ensures that user-sensitive information remains secure, adhering to industry standards for data protection.

## 2.4 Overall Design Philosophy
FitFlex is designed to be expandable and secure. The system is built in a way that keeps different parts separate, making it easy to update or add new features. It also ensures that user data is well protected. The structure of the app, including both its internal features and external integrations, is carefully planned to create a strong, flexible, and reliable fitness application. 
## 2.5 Module Distribution
### 2.5.1 Client-Side Components
### 2.5.1.1 Frontend Framework - React
The client-side components of FitFlex are built using React and JavaScript, enabling seamless interaction with the Django backend via REST API calls. React dynamically renders UI components and manages state efficiently, ensuring a responsive and interactive user experience. API requests handle data retrieval and updates, allowing real-time synchronisation with the backend for smooth user engagement.
### 2.5.1.2 Cascading Style Sheets (CSS)
Styling and presentation are managed through Cascading Style Sheets (CSS). The modular CSS design ensures consistency in the visual representation across all pages. The distribution of stylesheets is optimized for maintainability and ease of future enhancements.
 
### 2.5.2 Server-Side Components
### 2.5.2.1 Application Logic - Django Views and Controllers
The core of FitFlex business logic resides in Django Views and Controllers. These server-side components handle user requests, process data from the models, and orchestrate the application's response. The modular distribution of views ensures a clean separation of concerns, facilitating code readability and maintenance.
### 2.5.2.2 Database Management - Django Models
The distribution of data management responsibilities falls on Django Models. These server-side components define the structure of the application's database, manage data relationships, and ensure the integrity of stored information. The modular approach allows for efficient database scaling and adaptation to evolving requirements.
### 2.5.3 External Integrations
### 2.5.3.1 API Integration Module
Facilitating seamless interaction with external APIs, the API Integration Module handles the distribution of tasks related to fetching exercise and nutrition data. The modular design allows for easy adaptation to changes in external API endpoints or the addition of new integrations.
### 2.5.3.2 Encryption Module
The Encryption Module, responsible for securing user data, is strategically distributed across the application's architecture. By modularly distributing encryption tasks, the system can efficiently encrypt and decrypt data during storage and transmission, ensuring a robust security layer.
### 2.5.5.1 User Authentication Module
The User Authentication Module is distributed across both client and server sides to manage user interactions securely. Through the distribution of responsibilities, this module ensures the integrity of user accounts, authentication processes, and access control.
### 2.5.5.2 Interactive User Interface
Interactive elements in the user interface are distributed strategically, utilising client-side scripting languages such as JavaScript. This distribution enhances user engagement, providing a responsive and dynamic experience.
The modular distribution of modules within FitFlex architecture reflects a deliberate design philosophy that optimizes performance, security, and maintainability.


# 3. High-Level Design
Outlined here is the high-level design of the FitFlex system, providing a comprehensive view of the relationships between components and the overall environment. This section utilizes an Entity-Relationship Diagram (ERD) showcasing the relationships between key entities and a Walkthrough Diagram to illustrate the flow of interactions within the system.
## 3.1 Entity-Relationship Diagram (ERD)
### 3.1.1 FitFlex ERD
The FitFlex ERD illustrates the key entities and their relationships within the system. Entities such as User, Exercise, Nutrition, and others are represented along with their attributes, depicting the structure of the database and the associations between different components.

![image info](technical_manual/images/Untitled_Diagram.drawio__1_.png)

## Entries and Attributes
#### User Profile
Attributes:
- user: Foreign key linking to the user.
- Full name: First and last name of the user.
- age: Age of the user.
- weight: Weight of the user.
- Profile picture: Upload a profile picture of the user.
 
 
#### Nutrition Log
Attributes:
- user: Foreign key linking to the user.
- date: date of workout creation.
- meal_type: type of meal.
- calories: number of calories.
- protein: digits of calories.
- carbs: digits of carbohydrates.
- fats: digits of fats.
 
 
#### Workout Plan
Attributes:
- user : Foreign key linking to the user.
- created_at: date of workout.
- muscle_group: muscle group thats being used.
- workout_plan: json file with plan.
- notes: user can add notes.

 
## 3.2 Introduction Diagram

![image info](technical_manual/images/Untitled_Diagram.drawio.png)

### 3.2.1 System Interaction Walkthrough
The Introduction Diagram provides a visual representation of the user interaction flow within FitFlex. The following steps outline the key interactions and functionalities demonstrated by the system.
- Home: Users start at the Home page.
- Signup: New users proceed to the signup page to create an account.
- Create Profile: Upon successful signup, users are directed to the Create Profile page.
- Home: Users are sent back to the home page.
- Edit Profile: Users have the option to navigate to the Edit Profile page to modify their profile information.
- Nutrition Tracking: Users can calculate their daily macros on this page.
- Workout Tracking: Users can view their saved workout plans and make new ones and delete old ones.
- Recovery Work: Users can get tips on recovery work on the recovery work page.

- Logout: Users have the option to log out, returning to the Home page.

- Login: Registered users can log back in should they wish.
 

# 4. Problems and Resolution
This section outlines major challenges faced during the design and implementation of the FitFlex project, along with the corresponding solutions.

#### Database MongoDB -> MySQL
- We spent about 2 weeks trying to have our django backend connect to a MongoDB database. We struggled as MongoDB doesn't seem to have a stable version that can interact effectively with django. We only discovered this through a lot of trial and error and further research online.


- After spending much more time than first thought on setting up a simple database, we decided to switch to a much more well known database schema in MySQL. We originally set up a local database however quickly realised that if both of us were to be working on the project at the same time, that we were going to need to have something we could both access and so we decided to set up an AWS RDS MySQL database remotely.

#### Integrating AI, switching to an API
- We spent a lot of time during our first couple of weeks researching how we could use artificial intelligence in our project. As time began to drag on we realised that we didn’t quite have the knowledge or understanding yet for this type of project and we wouldn’t have enough time to keep researching as it would be too late.


- We made the decision to use the Ninja-API’s as they were efficient for the tasks that we needed, as well as they were cost effective. We were very happy with the result and also were able to put into practice some skills we learned in our AI module last semester.

#### User Authentication
- User authentication was a big problem for us about half way through our development stage. We were unable to check why the user information was not being to stored to our user.


- We quickly identified that the main reason for this was that our users were storing as logged in in localStorage but there was no authentication to keep them in the session. After clearing this up we made a lot more progress from that point forward.

#### Saving User Workouts
- Up until the last couple of days we were having a huge amount of trouble with trying to save user generated workouts to their user. Our API was connected and provided workouts but nothing was saving.


- To fix this problem we had to erase our database and recreate it. As well as this we had to delete all of our migration folders and migrate all of our models again as that was the only way of updating our database. Thankfully we were able to solve the issue by ensuring our generated workout was not being stored only in localStorage anymore.

 
# 5. Installation Guide
- Ensure you are connected to a network that has no firewall blockers.

- Ensure you have node.js installed on your local machine and in your current path.

- User must clone the repo from git like te following: git clone https://gitlab.computing.dcu.ie/mcswina2/2025-csc1049-amcswiney-year3project.git


- Navigate to the backend folder and execute: pip install -r requirements.txt


- Then execute: python3 manage.py runserver, you should get a success message.


- Navigate to frontend folder in a seperate terminal and execute: npm install


- After npm is installed run: npm start


- Open a browser to localhost:3000

- You now should have access to our web application.

# 6. Appendicies

**Django:** https://docs.djangoproject.com/en/5.1/

**React:** https://react.dev/

**Node.JS:** https://nodejs.org/docs/latest/api/

**MySQL:** https://dev.mysql.com/doc/

**AWS:** https://docs.aws.amazon.com/rds/

**HTML W3Schools:** https://www.w3schools.com/html/html_intro.asp

**CSS W3Schools:** https://www.w3schools.com/CSSref/index.php

**JavaScript:** https://developer.mozilla.org/en-US/docs/Web/JavaScript

**POSTMAN:** https://learning.postman.com/docs/introduction/overview/

**Ninja API Exercise API:** https://www.api-ninjas.com/api/exercises

**Ninja API Nutrition API:** https://www.api-ninjas.com/api/nutrition

**Useful Youtube links:**
- https://www.youtube.com/watch?v=6diwIYhnCQg
- https://www.youtube.com/watch?v=o-iGrZ7-Ckc
- https://www.youtube.com/watch?v=c-QsfbznSXI

**FreeCodeCamp API help:** https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/

**Useful research and debugging tools:** 
- Youtube
- Google
- ChatGPT (Debugging purposes only)
