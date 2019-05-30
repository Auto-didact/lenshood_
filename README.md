

# Lenshood

[![Backers on Open Collective](https://opencollective.com/apollo-universal-starter-kit/backers/badge.svg)](#backers)
[![Sponsors on Open Collective](https://opencollective.com/apollo-universal-starter-kit/sponsors/badge.svg)](#sponsors)
[![Join the chat at https://gitter.im/sysgears/apollo-fullstack-starter-kit](https://badges.gitter.im/sysgears/apollo-fullstack-starter-kit.svg)](https://gitter.im/sysgears/apollo-fullstack-starter-kit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/sysgears/apollo-universal-starter-kit.svg?branch=master)](https://travis-ci.org/sysgears/apollo-universal-starter-kit)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Twitter Follow](https://img.shields.io/twitter/follow/sysgears.svg?style=social)](https://twitter.com/sysgears)


## Official Website

Visit [www.lenshood.in] to learn about Lenshood. You can also test a [lenshood-demo.herokuapp.com] deployed on 
Heroku.

## Description

This project is based on Appollo Universal Starter Kit

Apollo Universal Starter Kit is an SEO-friendly, fully configured, modular starter project for developing [Universal
JavaScript] applications. You can use our kit to create your applications in JavaScript or TypeScript for all major
platforms &ndash; mobile, web, and server.

Apollo Universal Starter Kit is built with [Apollo], [GraphQL], [React], [Angular], [React Native], [Expo], [Knex.js], 
and [Express] with support for relational databases such as PostgreSQL, MySQL, and SQLite. 

[TypeScript] is our language of choice and we use it across the entire project. However, you can freely mix vanilla 
JavaScript (the ES6 and ES7 syntax) and TypeScript when creating your modules.

The starter kit also integrates [Twitter Bootstrap], [Ant Design], [Ant Design Mobile], and [NativeBase] to provide 
great possibilities for styling for your web and mobile applications.

## Table of Contents

* [Overview](#overview)
    * [Concept](#concept)
    * [Architecture and Implemented Modules](#architecture-and-implemented-modules)
* [Demo](#demo)
* [First Run of Apollo Universal Starter Kit](#first-run-of-apollo-universal-starter-kit)
* [Project Structure](#project-structure)
* [Apollo Universal Starter Kit Documentation](#apollo-universal-starter-kit-documentation)
* [Links](#links)

## Overview

### Concept

Developing client-server-mobile projects in JavaScript never was a trivial task. Not only do you have to spend time
installing the application dependencies and configuring them, but you're also constrained to implement many basic
functionalities over and over again. And you never have time for building a starter codebase that you can reuse across
all of your projects.

To relieve you from the burden of configuring the project, building the application structure, and implementing typical
features, we created Apollo Universal Starter Kit.

Apollo Universal Starter Kit provides you with a client-server-mobile application that you can employ as a foundation
for developing new web or mobile projects using popular tools from the JavaScript ecosystem. But the starter kit doesn't
just creates a mix of top JS technologies. In fact, the kit is powered by several custom libraries and solutions to
simplify managing project configurations, creating new modules, building GraphQL queries, and perform many other tasks.

One such solution that helps to build and configure Apollo Universal Starter Kit without any complications is [SpinJS], 
a custom build tool that configures the project for all the platforms &ndash; web, server, and mobile. With SpinJS, we 
drastically reduced the amount of errors caused by third-party libraries for building JavaScript projects.

The starter kit also consists of many modules that you can augment and adapt to build your specific application, or use 
as a reference when implementing basic features for your applications even if you build them using other technologies.

### Architecture and Implemented Modules

Among all the approaches to building the application architecture, we opt for the _disposable fractal-based modular
architecture_. Thanks to this approach, it's possible to remove any built-in module from Apollo Universal Starter Kit 
without breaking the application. We recommend that you develop your custom modules with the same idea in mind when 
using our starter kit.

Apollo Universal Starter Kit comes with the following modules:

* **Authentication**. Authentication via social networks (Facebook, GitHub, LinkedIn, and Google using OAuth) and 
password-based authentication; refreshing a forgotten password
* **Authorization**. Permission-based authorization with various user roles
* **Contact Us Form**. Functionality to send messages to the server
* **Internationalization**. A complete internationalization solution for the client and server
* **Mobile Chat**. A live chat based on the [React Native Gifted Chat] and powered by GraphQL subscriptions
* **Pagination**. Navigation between pages and presentation of entities
* **Payments**. Functionality for recurring payments based on Stripe
* **Posts and Comments**. Functionality to add, delete, and update posts and comments
* **State Management**. The application state stored in the database and on the client using different approaches
* **404 Not Found Page**. A minimalistic module for handling 404 requests

To learn more about the features and modules available in Apollo Universal Starter Kit, follow to the dedicated section 
[Features and Modules].

## Demo

Here's a demo of Apollo Universal Starter Kit in action:

![screencast](https://user-images.githubusercontent.com/1259926/27387579-c6799ada-56a1-11e7-93fc-d08e9970640d.gif)

You can try out the latest version of Apollo Universal Starter Kit [deployed on Heroku]. If you want to see the mobile
React Native application in action, check out [this demo on Expo.io].

## First Run of Apollo Universal Starter Kit

Verify if you use Node.js 6.x or higher (Node.js ^10 is recommended) before running the starter kit.

1. Clone the stable branch of Apollo Universal Starter Kit.

```
git clone -b stable https://github.com/sysgears/apollo-universal-starter-kit.git
cd apollo-universal-starter-kit
```

2. Install the dependencies. Make sure that you use Yarn 1.0.0 or higher.

```
yarn
```

You can use NPM instead of Yarn to handle the starter kit dependencies and to run scripts. Throughout the Apollo 
Universal Starter Kit documentation, we'll always use Yarn.

3. Seed sample data to the database. The command below will create new tables with sample data in SQLite:

```
yarn seed
```

SQLite is a typical default relational database installed in most Linux distributions including Mac OS X; otherwise, 
consult [SQLite installation guide].

4. Run the starter kit in development mode:

```
yarn watch
```

The server application will be running on [http://localhost:3000], while the client application will be running on 
[http://localhost:8080]. The terminal will tell your the exact ports.

For more information about running this starter kit for mobile development or Docker, consult the [Getting Started] 
guide.

## Project Structure

The project structure presents generally accepted guidelines and patterns for building scalable web and mobile
applications.

The structure is _fractal_ meaning the functionality is grouped primarily by feature rather than by file type. But the
current structure isn't prescriptive, and you can change it however you like.

```
lenshood-dev
├── config                      # Various application configurations
├── docs                        # Documentation
├── node_modules                # Global Node.js modules
├── modules                     # Common project modules
├── packages                    # Application source code
│   ├── client                  # Front-end package
│   │   └── src
│   │   |   ├── app             # React application and common code
│   │   |   ├── modules         # Front-end feature-modules, each module has:
│   │   |   │                   # components, containers, GraphQL queries, and Redux reducers
│   │   |   ├── testHelpers     # Test helper for front-end integration tests
│   │   |   └── index.tsx       # Entry point to web front end with hot code reload
│   |   └── .spinrc.js          # Build configuration for the React application
|   ├── client-angular          # Front-end package
|   │   └── src
|   │   |   └── index.ts        # Entry point to Angular application
│   |   └── .spinrc.js          # Build configuration for the Angular application
│   ├── common                  # Yarn package with common code, a Redux store, and logging
│   ├── mobile                  # Mobile front-end package
│   │   └── src
│   │   |   └── index.ts        # Entry point to mobile front end with live code reload
│   |   └── .spinrc.js          # Build configuration for the server
│   └── server                  # Server package
│       ├── src
│       │   ├── api             # GraphQL API implementation
│       │   ├── database        # Database migrations and seeds
│       │   │   └── migrations  # Database migration scripts with Knex
│       │   │   └── seeds       # Database seed scripts with Knex
│       │   ├── middleware      # GraphQL Playground, GraphQL Express and SSR rendering
│       │   ├── modules         # Back-end feature-modules, each module has:
│       │   │                   # a schema definition, resolvers, and SQL queries
│       │   ├── sql             # Knex connector
│       │   ├── testHelpers     # Test helper for back-end integration tests
│       │   ├── server.js       # GraphQL API server setup
│       │   └── index.ts        # Entry point to back end with hot code reload
│       └── .spinrc.js          # Build configuration for the server
└── tools                       # All build and CLI-related files
```

## Apollo Universal Starter Kit Documentation

Follow to the documentation concerning different aspects of how to run, configure, and develop with Apollo Universal
Starter Kit.

* [Getting Started]
    * [Installing and Running Apollo Universal Starter Kit]
    * [Running the Mobile App with Expo]
    * [Running the Starter Kit in a Mobile Simulator]
* [Running Apollo Universal Starter Kit with Docker]
* [Deploying Apollo Universal Starter Kit to Production]
* [Configuring Apollo Universal Starter Kit]
* [Features and Modules]
* [Writing Code]
* [Available Scripts]
* [Frequently Asked Questions]

Tools

* [Apollo Universal Starter Kit CLI]

Modules

* [Stripe Payments]
* [Mobile Chat]

## Links
[our chat]: https://gitter.im/sysgears/apollo-fullstack-starter-kit
[mit]: LICENSE
[universal javascript]: https://medium.com/@mjackson/universal-javascript-4761051b7ae9
[apollo]: http://www.apollostack.com
[graphql]: http://graphql.org
[jwt]: https://jwt.io
[react]: https://reactjs.org/
[angular]: https://angular.io/
[react native]: https://facebook.github.io/react-native/
[expo]: https://expo.io/
[knex.js]: http://knexjs.org
[express]: http://expressjs.com
[typescript]: https://www.typescriptlang.org/
[twitter bootstrap]: http://getbootstrap.com
[ant design]: https://ant.design
[ant design mobile]: https://mobile.ant.design
[nativebase]: https://nativebase.io
[apollokit.org]: https://apollokit.org
[demo application]: https://apollo-universal-starter-kit.herokuapp.com
[spinjs]: https://github.com/sysgears/spinjs
[react native gifted chat]: https://github.com/FaridSafi/react-native-gifted-chat
[deployed on heroku]: https://apollo-universal-starter-kit.herokuapp.com
[this demo on Expo.io]: https://expo.io/@sysgears/apollo-universal-starter-kit
[stable]: https://github.com/sysgears/apollo-universal-starter-kit/tree/stable
[master]: https://github.com/sysgears/apollo-universal-starter-kit/tree/master
[single]: https://github.com/sysgears/apollo-universal-starter-kit/tree/single
[apollo1]: https://github.com/sysgears/apollo-universal-starter-kit/tree/apollo1
[cli-crud]: https://github.com/sysgears/apollo-universal-starter-kit/tree/cli-crud
[sqlite installation guide]: http://www.sqlitetutorial.net/download-install-sqlite/
[http://localhost:3000]: http://localhost:3000
[http://localhost:8080]: http://localhost:8080
[getting started]: https://github.com/sysgears/apollo-universal-starter-kit/blob/master/docs/gettingStarted.md
[installing and running apollo universal starter kit]: https://github.com/sysgears/apollo-universal-starter-kit/blob/master/docs/gettingStarted.md#installing-and-running-apollo-universal-starter-kit
[running the mobile app with expo]: https://github.com/sysgears/apollo-universal-starter-kit/blob/master/docs/gettingStarted.md#running-the-mobile-app-with-expo
[running the starter kit in a mobile simulator]: https://github.com/sysgears/apollo-universal-starter-kit/blob/master/docs/gettingStarted.md#running-the-starter-kit-in-a-mobile-simulator
[running apollo universal starter kit with docker]: https://github.com/sysgears/apollo-universal-starter-kit/blob/master/docs/docker.md
[deploying apollo universal starter kit to production]: https://github.com/sysgears/apollo-universal-starter-kit/blob/master/docs/deployment.md
[configuring apollo universal starter kit]: https://github.com/sysgears/apollo-universal-starter-kit/blob/master/docs/configuration.md
[features and modules]: https://github.com/sysgears/apollo-universal-starter-kit/blob/master/docs/featuresAndModules.md
[writing code]: https://github.com/sysgears/apollo-universal-starter-kit/blob/master/docs/writingCode.md
[apollo universal starter kit cli]: https://github.com/sysgears/apollo-universal-starter-kit/blob/master/docs/tools/cli.md
[available scripts]: https://github.com/sysgears/apollo-universal-starter-kit/blob/master/docs/yarnScripts.md
[frequently asked questions]: https://github.com/sysgears/apollo-universal-starter-kit/blob/master/docs/faq.md
[stripe payments]: https://github.com/sysgears/apollo-universal-starter-kit/blob/master/docs/modules/stripeSubscription.md
[mobile chat]: https://github.com/sysgears/apollo-universal-starter-kit/blob/master/docs/modules/mobileChat.md
[sysgears inc]: http://sysgears.com
[gitter channel]: https://gitter.im/sysgears/apollo-fullstack-starter-kit
[github issues]: https://github.com/sysgears/apollo-universal-starter-kit/issues
[wiki]: https://github.com/sysgears/apollo-universal-starter-kit/wiki
[faq]: https://github.com/sysgears/apollo-universal-starter-kit/wiki/Frequently-Asked-Questions
[sysgears]: https://sysgears.com
[skype]: http://hatscripts.com/addskype?sysgears
