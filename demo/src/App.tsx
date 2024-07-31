import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [isLoad, setIsLoad] = useState(false)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)

  const startAudio = async (context: AudioContext) => {
    console.log("startAudio")
    await context.audioWorklet.addModule('/processors/wasm-worklet-processor.js');
    const oscillator = new OscillatorNode(context);
    const bypasser = new AudioWorkletNode(context, 'wasm-worklet-processor');
    oscillator.connect(bypasser).connect(context.destination);
    oscillator.start();
  };

  const loadAudioContext = () => {
    let ctx: AudioContext
    // if (!audioContext) {
    // }
    ctx = new AudioContext()
    setAudioContext(ctx)
    console.log("Loaded: AudioContext")
    return ctx;
  }

  useEffect(() => {
    setIsLoad(true)
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
          let ctx: AudioContext
          if (!audioContext) {
            ctx = loadAudioContext();
          } else {
            ctx = audioContext
          }
          await startAudio(ctx);
          ctx.resume();
        }}
      >start audio</button>
    </main>
  )
}

export default App
