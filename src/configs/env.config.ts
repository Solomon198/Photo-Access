const {
  REACT_APP_apiKey,
  REACT_APP_authDomain,
  REACT_APP_projectId,
  REACT_APP_storageBucket,
  REACT_APP_messagingSenderId,
  REACT_APP_appId,
  REACT_APP_measurementId,
} = process.env;

const config = {
  apiKey: REACT_APP_apiKey,
  authDomain: REACT_APP_authDomain,
  projectId: REACT_APP_projectId,
  storageBucket: REACT_APP_storageBucket,
  messagingSenderId: REACT_APP_messagingSenderId,
  appId: REACT_APP_appId,
  measurementId: REACT_APP_measurementId,
};

const PRODUCTION = {
  API_ENDPOINT: "https://indigene.herokuapp.com",
  APP_NAME: "Photo Access",
  FIREBASE_CONFIG: config,
};

const DEVELOPEMENT = {
  API_ENDPOINT: "http://localhost:3000",
  APP_NAME: "Photo Access",
  FIREBASE_CONFIG: config,
};

export default function environmentConfig() {
  switch (process.env.NODE_ENV) {
    case "development": {
      return DEVELOPEMENT;
    }

    case "production": {
      return PRODUCTION;
    }

    default: {
      return DEVELOPEMENT;
    }
  }
}
