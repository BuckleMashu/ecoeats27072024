This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).
# To start using the application
   1. Ensure you have both Android Studio and JDK Development Kit installed and working.
   2. Download this project and extract it in a folder.
   3. run 'npm install' in the terminal of this project's folder directory.
   4. delete '.gradle' in the android folder.
   5. turn off your antivirus temporarily and runs Android Studio as Administrator.
   6. opens the project's adroid folder in Android Studio.
   7. clicks the 4-horizontal line at the top left corner -> invalidate caches -> Invalidate and Restart.
   8. Once it fully completes, go to back to the project's terminal and run 'npx react-native start'.
   9. press 'a' to run as android.
   10. Press 'run' (the green triangle on top of the screen in Android Studio). 
   11. Replace the ecoeats.db in the device's /data/data/com.ecoeats27072024/databases with a populated one.

Main Contributors:
-Cuong
-Nicole

Side Contributors:
-Xiang En (Login page's frontend)
-Winnie (a portion of Explore page's backend)

----------------------------------------------------------------------------------------------------------------------------------------
                                                      ABOUT THIS PROJECT
----------------------------------------------------------------------------------------------------------------------------------------
For our module Agile Software Development (CM2020-01 from the University of London),  we are tasked with developing an application that solves a community problem.
Driven by common interest, we decided to focus on coding an application that could tackle 'Food Waste' challenges. Thus, this is an early prototype of our application, EcoEats.

EcoEats is a community-driven mobile application built with React Native that promotes sustainability by reducing food waste through local food sharing. Users can post, discover,
and claim surplus food or discounted deals from individuals and businesses. This prototype features a share page, explore recommendations, business deals, user profiles, 
authentication, and interactive elements like comments and likes.

Designed with eco-friendliness and affordability in mind, EcoEats aims to empower users to contribute to environmental efforts while showing how we can easily access budget-friendly 
food options. Built using Agile and Test-Driven Development principles, this prototype also incorporates a method of secure authentication and image upload via the Imgur API. While 
certain advanced features like geolocation and real-time chat were deferred for now, the core of the application should be fully functional and ready for further iteration of work.

Snippet from our Report:
- Back-end design
  
   The most significant changes in our project is the transition from a mobile-friendly website to a mobile application. This shift led to a change in the language we used. Initially,
   the project was to be built using HTML, JavaScript, and CSS. However, moving to mobile app development requires us to use TypeScript, the primary language for React Native development.
   Additionally, since the project is now a mobile application, there is no longer a need to set up Node.js.

   We opted to use local SQLite databases instead of an online database such as MongoDB. While this decision limits the application's current functionality to being a demonstration, 
   it simplifies the development process. Fortunately, the robust planning of the application's architecture allows the transitioning to a proper online database in the future can be 
   accomplished with ease.

   We also decided to remove the proposed geolocation service as we realised that setting up a database with the exact coordinates of all restaurants in Singapore would be extremely 
   time-consuming to complete within the project's timeframe.

   ![Screenshot]() #images/screenshot.png
  
   [Figure 4.7: A snippet of code that required to use GoogleMap API in React-Native]

   The differences between initial and final database designs are apparent. The proposal's Entity-Relationship Diagram (ERD) included several unnecessary tables, such as separate 
   tables for different account types. In contrast, the final database design only utilises two tables: "User" and "User_credentials". Account types in the final design are 
   differentiated by a value in the "type" column within the "User_credentials" table. This simplification aims to reduce complexity while efficiently fulfilling the application's 
   requirements. Overall, a more simple concise design can help the development process in the long term.

   ![Screenshot]() #images/screenshot.png
  
   [insert the new ERD table]

   ![Screenshot]() #images/screenshot.png
  
   [insert the proposed ERD table]

...
- Product’s core components
  
   The prototype in the proposal reports consists of the following pages: Share, Request, Explore, Deals, and User, with each serving distinct functions.

   - Share Page
     
   The Share page functions as the home page, enabling users to view food or objects others are willing to share or donate. All users, regardless of their login status, can browse
   these posts and tap on them to access the Request page for detailed descriptions and to make a meeting request. 
   Logged-in users have the additional capability to create new sharing posts. The page also features a search bar and a filter system to allow users to filter the displayed posts by category.
  
   ![Screenshot]() #images/screenshot.png
  
   [insert image of the Share page]

   - Explore Page
     
   The Explore page offers similar functionalities to the Share page but focuses on user recommendations of restaurants and activities across various price ranges. Posts on this
   page include detailed reviews, and users can view the number of likes and comments associated with each post. Only logged-in users can like or comment on these posts.

   ![Screenshot]() #images/screenshot.png

   [insert image of the Explore page]

   - Deals Page
     
   This page displays discounts and offers from eateries and services that collaborate with the platform. Logged-in users can claim these offers. Like the Share and Explore pages,
   the Deals page includes a search bar and a filter system to narrow down the types of restaurants or activities shown.

   ![Screenshot]() #images/screenshot.png

   [insert image of the Deals page]

   - User Page
     
   Two types of user accounts, normal users and business accounts, are differentiated with the business account having the ability to post new deals. 
   The User page displays all posts made by the user across both the Share and Explore pages. Logged-in users can follow other profiles, share profiles via links, and view posts
   they have liked. Otherwise, not logged-in users will be redirected to the login page if they attempt to view any profiles. A registration page is also available for new users.

   ![Screenshot]() #images/screenshot.png

   [insert image of the User page]

...
- Design Details
  
   - Share page (Home page)
     
   ![Screenshot]() #images/screenshot.png
     
   - Share page – Post

   ![Screenshot]() #images/screenshot.png

   - Share page - Post’s request popups

   ![Screenshot]() #images/screenshot.png

   - Share page - Add post

   ![Screenshot]() #images/screenshot.png

   - Explore page

   ![Screenshot]() #images/screenshot.png

   - Explore page – Post

   ![Screenshot]() #images/screenshot.png

   - Explore page - Add post

   ![Screenshot]() #images/screenshot.png

   - Deals page

   ![Screenshot]() #images/screenshot.png

   - Deals page – Post

   ![Screenshot]() #images/screenshot.png

   - Deals page - Add deal

   ![Screenshot]() #images/screenshot.png

   - User page

   ![Screenshot]() #images/screenshot.png

   - User page - change profile picture and/or name popups

   ![Screenshot]() #images/screenshot.png

   - Login page

   ![Screenshot]() #images/screenshot.png

   - Register page

   ![Screenshot]() #images/screenshot.png

...
- Development Process Details
   .Required modules 
   - React Native
     
      React Native is a popular framework developed by Facebook that enables developers to build mobile applications using JavaScript and React. It allows
      for the development of cross-platform applications with a single codebase, which can run on both iOS and Android devices.

      React Native served as the foundation of our app development, enabling us to build a cross-platform application with a single codebase. This significantly 
      streamlined the development process. However, setting up the development environment proved challenging, especially for those unfamiliar with emulators and 
      virtual machines. 

      To overcome this, we standardised our project initialisation process and ensured all team members were adept at using the necessary tools. We employed several 
      libraries to enhance our React Native project. These included React Native (react-native), which provided the core framework; React Native File System (react-native-fs) 
      for handling file operations and React Native Image Picker (react-native-image-picker) for handling image selection from the device. These libraries provided 
      essential functionality but also introduced their own set of challenges, which we addressed through careful implementation and problem-solving.

      Each of these libraries brought specific benefits but also required us to tackle various challenges, such as navigating between pages, managing file storage, 
      and ensuring consistent UI across devices.

   - SQLite
     
      SQLite is a lightweight, self-contained SQL database engine that is widely used for local data storage in mobile applications. It is known for its simplicity
      and ease of integration, making it a popular choice for mobile developers.

      For local data storage, we selected SQLite and utilised the react-native-sqlite-storage library to integrate it into our app. The initial setup presented significant 
      hurdles. Our first attempt to store the database in the Android assets folder failed because it did not support row insertion during runtime. Additionally, installing 
      the app resulted in the creation of an empty database file, complicating our data management. To address these issues, we implemented a workaround by manually copying 
      a pre-populated database file into the app’s data directory. This solution, while effective during development, had limitations for production deployment. Despite these 
      challenges, this approach allowed us to create a functional database capable of handling data operations effectively.

   - Axios
     
      Axios is a promise-based HTTP client for JavaScript that simplifies the process of making network requests. It is widely used for interacting with APIs and handling 
      asynchronous operations. Axios was chosen to handle HTTP requests, particularly for interacting with APIs like Imgur. As a promise-based library, Axios streamlined
      our process for making network requests and managing asynchronous operations. Integrating Axios into the app was relatively straightforward, but ensuring flexible
      handling of network requests, especially for image uploads, was crucial.

   - Imgur API
     
      Imgur API is a web service provided by Imgur, a popular image-sharing platform, which allows developers to upload, retrieve, and manage images. The Imgur API was integrated
      to facilitate image uploads and storage, which was a key feature of our app.

      Initially, we struggled with displaying dynamic images stored as local directory URLs in variables, due to React Native's requirement for static image handling. To resolve 
      this, we implemented a script to map all images to their corresponding local directory URLs. This resulted in the issue that we were unable to add in new images dynamically, 
      since the project’s root folder can’t be access during the application runtime.

      Subsequently, we moved to using Imgur to store/host our application images. Integrating the Imgur API allowed users to upload images, which allows us to receives the image’s
      Imgur URL and then store it in the database. This process allows us to display all images of all posts across different devices without issue. This solution not only addressed 
      the limitations of static image handling but also provided a scalable and flexible method for managing user-generated content.

   - Application Structure
     
      The /models folder, which contains index.ts, defines the data structures we use across the application. This ensured that our data remains consistent and reliable across
      different pages, which is essential for smooth integration with other parts of the app.

      The /modules folder contains modules that play a vital role in handling repeated sections in the application such as displaying posts.
      These modules are designed to keep the functionality modular and manageable.

      The /screens folder is where we’ve put all the different pages to display and for users to interact with.

      Finally, in our root folder, we have key files such as App.tsx and db-service.ts which is to set up the navigation system of the application and to store all back-end 
      SQLite commands for all of the pages respectively.

      As for how everything works together, it begins with the App.tsx. When a user wants to navigate to the UserScreen.tsx, the App.tsx’s BottomTabNavigator helps users switch 
      to the desired page. The App.tsx will then provide the parameter value (userId) which is then used to retrieve the profile details(the queries are stored in the db-service.ts). 
      With all of the necessary information, the profile details are then displayed on the “User” page accordingly.

      ![Screenshot]() #images/screenshot.png
     
      [insert image of the app's file structure]
...
- Libraries installed
  
   @expo/vector-icons: https://www.npmjs.com/package/%40expo/vector-icons
  
   @react-native-picker/picker: https://www.npmjs.com/package/@react-native-picker/picker
  
   @react-navigation/bottom-tabs: https://www.npmjs.com/package/@react-navigation/bottom-tabs
  
   @react-navigation/native: https://www.npmjs.com/package/@react-navigation/native
  
   @react-navigation/stack: https://www.npmjs.com/package/@react-navigation/stack
  
   @types/react-native-sqlite-storage: https://www.npmjs.com/package/@types/react-native-sqlite-storage
  
   @types/react-native-vector-icons: https://www.npmjs.com/package/@types/react-native-vector-icons
  
   axios: https://www.npmjs.com/package/axios
  
   bcrypt: https://www.npmjs.com/package/bcrypt
  
   bcryptjs: https://www.npmjs.com/package/bcryptjs
  
   mysql: https://www.npmjs.com/package/mysql
  
   react: https://www.npmjs.com/package/react
  
   react-native: https://www.npmjs.com/package/react-native
  
   react-native-crypto-js: https://www.npmjs.com/package/react-native-crypto-js
  
   react-native-fs: https://www.npmjs.com/package/react-native-fs
  
   react-native-gesture-handler: https://www.npmjs.com/package/react-native-gesture-handler
  
   react-native-image-picker: https://www.npmjs.com/package/react-native-image-picker
  
   react-native-paper: https://www.npmjs.com/package/react-native-paper
  
   react-native-safe-area-context: https://www.npmjs.com/package/react-native-safe-area-context
  
   react-native-screens: https://www.npmjs.com/package/react-native-screens
  
   react-native-simple-crypto: https://www.npmjs.com/package/react-native-simple-crypto
  
   react-native-sqlite-storage: https://www.npmjs.com/package/react-native-sqlite-storage
  
   react-native-vector-icons: https://www.npmjs.com/package/react-native-vector-icons
  
   sqlite3: https://www.npmjs.com/package/sqlite3

