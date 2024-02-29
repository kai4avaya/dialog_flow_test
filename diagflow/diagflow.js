require('dotenv').config();

// const {SessionsClient} = require('@google-cloud/dialogflow');
const {generateSessionId} = require('../utils/gen_sess_id');

// // Updated small talk queries
// const queries = [
//   'How are you today?',
//   // 'Tell me a joke',
//   // 'What is the weather like?'
// ];

// // Configuration using environment variables and utility function
// const config = {
//   projectId: process.env.PROJECT_ID,
//   agentId: '9e23b7f1-eb60-4024-a5f1-3a29f6576865', // Agent ID here
//   sessionId: generateSessionId(),
//   languageCode: process.env.LANGUAGE_CODE,
//   location: 'us-east1', // Specifying the region
// };
// const sessionClient = new SessionsClient({
//   apiEndpoint: 'u3qeudf2kbltpa5xilq8l-dialogflow.googleapis.com',
// });

// // Instantiates a session client for the specific region
// // const sessionClient = new SessionsClient({
// //     apiEndpoint: 'us-east1-dialogflow.googleapis.com', // Regional API endpoint
// // });
// async function detectIntent(projectId, location, agentId, sessionId, query, languageCode, contexts=null) {
//   // Corrected the sessionPath to include the agentId
//   const sessionPath = sessionClient.projectLocationAgentSessionPath(
//     projectId,
//     location,
//     agentId,
//     sessionId
//   );

//   const request = {
//     session: sessionPath,
//     queryInput: {
//       text: {
//         text: query,
//         languageCode: languageCode,
//       },
//     },
//   };

//   // Include contexts if they exist
//   if (contexts && contexts.length > 0) {
//     request.queryParams = {contexts};
//   }

//   // Make the detectIntent call
//   const responses = await sessionClient.detectIntent(request);
//   return responses[0];
// }

  
// async function executeQueries(projectId, sessionId, queries, languageCode, location) {
//     let context;
//     let intentResponse;
//     for (const query of queries) {
//         try {
//             console.log(`Sending Query: ${query}`);
//             intentResponse = await detectIntent(projectId, sessionId, query, context, languageCode, location);
//             console.log('Detected intent');
//             console.log(`Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`);
//             context = intentResponse.queryResult.outputContexts;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }


// // Execute the queries with the updated configuration
// executeQueries(config.projectId, config.sessionId, queries, config.languageCode, config.location, config.agentId);

require('dotenv').config();

const {SessionsClient} = require('@google-cloud/dialogflow-cx');

// Your specific configurations
const projectId = 'avaya-test-415717';
const location = 'us-east1'; // Assuming your agent is located in us-east1
const agentId = '9e23b7f1-eb60-4024-a5f1-3a29f6576865';
const query = 'Hello'; // Example query, adjust as needed
const languageCode = 'en';

// Instantiate a session client with the regional endpoint
const client = new SessionsClient({
  apiEndpoint: 'us-east1-dialogflow.googleapis.com',
});

async function detectIntentText() {
  const sessionId = Math.random().toString(36).substring(7);
  const sessionPath = client.projectLocationAgentSessionPath(
    projectId,
    location,
    agentId,
    sessionId
  );
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
      },
      languageCode,
    },
  };
  const [response] = await client.detectIntent(request);
  for (const message of response.queryResult.responseMessages) {
    if (message.text) {
      console.log(`Agent Response: ${message.text.text}`);
    }
  }
  if (response.queryResult.match.intent) {
    console.log(
      `Matched Intent: ${response.queryResult.match.intent.displayName}`
    );
  }
  console.log(
    `Current Page: ${response.queryResult.currentPage.displayName}`
  );
}

detectIntentText().catch(console.error);
