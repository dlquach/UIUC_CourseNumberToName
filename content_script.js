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

loadDependency("chrome-extension://femoppemmdinldnnjbeopjagpcdgalkd/data.js", executeReplacements);

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
    
    for (var key in data) 
    {
        keyComponents = key.split(' ');
        regexp = new RegExp(key, "gi");
        regexpNoSpace = new RegExp(keyComponents[0] + keyComponents[1], "gi");
        v = v.replace(regexp, "$& (" + data[key] + ")");
        v = v.replace(regexpNoSpace, "$& (" + data[key] + ")");
    }

    textNode.nodeValue = v;
}


