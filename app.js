var restify = require('restify');
var builder = require('botbuilder');
var getFlightDetail = require('./dataLayer/getDataByBagTag');
var updateLostBagStatus = require('./dataLayer/lostbag.data');
var getIntent = require('./dataLayer/intent');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// This is a dinner reservation bot that uses a waterfall technique to prompt users for input.
var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.send("Welcome to Bag Tracing System.");
        builder.Prompts.choice(session, "How may I help you ?", "Bag Tracing|Lost Bag Tracing", { listStyle: 3});
    },
    function (session, results) {
        console.log("Choice For Bag Tracing: ", results.response);
        session.dialogData.tracingChoice = results.response.entity;
        if(results.response.entity==='Bag Tracing'){
            builder.Prompts.text(session, `You Chose: ${session.dialogData.tracingChoice} <br/>
            Please scan you boarding pass.`);
            builder.Prompts.choice(session, "", "Scan", { listStyle: 3});
        } else if(results.response.entity==='Lost Bag Tracing'){
            builder.Prompts.text(session, `You Chose: ${session.dialogData.tracingChoice}  <br/>
            Please enter you lost tracing bag request id.`);
        }        
    },
    function (session, results) {
        if(session.dialogData.tracingChoice==='Bag Tracing'){
            // builder.Prompts.text(session, `You Chose: ${session.dialogData.tracingChoice} <br/>
            // Please scan you boarding pass.`);
            // builder.Prompts.choice(session, "", "Scan", { listStyle: 3});
            session.dialogData.bagTracingTagNumber = '1234567890';
            //Hit the service and get response for bag.
            session.dialogData.bagTracingResult = 'Belt number 3'
            builder.Prompts.text(session, `You can collect your bag from belt number ${session.dialogData.bagTracingResult}`);
        } else if(session.dialogData.tracingChoice==='Lost Bag Tracing'){
            session.dialogData.lostBagTracingId = results.response;
            //Hit the service and get response for lost bag status.
            session.dialogData.statusForLostTracing = 'Pending'
            builder.Prompts.text(session, `Status for lost bag tracing id ${session.dialogData.lostBagTracingId} is ${session.dialogData.statusForLostTracing}`);
        } 
    },
    function (session, results) {
        // session.dialogData.reservationName = results.response;
        // // Process request and display reservation details
        // session.send(`Reservation confirmed. Reservation details: <br/>Date/Time: ${session.dialogData.reservationDate} <br/>Party size: ${session.dialogData.partySize} <br/>Reservation name: ${session.dialogData.reservationName}`);
        session.endDialog();
    }
]);




// // Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
// var bot = new builder.UniversalBot(connector, function (session) {
//     var userIntent = getIntent(session.message.text);
//     switch (userIntent[0]) {
//         case 'grettings':
//             session.send('hell');
//             session.beginDialog('howMayIHelpYou');
//             break;
//         case 'changeConv':
//             session.send("changing conv");
//             break;
//         case 'bagTracing':
//             session.send("bag tracing");
//             getFlightDetail(session.message.text).then(function (data) {
//                 console.log("data came", data);
//                 session.send("Your flight arrival time is: " + data);
//             }).catch(function (err) {
//                 console.log("error ca,e");
//                 session.send(err);
//             });
//             break;
//         case 'lostBagTracing':
//             session.send("lost bag tracing");
//             break;
//         default:
//             session.send("Sorry.");
//             break;
//     }
// });

// bot.dialog('howMayIHelpYou',[
//     function (session) {
//         var msg = new builder.Message(session);
//         msg.attachmentLayout(builder.AttachmentLayout.carousel)
//         msg.attachments([
//             new builder.HeroCard(session)
//                 .title("How may I help you?")
//                 .buttons([
//                     builder.CardAction.imBack(session, "BAGTRACING", "Bag Tracing"),
//                     builder.CardAction.imBack(session, "LOSTBAGSTATUS", "Lost Bag Status")
//                 ])
//         ]);
//     }
// ] );
// .triggerAction({ matches: /^(HowManyIHelpYou)/i });