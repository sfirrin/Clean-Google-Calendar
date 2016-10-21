function updateWebviews(){
    var webview = document.querySelector("webview");
    webview.style.height = document.documentElement.clientHeight + 'px';
    webview.style.width = document.documentElement.clientWidth + 'px';
}

function injectCSS(){
    var webview = document.querySelector("webview");
    webview.addContentScripts([
        {
            name: 'updatedCSS',
            matches: ['https://calendar.google.com/calendar/render/*'],
            css: { files: ['important.css'] },
            run_at: 'document_start'
        }
    ]);
}

function setup(){
    updateWebviews();
    injectCSS();
    var webview = document.querySelector('webview');
    webview.src = 'http://calendar.google.com';
    webview.setZoom(1.1);
    // webview.addEventListener('loadstop', function() {
        webview.addContentScripts([
            {
                name: 'injectedJS',
                matches: ['https://calendar.google.com/calendar/render/*'],
                js: { files: ['calendar_chooser.js'] },
                run_at: 'document_end'
            }
        ]);s
    // });
}


onload = setup;
window.onresize = updateWebviews;
