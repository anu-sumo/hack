import axios from 'axios';

export function wakeup(objects) {
    console.log('wakeup', objects);
  for(let i = 0; i<objects.length; i++) {
    var current = objects[i]
    switch(current.type) {
      case 'search':
        getSearchStatus(current.id, current.sessionId, current.deployment)
        break;
      case 'build':
        getJenkinsJobStatus(current.id, current.jobUrl)
        break;
      default:
        console.log("Sorry we couldnt find any matching implementation for type : " + `${current.type}`)
    }
  }
}

function getSearchStatus(itemId, sessionId, deployment) {
    var jobName = 'getSearchStatus'
    var queryStr = `_sourceCategory=stream ${sessionId} explainJsonPlan.ETT !secondaryETT !gurr`
    var fromTime = Date.now() - 86400000
    var toTime = Date.now()
    var searchParams = getSearchParams(deployment)
    var location = searchParams.location
    var userNameStr = searchParams.userNameStr
    var passwordStr = searchParams.passwordStr
    var timeOut = 5000

    runAndWaitForResults(location, userNameStr, passwordStr, queryStr, fromTime, toTime, timeOut, jobName, itemId)
}

function getJenkinsJobStatus(itemId, jobUrl) {
    var jobName = 'getJenkinsJobStatus'
    var elm = jobUrl.split('/')
    var sourceName = elm[elm.length-3] + "#" + elm[elm.length - 2];
    var queryStr = `!gurr _sourceCategory=jenkinsBuildLogs _sourceName=${sourceName}  Finished (SUCCESS OR FAILURE)`
    var fromTime = Date.now() - 86400000
    var toTime = Date.now()
    var searchParams = getSearchParams('jenkins')
    var location = searchParams.location
    var userNameStr = searchParams.userNameStr
    var passwordStr = searchParams.passwordStr
    var timeOut = 5000

    runAndWaitForResults(location, userNameStr, passwordStr, queryStr, fromTime, toTime, timeOut, jobName, itemId)
}


function runAndWaitForResults(location, userNameStr, passwordStr, queryStr, fromTime, toTime, timeOut, jobName, itemId) {
    console.log("Starting : " + jobName + " : " + itemId);
    var status = "GATHERING RESULTS"
    var recurringTask = ""

    const data = {
      query: queryStr,
      from: fromTime,
      to: toTime
    }

    axios({
      method: 'post',
      url: location,
      data,
      auth: {
        username: userNameStr,
        password: passwordStr
      }
    }).then((response) => {
      if(response.status == 202) {
        console.log(response)
        console.log(response.headers)
        location = response.headers.location
        console.log("location is: " + location)
        recurringTask = setInterval(checkStatus, timeOut)
      }})


    function checkStatus() {
      if (status == "DONE GATHERING RESULTS") {
          console.log("Yay it WORKED !!" + jobName)
          localStorage.setItem(itemId, 'done');
          clearInterval(recurringTask);
      }
      console.log("local state for item " + itemId + " is: " + localStorage.getItem(itemId))

      axios({
        method: 'get',
        url: location,
        data,
        auth: {
          username: userNameStr,
          password: passwordStr
        }
      }).then((response) => {
        status = response.data.state
      })
    }
    console.log("Done with : " + jobName)
}

function getSearchParams(deployment) {
  switch(deployment) {
    case 'long':
      return {
        location: 'https://api.sumologic.com/api/v1/search/jobs',
        userNameStr: 'suzMlO43koPHDB',
        passwordStr: 'HSrzTM4HD5eACKBHdrK1mdWJtUg6g1w6ZRvc3qDqKaXEXvo1bxWxIahNcgmZRTBp'
      };
      break;
    case 'jenkins':
      return {
        location: 'https://long-api.sumologic.net/api/v1/search/jobs',
        userNameStr: 'suwyG6Vu8fb1IH',
        passwordStr: 'LimHcwvCDDasMkAblE55KyLpve90PpdNUK7v5tRv5pokOBWDpUZlCY1BgeW8Reh6',
      };
      break;
    default:
      console.log("Sorry we don't know the endpoint for " + deployment)
      return null
  }

}

export function test() {
    console.log('test');
}


