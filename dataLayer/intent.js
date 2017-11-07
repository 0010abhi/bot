module.exports = function getIntent(text){
    var intents = require('../intent.json');
    text = text.toUpperCase();
    var counter = 0;
    try{
        for (var key in intents) {
            for(counter=0; counter < intents[key].length; counter++){
                if(text.includes(intents[key][counter])){
                    return [key,text];
                }
            }
        }
    } catch(err){
        return 'INR';
    }
}