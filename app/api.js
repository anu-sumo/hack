import axios from 'axios';

setInterval(() => {
  let subs = JSON.parse(localStorage.getItem('subscriptions')) || [];
  subs = subs.filter((sub) => !sub.status || sub.status === '' );
  wakeup(subs);

}, 5000);

export function wakeup(objects) {
  for(let i = 0; i<objects.length; i++) {
    var current = objects[i]
    switch(current.type) {
      case 'search':
        getSearchStatus(current.id, current.sessionId, current.deployment)
        break;
      case 'build':
        getJenkinsJobStatus(current.id, current.jobUrl)
        break;
      case 'orgInfo':
        getOrgInfo(current.id, current.orgId, current.deployment)
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
    var splits = jobUrl.split('job/')
    if (splits.length == 2) {
        var elm = splits[1].split('/', 2)
        if (elm.length == 2) {
            var sourceName = elm[0] + "#" + elm[1];
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
    }
}

export function getOrgInfo(itemId, orgId, deployment) {
    var jobName = 'getOrgInfo'
    var queryStr = `cat /shared/aditya/config/organizations | where org_id="${orgId}" | fields org_name,katta_tier,account_type,daily_gb_plan`
    var fromTime = Date.now() - 86400000
    var toTime = Date.now()
    var searchParams = getSearchParams(deployment)
    var location = searchParams.location
    var userNameStr = searchParams.userNameStr
    var passwordStr = searchParams.passwordStr
    var timeOut = 5000

    runAndWaitForResults(location, userNameStr, passwordStr, queryStr, fromTime, toTime, timeOut, jobName, itemId)

}


function runAndWaitForResults(location, userNameStr, passwordStr, queryStr, fromTime, toTime, timeOut, jobName, itemId) {
    console.log("Starting : " + jobName + " : " + itemId);
    var status = "GATHERING RESULTS"
    var messageCount = 0
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
        location = response.headers.location
        recurringTask = setInterval(checkStatus, timeOut)
      }})


    function checkStatus() {
      if (status == "DONE GATHERING RESULTS" && messageCount > 0) {
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
        messageCount = response.data.messageCount
        var newLocation = location + '/records'
        if (status == "DONE GATHERING RESULTS" && jobName == 'getOrgInfo' && messageCount > 0) {
          axios({
            method: 'get',
            url: location + '/records',
            params: {
              offset: 0,
              limit: 1
            },
            auth: {
              username: userNameStr,
              password: passwordStr
            }
          }).then((responseWithRecords) => {
            var organizationInfo = {
              org_name: responseWithRecords.data.records[0].map.org_name,
              account_type: responseWithRecords.data.records[0].map.account_type,
              katta_tier: responseWithRecords.data.records[0].map.katta_tier,
              daily_gb_plan: responseWithRecords.data.records[0].map.daily_gb_plan
            }
            console.log(organizationInfo)
            localStorage.setItem(itemId, JSON.stringify(organizationInfo))
          })
        }
      })
    }
    console.log("Done with : " + jobName + " : " + itemId);
}

function getSearchParams(deployment) {
  deployment = deployment.trim()
  switch(deployment) {
    case 'long-prod':
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

/*
localStorage.setItem(1, 'running');
localStorage.setItem(2, 'running');
localStorage.setItem(3, 'running');
getSearchStatus(1, "286AE9BCD0E2436B", "long")
getJenkinsJobStatus(2, "https://jenkins.kumoroku.com/job/Master-PR-Linearbuild-Flow/57753/")
getOrgInfo(3, '0000000000000005', 'long-prod')
*/
