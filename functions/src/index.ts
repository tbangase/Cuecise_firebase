import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();
const db = admin.firestore();

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.create_answers_index = functions.firestore.document('answers/{answerId}')
    .onCreate((snap, context) => {
      const answer = snap.data();

      answer.objectID = context.params.answerId
    }
)

// Calculate data with new answers data and old data in userdata
/// Target Data: Recent Week Data, Total Data, Week Average Data

exports.aggregate_data = functions.firestore.document("answers/*")
    .onCreate(async (snap, context) => {

      const newData: FirebaseFirestore.DocumentData = snap.data();
      const answer: string = newData.answer;
      const userId: string = newData.userId;
      const answerDate: Date = newData.answerDate;
      
      // get new data length
      const len: number = answer.length;

      // update to userData
      //   users/doc/weekdata
      //     mon, tue, ...
      var docRef: FirebaseFirestore.DocumentReference = db.doc(`users/${userId}`);
      //const userData: FirebaseFirestore.DocumentSnapshot = await docRef.withConverter(converter).get();
      const userSnapshot: FirebaseFirestore.DocumentSnapshot = await docRef.get();
      //var dataMap = userData.data();
      
      const userData = userSnapshot.data();

      console.log(`Target answer length: ${len}`);
      console.log(`Target answer Date: ${answerDate}`);
      if (userData) {
        console.log(userSnapshot.id);
        console.log(userData.weekData);

        // TODO: Create Recent WeekData
        if (userData.weekData == undefined){
          // Create new weekData
        } else {
          // Get weekData
          //var weekData: Map<Date,string> = userData.weekData as Map<Date, string>;
          
        }

        // var map: Map<string, string> = {
        //   "test": "test"
        // };

        // TODO: Create TotalData
        if (userData.totalData == undefined){
          // Create 
        } else {
          // Update
        }
        // TODO: Create Average WeekData
        if (userData.averageOfTheWeekData == undefined){
          // Create
        } else {
          // Update
        }

      }
    });


exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter
  const original = req.query.text;
  const writeResult =
      await admin.firestore().collection("messages").add({original: original});
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

exports.makeUppercase = functions.firestore.document("message/{documentId}")
    .onCreate((snap, context) => {
      const original = snap.data().original;
      functions.logger.log("Uppercasing", context.params.documentId, original);
      const uppercase = original.toUpperCase();

      return snap.ref.set({uppercase}, {merge: true});
    });
