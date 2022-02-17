const config = {
  apiKey: "AIzaSyCzqXfBjj20uvd-T55uegLMh_6Z75aXSDU",
  authDomain: "jobworld-81c06.firebaseapp.com",
  projectId: "jobworld-81c06",
  storageBucket: "jobworld-81c06.appspot.com",
  messagingSenderId: "694771887723",
  appId: "1:694771887723:web:406a8d8878d459ee6c8b2e",
  measurementId: "G-HDF0R49VD1",
};
const PRODUCTION = {
  API_ENDPOINT: "https://jobworld-api.herokuapp.com",
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
      return PRODUCTION;
    }

    case "production": {
      return PRODUCTION;
    }

    default: {
      return PRODUCTION;
    }
  }
}
