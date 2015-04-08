// Code heavily inspired by the cloud to butt extension
walk(document.body);

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

    v = v.replace(/\bcs 241\b/gi, "$& (System Programming)");
    v = v.replace(/\bcs241\b/gi, "$& (System Programming)");
    v = v.replace(/\bCS 225\b/gi, "$& (Data Structures)");
    v = v.replace(/\bCS225\b/gi, "$& (Data Structures)");
    textNode.nodeValue = v;
}


