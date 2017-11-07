module.exports = function getFlightDetail(ipData){

    //
    // if(ipData.index('p')||ipData.contains('P')){
    //     console.log("PNR");
    // } else {
    //     console.log("Bag Tag");
    /// }
    try{
        var mockedData = require('../flights.data.json');
        // console.log("hello heloo", JSON.stringify(mockedData));
        var counter, counter1, flightData, flightFound=false;
        for (counter = 0; counter < mockedData.length; counter++) {
            flightData = mockedData[counter].data;
            for (counter1 = 0; counter1 < flightData.length; counter1++) {
                if(ipData.toString()=== flightData[counter1].BAG){
                    flightFound = true;
                    break;
                }
            }
            if(flightFound){
                flightFound = counter;
                console.log("myTime: ",mockedData[counter].arrival);
                return Promise.resolve(mockedData[counter].arrival);
            }
        }
    }
    catch(err){
        Promise.reject("error while fetching");
    }
}
