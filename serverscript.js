// OPEN DATA API EXAMPLE

function getOpenData() {
    // Paste your API key here. IMPORTANT: DO NOT PUSH THIS TO GITHUB, STORE KEY IN DB
    // (See documentation on "Managing Private Data" on the "SDK Document" documentation page)
    var apiKey = "fd2948fdde9149cf94c403b3c64d325d";
    if (apiKey == "")
        return '{"error":"No Api Key! Add your key in the server script file."}';

    return proxy.GetProxy('https://api.uwaterloo.ca/v2/foodservices/watcard.json?key=' + apiKey);
}

function getMockData() {
    // If data isn't available, mocked the ideal data here and simulate fetching it.
    // This is a mock FEDs events listing
    var data = {
        "meta": {
            "requests": 250,
            "timestamp": 1456239454,
            "status": 200,
            "message": "Request successful",
            "method_id": 1723
        },
        "data": [{
            "id": 310643,
            "title": "Social Salsa Practice",
            "start": "2016-02-22T21:30:00-05:00",
            "end": "2016-02-22T23:00:00-05:00",
            "url": "http:\/\/www.feds.ca\/event\/social-salsa-practice\/2016-02-22\/"
        }, {
            "id": 308731,
            "title": "AIESEC Global Citizen Info Session",
            "start": "2016-02-23T18:30:00-05:00",
            "end": "2016-02-23T19:30:00-05:00",
            "url": "http:\/\/www.feds.ca\/event\/aiesec-global-citizen-info-session-2\/"
        }, {
            "id": 308970,
            "title": "Vegan Bake Sale",
            "start": "2016-02-24T10:00:00-05:00",
            "end": "2016-02-24T15:30:00-05:00",
            "url": "http:\/\/www.feds.ca\/event\/vegan-bake-sale-2\/"
        }]
    };
    // Need to convert response object to string
    return JSON.stringify(data);
}


// Retreive data from the database
function getStudentData() {
    // Use Student object to retrieve all available student info
    var studentInfo = {
        career: user.Student.Career,
        faculty: user.Student.Faculty,
        departments: user.Student.Departments,
        plans: user.Student.PlanTitles,
        formOfStudy: user.Student.FormOfStudy,
        level: user.Student.Level,
        studentNum: user.Student.StudentNumber
    };

    // Can log the whole object to check what is being returned
    // console.log(studentInfo);

    // Return final result	
    return studentInfo;
}