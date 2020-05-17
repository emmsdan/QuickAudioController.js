# Quick Audio Controller

### Quickly add audio player to your app and customize it the way you want. No css, no plugins, no dependecies pure Javascript

```Javascript
const audio = AudioController.config({
  audioFiles: [
    { title: "May my prayer", url: "./sample/audio1.mp3" },
    { title: "Reckless Love", url: "./sample/audio2.mp3" },
  ],
  container: "div#audioContainer",
  button: {
    play: "Play", // text to display on button
    pause: "Pause",  // text to display on button
    next: "Next", // text to display on button
  },
  coverImage: "img#audioCover",
  showList: true,
  autoplay: true,
  timer: "div#audio_duration",
});
```

## Basic Methods

```Javascript
audio.toggleMute()  
audio.toggled() 
audio.forward(number=5)
audio.backwards(number=5)
audio.play()
audio.pause()
audio.next()   
audio.playById(id)   
audio.addAudio ({title, url, cover});
```

More Methods/Features comming soon