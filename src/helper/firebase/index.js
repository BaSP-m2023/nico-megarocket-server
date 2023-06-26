const admin = require('firebase-admin');

require('dotenv').config();

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.TYPE_FIREBASE,
    project_id: process.env.PROJECT_ID_FIREBASE,
    private_key_id: process.env.PRIVATE_KEY_ID_FIREBASE,
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC85G5K+FIJMecu\ng91QgkhDzQ5zaF72U6VekW38WnkHl1LeeuLnQg+GwEv319HP/uXpxwi4q6nbDwlT\nbXr952RzExX3CcP2YyLLABr4QTSK1ktADgbP9aFQpiJ/qjgA4aMRCvgqCFd++WjS\npej9F1m9vxTmKVaAfBFllsTG0K/REkr4GY1qMYNP7F9y46n4oRQADxs0eexRtmBF\nw9mLyqoLnrujcnaaqdr+DiQ3mED9aY1B1TSHvI4dLq4WSzpyGepje7Te3zyY53pF\npJrZJN56/RPOXYvRkdDwv790x8MZ8GGwhU8acsVEcZXLKM0vU9RPdXaHAbsboLvf\n8SlzGFWLAgMBAAECggEAV6Ktbvfda6ms5Z5FIBSJvXcV5MJACI2PNBxJyGIbM8Pn\nrRObUQqLlIuD01VcYOEUPw1aBP+Tuu+zdnLdNI5VwrPQpX/w3E9rNX5zhMkPvPgm\nCm5Xh8Uglf+2Er/g4rvMgVwy/aFIIr9I/C4ANefO+WL9Kbl1CgBFu/miitEIOPkz\nniGmEZdtYz+ZR5UHKXbZGXO2LCBOSHpmYSEEoxtMTs3vI4PBKjuNidx+K6M0kb/P\nb+vvjhWF/L9AXrRrf/NPkbudiLYjmTeE3sNGMVwP7V/+fp7X30HQNKvXuVMDodew\nsFgeq27zw5TGnsIgxeIEyQLH5XngmL/ZX8YuHHHIXQKBgQD4ihbfEuIT/WuaNX1x\nwIxwqJokNkFLdzli2mPPI02NR2jGCyXC2CmzGEipNxTKdC/f6QInBIshgqInJbp6\nAKPzOXC6AMGYLJS0NzAvQu42CdGD7Q2nIfXytWXvvNwqMlYT0cYRsFkyizCm7ynT\ngCKCIABbXkfpJA8mOjAC39A2hwKBgQDCj/sk07rcHAqZEciWTZv5GKHH6qeG5MeS\nQWNIvbhcf0lWXpJveBUwCjpK8kou6EMCNJikeoqVDZU8csM5n1Ppm8FoaVB9SlZA\nDII2OhSmKkUcuJaTR+mRapi7PrTf+rdxo+NBGyC9nvE5Qhw0FhkQHflG0hLvouxk\ncVWEMfpl3QKBgDd6c5KF34tAxVUd3YuXxIGdURMGPVsAGQI055SkN7pylzOl517v\n65b7s7R6BB0RBGLB22YkQH5Rb6q3ZEG5hN9VEhGi+5PhV6xGqW3TTeMoG+mL78E/\n9mugDEoQaUDODaLM756hM7fxlAGfX0HD13AefpXmnLyw/OS2lmL93LdfAoGBAIer\n5zEzA+ZhF3LN19YXoF//MTE7DD8gYZo3Roh+44R8riMwJ2Tbk8rAFw4UDm7PP4rW\nKmrnmKN/qUVRsZkI5XbNSf0JEzuLDsHy9wnhTmzgpPj2LundB56DeqV3gKF/L1Rr\nOBk6VYZkw0luNESN9EQs4prj+phoP/d6oGtifn1xAoGBANBP7y1wdXA2NPCu9kQK\n3miM6roB8/gZ6kAJ8vj7klWlJKzhulZx3XZ5/Q+IVHPfbwaZyReDmifsiK6XTvNW\nfeEmUzmFWGwEslohI1FAwx+sd9cviBdsBjt/Qj+5cEgewmXeoKdSgc1bNXuRObgG\nwmoU5z48D2h7Paorgxyb0O5Q\n-----END PRIVATE KEY-----\n',
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

module.exports = firebaseApp;
