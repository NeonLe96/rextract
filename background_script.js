async function openPage() {
    console.log("Running OpenPage() function New");

    // Creating an array to store all the tab ids
    let idArray = [];
    //handler functions for executeScript
    function onExecuted(result) {
    }
    function onError(error) {
        console.log(`Error: ${error}`);
    }
    // Put all the tab ids into the array
    let querying = browser.tabs.query({ url: "*://rule34video.com/video/*" });

    querying.then((objects) => {
        for (const object of objects) {
            idArray.push(object.id);
        }
        // Run the same content script to get the URL of image
        // and send the URL back to the background script
        for (let id of idArray) {
            console.log("working on tab id " + id);
            const executing = browser.tabs.executeScript(id, {
                file: "content_script.js",
                allFrames: true
            });
            executing.then(onExecuted, onError);
        }
    });

}

async function downloadTheReturnedUrl(mess) {
    let downloadCompleted = browser.downloads.download(
        {
            url: mess
        }
    );
    await downloadCompleted;
}

browser.runtime.onMessage.addListener(downloadTheReturnedUrl);
browser.browserAction.onClicked.addListener(openPage);