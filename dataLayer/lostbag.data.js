var fs = require('fs');
module.exports = function updateLostBagStatus(passData){
    var fileNameJSON = "lostbags.status.json";
    var data = JSON.parse(fs.readFileSync('lostbags.status.json').toString());
    fs.closeSync(2)

    console.log
    // var JSONDATAPROP = passData.BAG + (new Data()).getmilliseconds();
    var JSONDATAPROP = '2345' + (new Date()).getTime();
    var JSONDATAVAL = {
                    "name": "Avi chandra",
                    "bag": "1234567890",
                    "pnr": "p123456789",
                    "mob": "7597390172",
                    "address": "xxxxxxxxx"
    }
    
    data[JSONDATAPROP] = JSONDATAVAL;
    var JSONString = JSON.stringify(data);
    fs.writeFile(fileNameJSON, JSONString, function(err) {
                    if (err) throw err;
                    console.log('JSON Updated!');
    });
}



//     var userIntent = getIntent(session.message.text);
    
//     switch(userIntent[0]){
//         case 'grettings':
//             // session.send("Hello \n Good Morning \n How may i help you ?");
// // Add dialog to return list of shirts available
//             session.beginDialog('howMayIHelpYou');
// // session.send(howMyHelpDailog);
//             break;
//         case 'changeConv':
//             session.send("changing conv");
//             break;
//         case 'bagTracing':
//             session.send("bag tracing");
//             getFlightDetail(session.message.text).then(function(data){
//                 console.log("data came",data);
//                 session.send("Your flight arrival time is: "+ data);
//             }).catch(function(err){
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
