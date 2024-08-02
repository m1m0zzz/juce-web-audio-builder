import { useEffect, useState } from 'react'
import './App.css'
import WASMProcessorUrl from './wasm/wasm-worklet-processor.js?url'

function App() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)

  const startAudio = async (context: AudioContext) => {
    console.log("startAudio")
    await context.audioWorklet.addModule(WASMProcessorUrl);
    const oscillator = new OscillatorNode(context);
    const bypasser = new AudioWorkletNode(context, 'wasm-worklet-processor');
    oscillator.connect(bypasser).connect(context.destination);
    oscillator.start();
  };

  const loadAudioContext = () => {
    let ctx: AudioContext
    if (!audioContext) {
      ctx = new AudioContext()
      console.log("Loaded: AudioContext")
      setAudioContext(ctx)
      return ctx
    }
  }

  useEffect(() => {
    loadAudioContext()
  })

  return (
    <main>
      <h1>AudioWorklet + WebAssembly</h1>
      <p>GitHub:{" "}
        <a href="https://github.com/m1m0zzz/juce-web-audio-builder/tree/main/demo" target="_blank" rel="noopener noreferrer">
          m1m0zzz/juce-web-audio-builder/demo
        </a>
      </p>
      <button
        onClick={async () => {
          if (!audioContext) {
            console.error("AudioContext does not load!")
            return
          }
          await startAudio(audioContext);
          audioContext.resume();
        }}
      >start audio</button>
    </main>
  )
}

export default App
