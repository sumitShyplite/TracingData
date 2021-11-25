const trackingEvent = require('./trackingEvent');

const { trackData: data, trackData } = require("./trackingdata");

let trackingData = async (req, res) => {

    try {

        const showData = [];

        reqTrackingEvent =  trackingEvent?.trackEvent?.data

        let awbNo = req.body.awbNo;

        /* Map , filter , reduce */


        let finalData = data.find( (i) =>{

            if(i.awbNo == awbNo ) {
                return i
            }

        })

        
        ///////////////////////////..........Data Filtering..........///////////////////////////////////////

        let filter = reqTrackingEvent.filter((p) => {

            return p.trackingID == finalData.id;

        })


        ////////////////////////////........Data Sorting............//////////////////////////////////////

        var dataSort = filter.sort((a, b) => {

            return (new Date(b.statusTime).getTime() - new Date(a.statusTime).getTime())


        })

        let intoDays = (1000 * 60 * 60 * 24)

        const state_0 = dataSort.find((x) => {

            return (x.state == 0);

        })

        if (state_0 == undefined) {
            showData.push(`Shipment Is not booked`)
        }

        const state_1 = dataSort.find((x) => {

            return (x.state == 1)

        })

        if (state_1 != undefined) {

            let timeBtwSB_Pick = Math.ceil(Math.max(1, (new Date(state_1.statusTime).getTime() - new Date(state_0.statusTime).getTime()) / intoDays));

            showData.push(`Time Between Shipment Book to Pickup ${timeBtwSB_Pick} day`)

        }

        const state_5 = dataSort.find((x) => {

            return (x.state == 5)

        })

        if (state_5 != undefined) {

            let timeBtwSB_1_OFD = Math.ceil(Math.max(1, (new Date(state_5.statusTime).getTime() - new Date(state_0.statusTime).getTime()) / intoDays));

            showData.push(`Time Between Shipment Book to 1st_OFD ${timeBtwSB_1_OFD} day`)

            let timeBtwPick_1_OFD = Math.ceil(Math.max(1, (new Date(state_5.statusTime).getTime() - new Date(state_1.statusTime).getTime()) / intoDays));

            showData.push(`Time Between Pickup to 1st_OFD ${timeBtwPick_1_OFD} day`)

        }

        const state_7 = dataSort.find((x) => {

            return (x.state == 7)

        });

        if (state_7 != undefined) {

            let timeBtwSB_Del = Math.ceil(Math.max(1, (new Date(state_7.statusTime).getTime() - new Date(state_0.statusTime).getTime()) / intoDays));

            showData.push(`Time Between Shipment Book to Delivery ${timeBtwSB_Del} day`)

            let timeBtwPick_Del = Math.ceil(Math.max(1, (new Date(state_7.statusTime).getTime() - new Date(state_1.statusTime).getTime()) / intoDays));

            showData.push(`Time Between Pickup to Delivery ${timeBtwPick_Del} day`)

            let timeBtw1_OFD_Del = Math.ceil(Math.max(1, (new Date(state_7.statusTime).getTime() - new Date(state_5.statusTime).getTime()) / intoDays));

            showData.push(`Time Between 1st_OFD to Delivery ${timeBtw1_OFD_Del} day`)

        }

        return res.send(showData);

    }

    catch (err) {

        res.send(err);

    }
}

module.exports = { trackingData };

