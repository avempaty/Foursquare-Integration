/* 
    Ajax code from Dynamic Web Coding at dyn-web.com
    Copyright 2007-2015 by Sharon Paine
    For demos, documentation and updates, visit http://www.dyn-web.com/tutorials/ajax/

    Released under the MIT license
    http://www.dyn-web.com/business/license.txt
*/

// method, postData, dataType optional args
var names = [];
var checkins = [];
var userCheckIns = [];
function dw_makeXHRRequest( url, callback, method, postData, dataType ) {
    // check browser support for XMLHttpRequest
    if ( !window.XMLHttpRequest ) {
        return null;
    }
    
    // create request object
    var req = new XMLHttpRequest();
    
    // assign defaults to optional arguments
    method = method || 'GET';
    postData = postData || null;
    dataType = dataType || 'text/plain';
    
    // pass method and url to open method
    req.open( method, url );
    // set Content-Type header 
    req.setRequestHeader('Content-Type', dataType);
    
    // handle readystatechange event
    req.onreadystatechange = function() {
        // check readyState property
        if ( req.readyState === 4 ) { // 4 signifies DONE
            // req.status of 200 means success
            if ( req.status === 200 ) {
                var det = eval( "(" +  req.response + ")");
                if(det.response) {
                    if(det.response.venues) {
                        for(var i = 0; i < (det.response.venues).length; i++) {
                            names[i] = det.response.venues[i].name;
                            checkins[i] = det.response.venues[i].stats.checkinsCount;
                            userCheckIns[i] = det.response.venues[i].stats.usersCount;
                        }
                        //console.log(names);
                        //console.log(checkins);
                    }
                }
                callback.success(req); 
            } else { // handle request failure
                callback.failure(req); 
            }
        }
    }
    req.send( postData ); // send request
    
    return req; // return request object
}
function getData() {
    return [window.names, window.checkins, window.userCheckIns];
}

function dw_encodeVars(params) {
    var str = '';
    for (var i in params ) {
        str += encodeURIComponent(i) + '=' + encodeURIComponent( params[i] ) + '&';
    }
    return str.slice(0, -1);
}
