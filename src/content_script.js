// Code from http://stackoverflow.com/questions/950087/include-a-javascript-file-in-another-javascript-file
function loadDependency(depend, callback)
{
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = depend;

    script.onreadystatechange = callback;
    script.onload = callback;

    head.appendChild(script);
}


// Code heavily inspired by the cloud to butt extension
var executeReplacements = function() {
    walk(document.body);
}
loadDependency("chrome-extension://" + chrome.runtime.id + "/data.js", executeReplacements);

// Stolen from the cloud to butt extension
function walk(node)
{
    var child, next;
    switch (node.nodeType)
    {
        case 1:  // Element
        case 9:  // Document
        case 11: // Document fragment
            child = node.firstChild;
            while (child) 
            {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;
       case 3:  // Text node
            handleText(node);
            break;
    }
}

function handleText(textNode)
{
    var v = textNode.nodeValue;
   
    // This regexp captures CS then at least 3 numbers and a comma at least once
    // Ex. CS 101, 241, 373
    testre = new RegExp("CS(\,*\\s*[0-9]{3})+", "gi");
    var results = testre.exec(v);
    if (results != null) 
    {
        var raw = results[0].split(",");
        var result = [];
        for (var ele in raw)
        {
            result.push(raw[ele].replace(/\D/g, ''));
        }
        for (var crn in result) 
        {
            var key = "CS " + result[crn];
            regexp = new RegExp(result[crn], "gi");
            v = v.replace(regexp, "$& (" + data[key] + ")");
        }
    }

    /*
    for (var key in data) 
    {
        keyComponents = key.split(' ');
        regexp = new RegExp(key, "gi");
        regexpNoSpace = new RegExp(keyComponents[0] + keyComponents[1], "gi");
        v = v.replace(regexp, "$& (" + data[key] + ")");
        v = v.replace(regexpNoSpace, "$& (" + data[key] + ")");
    }
    */

    textNode.nodeValue = v;
}


