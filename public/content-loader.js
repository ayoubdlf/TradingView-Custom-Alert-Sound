const script = document.createElement('script')
script.src = chrome.runtime.getURL('injector.js')

script.onload = () => {
    script.remove()

    window.addEventListener('load', () => {
        // Forward saved customSound to the injected page script after injector is ready
        chrome.storage.sync.get(['customSound'], ({ customSound }) => {
            if (customSound) {
                window.postMessage({
                    source: 'TradingViewAlertSound',
                    type: 'CUSTOM_SOUND',
                    payload: customSound
                }, '*')
            }
        })
    })
}

document.documentElement.appendChild(script)

// Listen for updates from background.js and forward them to the page
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'CUSTOM_SOUND_UPDATED') {
        window.postMessage({
            source: 'TradingViewAlertSound',
            type: 'CUSTOM_SOUND',
            payload: msg.payload
        }, '*')
    }
})
