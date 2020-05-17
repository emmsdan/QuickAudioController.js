const AudioController = {
  __container: "audioContainer",
  currentlyPlaying: 0,
  __list: [],
  button: {},
  __autoplay: true,
  __showList: true,
  defaults: { cover: "https://picsum.photos/200/300" },
  config(options) {
    this.__container = options?.container || "audioContainer";
    this.__list = options?.audioFiles || [];
    this.button = options?.button || {
      play: "Play",
      pause: "Pause",
      next: "Next",
    };
    this.__coverImageClass = options?.coverImage || "audioCover";
    this.__showList = options?.showList || true;
    this.__autoplay = options?.autoplay || true;
    this.__timerClass = options?.timer || "audio_duration";
    return this.init();
  },
  audioContainer(child) {
    document.querySelector(this.__container).appendChild(child);
  },
  displayTitle(file) {
    document.querySelector(`${this.__container} .display_title`).innerHTML =
      file.title;
    document.querySelector(
      `${this.__container} .${this.__coverImageClass}`
    ).src = file.cover || this.defaults.cover;
  },
  init() {
    if (!this.__list.length) return;
    const audio = document.createElement("audio");
    const titleElem = document.createElement("div");
    audio.setAttribute("preload", "metadata");
    titleElem.setAttribute("class", "display_title");
    const file = this.__list[0];
    audio.src = file.url;
    titleElem.innerText = file.title;

    this.audioPlayer = audio;
    this.audioContainer(audio);
    this.audioContainer(titleElem);
    this.setSetupButtons(file);
    this.getList();
    return { ...audio, ...this };
  },
  setSetupButtons(file) {
    const audioPlayPauseButton = document.createElement("button");
    const audioNextButton = document.createElement("button");
    const cover = document.createElement("img");
    const timer = document.createElement("div");

    audioPlayPauseButton.setAttribute("id", "playPauseButton");
    audioNextButton.setAttribute("id", "playNextButton");
    cover.setAttribute("class", this.__coverImageClass);
    timer.setAttribute("class", this.__timerClass);
    audioPlayPauseButton.innerText = this.button.play;
    audioNextButton.innerText = this.button.next;
    cover.src = file.cover || this.defaults.cover;
    audioPlayPauseButton.addEventListener("click", () => {
      this.toggled();
      if (this.isPaused()) {
        audioPlayPauseButton.innerText = this.button.play;
      } else {
        audioPlayPauseButton.innerText = this.button.pause;
      }
    });

    audioNextButton.addEventListener("click", () => this.next());

    this.audioContainer(cover);
    this.audioContainer(audioPlayPauseButton);
    this.audioContainer(audioNextButton);
    this.audioContainer(timer);
    this.startTimer(timer);
  },
  play() {
    this.audioPlayer.play();
  },
  pause() {
    this.audioPlayer.pause();
  },
  isPaused() {
    return this.audioPlayer.paused;
  },
  toggled() {
    return this.isPaused() ? this.play() : this.pause();
  },
  next() {
    const size = this.__list.length - 1;
    let next = this.currentlyPlaying + 1;
    if (next > size) {
      next = 0;
    }
    this.playById(next);
  },
  playById(id) {
    this.audioPlayer.src = this.__list[id].url;
    this.displayTitle(this.__list[id]);
    this.currentlyPlaying = id;
    this.play();
  },
  addAudio(files) {
    if (Array.isArray(files)) {
      files.forEach((file) => this.__list.push(file));
      return;
    }
    if (typeof files !== "object") return console.error("Invalid file format");
    this.__list.push(files);
  },
  getList() {
    if (!this.__showList) return;
    const listElem = document.createElement("ul");
    this.__list.forEach((audio, id) => {
      const list = document.createElement("li");
      list.addEventListener("click", () => this.playId(id));
      list.innerText = audio.title;
      list.style = "cursor: pointer; padding: 5px;";
      listElem.appendChild(list);
    });
    this.audioContainer(listElem);
  },
  autoPlayNext() {
    if (this.audioPlayer.ended && this.__autoplay) {
      this.next();
    }
  },
  forward(by = 5) {
    this.audioPlayer.currentTime = this.audioPlayer.currentTime + (by || 5);
  },
  backward(by = 5) {
    this.audioPlayer.currentTime = this.audioPlayer.currentTime - (by || 5);
  },
  toggleMute() {
    this.audioPlayer.muted = !this.audioPlayer.muted;
  },
  startTimer(timer) {
    let sec = 0;
    let min = 0;
    let hour = 0;
    let divide = 1;

    this.timer = setInterval(() => {
      autoPlayNext();
      if (this.audioPlayer.currentTime > 1 && sec > 59) {
        divide += 1;
        min += 1;
        if (min > 59) {
          hour += 1;
          min = 0;
        }
        sec = 0;
      }
      sec = Math.floor(Math.ceil(this.audioPlayer.currentTime) / divide);
      timer.innerHTML = `${hour}:${min}:${sec}`;
      this.autoPlayNext();
    }, 10);
  },
};

