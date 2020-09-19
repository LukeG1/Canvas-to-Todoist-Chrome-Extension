let changeColor = document.getElementById('changeColor');
changeColor.onclick = function() {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var api_url = document.getElementById('canurl').value;
    var api_key = document.getElementById('canapi').value;

    if(email.length > 0){
        chrome.storage.local.set({"email": email});
    }
    if(password.length > 0){
        chrome.storage.local.set({"password": password});
    }
    if(api_key.length > 0){
        chrome.storage.local.set({"api_key": api_key});
    }
    if(api_url.length > 0){
        chrome.storage.local.set({"api_url": api_url});
    }

    fileData = [];
    chrome.storage.local.get("mykey", function(fetchedData) {
        fileData = fetchedData.mykey
        if (fileData === undefined){
            fileData = []
        }else{
            console.log("Got Data")
        }          
        chrome.storage.local.get(["email","password","api_url","api_key"], function(fetchedData) {
            var url = 'https://lukegabel.pythonanywhere.com';
            var payload = {
                "todoist_email":fetchedData.email, 
                "todoist_password":fetchedData.password, 
                "canvas_url":fetchedData.api_url, 
                "canvas_api_key":fetchedData.api_key,
                "data":JSON.stringify(fileData)
                };
            var output = []
            $.post(url, data=JSON.stringify(payload), function(data, status){
                //console.log(JSON.parse(data));
                if(JSON.parse(data)==0){
                    document.write ("No New Tasks");
                }else if(JSON.parse(data)==1){
                    document.write ("Check your Canvas credientials");
                }else if(JSON.parse(data)==2){
                    document.write ("Check your Todoist credientials");
                }else if(JSON.parse(data)==3){
                    document.write ("Ensure That you have incuded credientials to send");
                }else{
                    chrome.storage.local.set({"mykey": JSON.parse(data)});
                    fileData = data;
                    console.log(fileData)
                    chrome.storage.local.set({"temp": JSON.parse(data)});
                    document.write ("Tasks Succesfullly updated");
                }
            });
        });  
    });
    chrome.storage.local.get("temp", function(fetchedData) {
        chrome.storage.local.set({"mykey": fetchedData.temp});
    });
    // chrome.storage.local.get("mykey", function(fetchedData) {
    //     console.log(fetchedData.mykey)
    // });

};

let cBox = document.getElementById('data_vis');
cBox.onclick = function() {
    chrome.storage.local.set({"cBox": document.getElementById('data_vis').checked});
    if(document.getElementById('data_vis').checked){
        document.getElementById('showhide').hidden = false;
    }else{
        document.getElementById('showhide').hidden = true;
    }
};

let emergency = document.getElementById('emergency');
emergency.onclick = function() {
    chrome.storage.local.set({"mykey": []});
};