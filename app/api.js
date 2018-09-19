import axios from 'axios';


export function getSearchStatus(sessionId) {
    console.log('getSearchStatus');
    const params = {
        "query": `_sourceCategory=stream ${sessionId} explainJsonPlan.ETT !secondaryETT !gurr`,
        "from": "$now - 1.day", //TODO
        "to": "$now" //TODO
    }


    axios({
        method: 'post',
        url: 'https://api.sumologic.com/api/v1/search/jobs',
        auth: {
            //TODO: add corrrect auth.
            username: 'sumQrgDt6FGyth',
            password: 'PX2lk0cM9JlgvXED6UPvR21X9gwzsfHAgnQNLbEQX4VFWmaXcOS8kdkARy5hyZkj'
        }
    })
        .then((response) => console.log(response)) //TODO;

}




