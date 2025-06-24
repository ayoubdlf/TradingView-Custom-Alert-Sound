(() => {
    function initRequire() {
        const wpKey = Object.keys(window).find(k => k.startsWith('webpackChunk'))
        if (!wpKey) throw new Error('webpackChunk not found')
        const wp = window[wpKey]
        wp.push([
            [Math.random().toString(36).slice(2, 5)], // arbitrary chunk id
            {},
            __webpack_require__ => {
                window.__req = __webpack_require__
            }
        ])
    }

    // Find any module via a predicate
    function findModule(predicate) {
        const cache = window.__req.c
        return Object.values(cache).find(predicate)
    }

    // Add a custom sound into the availableSounds
    function addCustomSound({ title, path, filePath }) {
        const mod = findModule(m => {
            const e = m.exports
            return e && Array.isArray(e.availableSounds) && typeof e.play === 'function'
        })
        if (!mod) throw new Error('sound module not found')

        const sound = {
            title,
            path,
            filePath,
            common: true,
            soundForAlerts: true,
            group: 'classic'
        }

        mod.exports.availableSounds.push(sound)
    }

    // Force set new alert sound
    function setAlertSound(soundName) {
        const seen = new WeakSet()
        const targetKey = 'orderExecutedSoundParams'

        function recurse(obj) {
            if (obj === null || typeof obj !== 'object' || seen.has(obj)) return
            seen.add(obj)

            // if this object has the key we want, return it
            if (targetKey in obj) {
                return obj[targetKey]
            }

            // otherwise, dive one level deeper
            for (const k of Object.keys(obj)) {
                let val
                try { val = obj[k] }
                catch { continue } // some properties will throw on access

                const found = recurse(val)
                if (found !== undefined) {
                    return found
                }
            }
        }

        const orderExecutedSoundParams = recurse(window)
        orderExecutedSoundParams.path.setValue(`custom/${soundName}`)
    }


    window.addEventListener('message', (event) => {
        if (event.source !== window) return
        if (event.data?.type === 'CUSTOM_SOUND') {
            const sound = event.data.payload
            initRequire()
            addCustomSound({
                title: sound.title.toUpperCase(),
                path: `custom/${sound.title}`,
                filePath: sound.url
            })
            setAlertSound(sound.title)
        }
    })

})()
