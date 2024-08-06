# juce-web-audio-builder
Convert JUCE code to Web Audio API AudioNode. (🧪Experimental implementation)

## Using
- JUCE
- CMake
- vite + React + SWC
- WebAssembly
- Web Audio API
- AudioWorklet

## Roadmap

- [ ] Use AudioWorklet and WebAssembly to enable C++ DSP code to run in the browser. (on `/demo`)  
AudioWorkletとWebAssemblyを使用して、C++のDSPコードをブラウザで実行できるようにする。(`/demo`)
- [ ] Output the code of the test plugin (`/plugin`) as an AudioNode class or a single web page.  
  テストプラグイン(`/plugin`)のコードをAudioNodeクラスまたは単一のウェブページとして出力する。

## Acknowledgments
The following code is used in this project.  
Thank you very much!  

- [GoogleChromeLabs/web-audio-samples](https://github.com/GoogleChromeLabs/web-audio-samples)
