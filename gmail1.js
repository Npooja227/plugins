
class Gmail {
    /**
     * Constructor 
     */
    constructor() {
        this.serverUrl = `https://plugins.qa.500apps.io/c/plugins`;  //Store server url
        this.userKey = ''; // Store user key to identify user
        this.userJSON = {}; // Store user JSON
        this.cname = "_pt";
        this.apiKey = "";
        this.widgetData = {};
        this.CLIENT_ID = '38128808070-5h36pk8caq9o6t7ut1rukk98hessr3da.apps.googleusercontent.com';
        this.API_KEY = 'AIzaSyDWN2G4LO1QlAmjyInlkbHaxSW9lpH0QMc';
        this.DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
        this.SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';
    }
    handleClientLoad() {
        gapi.load('client:auth2', window._Gmail.initClient);
    }
    initClient() {
        gapi.client.init({
            apiKey: window._Gmail.API_KEY,
            clientId: window._Gmail.CLIENT_ID,
            discoveryDocs: window._Gmail.DISCOVERY_DOCS,
            scope: window._Gmail.SCOPES,
            redirect_uris: "https://plugins.dev.500apps.io/c/plugins/redirect"
        }).then(function () {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(window._Gmail.updateSigninStatus());

            // Handle the initial sign-in state.
            window._Gmail.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            //authorizeButton.onclick = handleAuthClick;
            //signoutButton.onclick = handleSignoutClick;
        }, function (error) {
            //appendPre(JSON.stringify(error, null, 2));
        });
    }
    updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            window._Gmail.getorPostData();
        } else {
            gapi.auth2.getAuthInstance().signIn();
        }
    }
}
(() => {

    (() => {


        //myScript.onreadystatechange = this.readyState === 'complete' ? this.onload() : "";
    })();
})();
window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    window._Gmail = new Gmail();

    let myScript = document.createElement("script");
    myScript.setAttribute("src", "https://apis.google.com/js/api.js");
    myScript.defer = true; myScript.async = true;
    document.body.appendChild(myScript);
    setTimeout(() => {
        window._Gmail.handleClientLoad();
    }, 5000);
})
