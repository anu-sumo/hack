import axios from 'axios';


export function getSearchStatus(sessionId) {
    console.log('getSearchStatus');
    const data = {query: `_sourceCategory=stream ${sessionId} explainJsonPlan.ETT !secondaryETT !gurr`,
                  from: Date.now() - 86400000,
                  to: Date.now()
                 }

    var location = ""
    var status = "GATHERING RESULTS"
    var recurringTask = ""

    axios({
        method: 'post',
        url: 'https://api.sumologic.com/api/v1/search/jobs',
        data,
        auth: {
            username: 'suzMlO43koPHDB',
            password: 'HSrzTM4HD5eACKBHdrK1mdWJtUg6g1w6ZRvc3qDqKaXEXvo1bxWxIahNcgmZRTBp'
        }
    })
        .then((response) => {
        if(response.status == 202) {
            console.log(response)
            console.log(response.headers)
            location = response.headers.location
            console.log("location is: " + location)
            recurringTask = setInterval(checkStatus, 2000)

        }})


    function checkStatus() {
        if (status == "DONE GATHERING RESULTS") {
            console.log("worked!!")
            clearInterval(recurringTask);
        }
        axios({
          method: 'get',
          url: location,
          data,
          auth: {
            username: 'suzMlO43koPHDB',
            password: 'HSrzTM4HD5eACKBHdrK1mdWJtUg6g1w6ZRvc3qDqKaXEXvo1bxWxIahNcgmZRTBp'
          }
        }).then((response) => {
          status = response.data.state
        })
    }
}

export function getJenkinsJobStatus(jobUrl) {
    console.log('getJenkinsJobStatus');
    var elm = jobUrl.split('/')
    var sourceName = elm[elm.length-3] + "#" + elm[elm.length - 2];
    console.log(`!gurr _sourceCategory=jenkinsBuildLogs _sourceName=${sourceName}  Finished (SUCCESS OR FAILURE)`)

    const data = {query: `!gurr _sourceCategory=jenkinsBuildLogs _sourceName=${sourceName}  Finished (SUCCESS OR FAILURE)`,
                  from: Date.now() - 86400000,
                  to: Date.now()
                 }

    var location = ""
    var status = "GATHERING RESULTS"
    var recurringTask = ""

    axios({
        method: 'post',
        url: 'https://long-api.sumologic.net/api/v1/search/jobs',
        data,
        auth: {
            username: 'suwyG6Vu8fb1IH',
            password: 'LimHcwvCDDasMkAblE55KyLpve90PpdNUK7v5tRv5pokOBWDpUZlCY1BgeW8Reh6'
        }
    })
        .then((response) => {
                if(response.status == 202) {
                    console.log(response)
                    location = response.headers.location
                    console.log("query finished: " + location)
                    recurringTask = setInterval(checkStatus, 2000)

                }})


            function checkStatus() {
                if (status == "DONE GATHERING RESULTS") {
                    console.log("worked this also!!")
                    clearInterval(recurringTask);
                }
                axios({
                  method: 'get',
                  url: location,
                  data,
                  auth: {
                    username: 'suwyG6Vu8fb1IH',
                    password: 'LimHcwvCDDasMkAblE55KyLpve90PpdNUK7v5tRv5pokOBWDpUZlCY1BgeW8Reh6'
                  }
                }).then((response) => {
                  status = response.data.state
                })
            }
        }

// getSearchStatus("DC657E34E3C4D658")
//getJenkinsJobStatus("https://jenkins.kumoroku.com/job/Master-PR-Linearbuild-Flow/57699/")
