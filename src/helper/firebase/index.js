import * as admin from 'firebase-admin';

require('dotenv').config();

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.TYPE_FIREBASE,
    project_id: process.env.PROJECT_ID_FIREBASE,
    private_key_id: process.env.PRIVATE_KEY_ID_FIREBASE,
    private_key: process.env.PRIVATE_KEY_FIREBASE,
    client_email: process.env.CLIENT_EMAIL_FIREBASE,
    client_id: process.env.CLIENT_ID_FIREBASE,
    auth_uri: process.env.AUTH_URI_FIREBASE,
    token_uri: process.env.TOKEN_URI_FIREBASE,
    auth_provider_x509_cert_url:
      process.env.AUTH_PROVIDER_X509_CERT_URL_FIREBASE,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL_FIREBASE,
    universe_domain: process.env.UNIVERSE_DOMAIN_FIREBASE,
  }),
});

export default firebaseApp;
