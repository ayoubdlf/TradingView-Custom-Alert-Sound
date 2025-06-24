import { useEffect, useState } from 'react'
import { DropdownMenu } from '@/ui/components/DropdownMenu'
import { FeatherMusic } from '@subframe/core'
import * as SubframeCore from '@subframe/core'
import { Button } from '@/ui/components/Button'
import { FeatherChevronDown } from '@subframe/core'
import { TextField } from '@/ui/components/TextField'
import { FeatherPlay } from '@subframe/core'


export default function App() {
    const sounds: { title: string; url: string }[] = [
        { title: 'Order Filled', url: 'https://github.com/ayoubdlf/TradingView-Custom-Alert-Sound/raw/refs/heads/main/public/sounds/orderFilled.mp3' },
        { title: 'Goat', url: 'https://github.com/ayoubdlf/TradingView-Custom-Alert-Sound/raw/refs/heads/main/public/sounds/goat.mp3' },
    ]

    const [selectedSound, setSelectedSound] = useState<{ title: string; url: string }>(sounds[0])
    const [customUrl, setCustomUrl] = useState<string>('')
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

    // Init audio
    useEffect(() => {
        if (typeof Audio !== 'undefined') setAudio(new Audio())
    }, [])

    // Load saved sound (once)
    useEffect(() => {
        // @ts-expect-error: chrome API typings missing in this context
        if (window.chrome?.storage) {
            // @ts-expect-error: chrome API typings missing in this context
            window.chrome.storage.sync.get(
                ['customSound'],
                (items: { customSound?: { title: string; url: string } }) => {
                    if (items.customSound) {
                        setSelectedSound(items.customSound)
                    }
                }
            )
        }
    }, [])

    // Whenever selectedSound (or customUrl) changes, update audio.src
    useEffect(() => {
        if (!audio) return

        if (customUrl) {
            audio.src = customUrl
        } else {
            audio.src = selectedSound.url
        }
    }, [selectedSound, customUrl, audio])

    // Save handler
    const handleSave = () => {
        const soundToSave = customUrl
            ? { title: 'Custom MP3', url: customUrl }
            : selectedSound

        // @ts-expect-error: chrome API typings missing in this context
        if (chrome?.storage) {
            // @ts-expect-error: chrome API typings missing in this context
            chrome.storage.sync.set(
                { customSound: soundToSave },
                () => {
                    // Optionally notify content script:
                    // @ts-expect-error: chrome API typings missing in this context
                    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
                        if (tab?.id) {
                            // @ts-expect-error: chrome API typings missing in this context
                            chrome.tabs.sendMessage(tab.id, {
                                type: 'CUSTOM_SOUND_UPDATED',
                                payload: soundToSave,
                            })
                        }
                    })
                }
            )
        }
    }

    return (
        <div className='container max-w-none flex h-full w-full flex-col items-start gap-6 bg-default-background py-6'>
            <span className='text-heading-2 font-heading-2 text-default-font'>
                Custom Alert Sound
            </span>
            <div className='flex w-full flex-col items-start gap-4'>
                <SubframeCore.DropdownMenu.Root>
                    <SubframeCore.DropdownMenu.Trigger asChild={true}>
                        <Button
                            className='h-8 w-full flex-none justify-between'
                            variant='neutral-secondary'
                            iconRight={<FeatherChevronDown />}
                        >
                            {selectedSound?.title || 'Select sound'}
                        </Button>
                    </SubframeCore.DropdownMenu.Trigger>
                    <SubframeCore.DropdownMenu.Portal>
                        <SubframeCore.DropdownMenu.Content
                            side='bottom'
                            align='start'
                            sideOffset={4}
                            asChild={true}
                        >
                            <DropdownMenu>
                                {sounds.map(sound => (
                                    <DropdownMenu.DropdownItem
                                        key={sound.title}
                                        icon={<FeatherMusic />}
                                        onSelect={() => {
                                            setCustomUrl('')
                                            setSelectedSound(sound)
                                        }}
                                    >
                                        {sound.title}
                                    </DropdownMenu.DropdownItem>
                                ))}
                            </DropdownMenu>
                        </SubframeCore.DropdownMenu.Content>
                    </SubframeCore.DropdownMenu.Portal>
                </SubframeCore.DropdownMenu.Root>
                <TextField
                    className='h-auto w-full flex-none'
                    label='Custom MP3 URL'
                >
                    <TextField.Input
                        placeholder='Enter .mp3 file URL'
                        value={customUrl}
                        onChange={event => setCustomUrl(event.target.value)}
                    />
                </TextField>
                <span className='text-caption font-caption text-subtext-color'>
                    Only .mp3 files are supported
                </span>
                <div className='flex w-full items-center gap-2'>
                    <Button
                        className='grow bg-black'
                        onClick={handleSave}
                    >
                        Save Alert Sound
                    </Button>
                    <Button
                        variant='neutral-secondary'
                        icon={<FeatherPlay />}
                        onClick={() => { audio?.play() }}
                    >
                        Test
                    </Button>
                </div>
            </div>
        </div>
    )
}
