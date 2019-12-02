document.addEventListener('DOMContentLoaded', function() {
  console.log('Loaded DOM')

  const player = document.body.querySelector('.player')
  const video = player.querySelector('.viewer')
  const progress = player.querySelector('.progress')
  const progressBar = player.querySelector('.progress_filled')
  progressBar.style.flexBasis = `${0}%`
  const toggle = player.querySelector('.toggle')
  const skipButtons = player.querySelectorAll('[data-skip]')
  const ranges = player.querySelectorAll('.player_slider')
  const fullscreenButton = player.querySelector('.fullscreen')
  let isFullScreen = false
  video.paused = true
  // console.log(progressBar)
  function togglePlay() {
    let method = ( video.paused ) ? 'play' : 'pause'
    video[method]()
  }

  function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚'
    toggle.textContent = icon
  }

  function scrub(e) {
    // console.log(e)
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
  }

  function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
  }

  function handleRangeUpdate(){
    video[this.name] = this.value
  }

  function handleProgress() {
    const percentage = (video.currentTime / video.duration) * 100
    // console.log(percentage)
    progressBar.style.flexBasis = `${percentage}%`
  }

  function toggleFullScreen(e) {
    // video.requestFullscreen()
    if (isFullScreen === false) {
      video.requestFullscreen()
    } else {
      video.exitFullscreen()
    }
  }

  video.addEventListener('play', updateButton)
  video.addEventListener('pause', updateButton)
  video.addEventListener('click', togglePlay)
  video.addEventListener('timeupdate', handleProgress)

  let mousedown = false

  progress.addEventListener('click', scrub)
  progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
  progress.addEventListener('mousedown', () => mousedown = true)
  progress.addEventListener('mouseup', () => mousedown = false) 

  
  fullscreenButton.addEventListener('click', (e) => toggleFullScreen(e))

  skipButtons.forEach(button => {
    button.addEventListener('click', skip)
  })

  toggle.addEventListener('click', function() {
    togglePlay()
  })
  // console.log(ranges)
  ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate)
  })
  ranges.forEach(range => {
    range.addEventListener('mousemove', handleRangeUpdate)
  })
  

})