import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
 export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hola desde Cloud Functions :D");
 });

 export const byeWorld = functions.https.onRequest((request, response) => {
    response.send("Adios desde Cloud Functions :D");
   });

 

