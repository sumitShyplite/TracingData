const bodyParser = require("body-parser");


const trackingEvent = require('./trackingEvent');

let trackingData = async(req,res)=>{

    try{

        const showData = [];

reqTrackingEvent = trackingEvent.trackEvent.data;

///////////////////////////..........Data Filtering..........///////////////////////////////////////

let trackingID = req.body.trackingID ;

let filter = reqTrackingEvent.filter((p) => {

    return p.trackingID == trackingID;

})

console.log("filter-======", filter)

////////////////////////////........Data Sorting............///////////////////////////////////////

var dataSort = filter.sort((a, b) => {

    return ( new Date( b.statusTime ).getTime() - new Date( a.statusTime ).getTime() )


})

const state_0 = dataSort.find((x) => {

    return (x.state == 0);

})

const state_1 = dataSort.find((x) => {

    return (x.state == 1)

})

const state_5 = dataSort.find((x) => {

    return (x.state == 5)

})

const state_7 = dataSort.find((x) => {

    return (x.state == 7)

})

///////////////////////////////......Finding  Time....... ///////////////////////////////////////

let intoDays = (1000 * 60 * 60 * 24);

let timeBtwSB_Pick = Math.ceil(Math.max(1, (new Date(state_1.statusTime).getTime() - new Date(state_0.statusTime).getTime()) / intoDays ));

console.log("Time Between Shipment Book to Pickup", timeBtwSB_Pick, "day")

showData.push(`Time Between Shipment Book to Pickup ${timeBtwSB_Pick} day`)


let timeBtwSB_1_OFD = Math.ceil(Math.max(1, (new Date(state_5.statusTime).getTime() - new Date(state_0.statusTime).getTime()) / intoDays ));

console.log("Time Between Shipment Book to 1_OFD", timeBtwSB_1_OFD, "day")

showData.push(`Time Between Shipment Book to 1_OFD ${timeBtwSB_1_OFD} day`)


let timeBtwSB_Del = Math.ceil(Math.max(1, (new Date(state_7.statusTime).getTime() - new Date(state_0.statusTime).getTime()) / intoDays ));

console.log("Time Between Shipment Book to Delivery", timeBtwSB_Del, "day")

showData.push(`Time Between Shipment Book to Delivery ${timeBtwSB_Del} day`)


let timeBtwPick_1_OFD = Math.ceil(Math.max(1, (new Date(state_5.statusTime).getTime() - new Date(state_1.statusTime).getTime()) / intoDays ));

console.log("Time Between Pickup to 1_OFD", timeBtwPick_1_OFD, "day")

showData.push(`Time Between Pickup to 1_OFD ${timeBtwPick_1_OFD} day`)



let timeBtwPick_Del = Math.ceil(Math.max(1, (new Date(state_7.statusTime).getTime() - new Date(state_1.statusTime).getTime()) / intoDays ));

console.log("Time Between Pickup to Delivery", timeBtwPick_Del, "day")

showData.push(`Time Between Pickup to Delivery ${timeBtwPick_Del} day`)


let timeBtw1_OFD_Del = Math.ceil(Math.max(1, (new Date(state_7.statusTime).getTime() - new Date(state_5.statusTime).getTime()) / intoDays ));

console.log("Time Between 1_OFD to Delivery", timeBtw1_OFD_Del, "day")

showData.push(`Time Between 1_OFD to Delivery ${timeBtw1_OFD_Del} day`)



    
    }
    catch(err){

        res.send(err);

    }
}

module.exports = {trackingData};

