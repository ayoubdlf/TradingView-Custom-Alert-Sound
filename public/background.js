// Relay messages from the popup to the active tab's content script

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.type === 'CUSTOM_SOUND_UPDATED') {
        // Forward to the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            if (tab?.id) {
                chrome.tabs.sendMessage(tab.id, msg)
            }
        })
    }
})