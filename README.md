[![CircleCI](https://circleci.com/gh/sulenchy/MyDiary-React-Redux.svg?style=svg)](https://circleci.com/gh/sulenchy/MyDiary-React-Redux) [![Coverage Status](https://coveralls.io/repos/github/sulenchy/MyDiary-React-Redux/badge.svg?branch=chore%2F162992454%2Fintegrate-coveralls)](https://coveralls.io/github/sulenchy/MyDiary-React-Redux?branch=chore%2F162992454%2Fintegrate-coveralls)

### MyDiary React Redux

This consumes the API of MyDiary app

## Getting started
### Prerequisites for installation
1. Node js
2. Express
3. Git

### Installation
1. Clone this repository into your local machine:
```git clone https://github.com/sulenchy/MyDiary-React-Redux```
2. Install the dependencies:
```npm install```
3. Start the application by running the start script:
```npm run start:dev```
4. Test the endpoint using Browser


#### Run Test
```npm test```

## Heroku Link
https://sulenchy-mydiary-react-redux.herokuapp.com/

## API Endpoints Consumed
|   HTTP VERB   | ENDPOINT                  | FUCTIONALITY                                          |
| ------------- | --------------------------| ----------------------------------------------------- |
| GET           | api/v1/entries            | Get all diary entries                                 |                    |
| POST          | api/v1/entries            | Create a new diary entry                              |                    |
| POST          | api/v1/auth/signup        | Register a user                                       |
| POST          | api/v1/auth/login         | Login a user                                          |
| GET           | api/v1/user               | Get a user profile details                            |

# Author
[Sulenchy](https://github.com/sulenchy)