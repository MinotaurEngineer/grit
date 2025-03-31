import { useSignal } from '@preact/signals'
import { useRef, useCallback, useEffect } from 'preact/hooks'

const types = {
  h265: 'video/mp4; codecs="hvc1.1.6.L93.B0"',
  h264: 'video/mp4; codecs=avc1.640028'
}

export default function VideoPlayer({
  playlist = ['3191933'],
  hasCover = true
}) {
  if (!playlist.length) return null

  const refs = {
    a: useRef(null),
    b: useRef(null)
  }

  const position = useSignal(0)

  const currentVideo = useSignal(null)

  const state = useSignal({
    codec: 'h264',
    a: {
      src: null
    },
    b: {
      hidden: true,
      src: null
    }
  })

  // biome-ignore lint: Signals don’t need to be deps
  const handleVideoEnded = useCallback(
    event => {
      const { key } = event.target.dataset
      const { codec } = state.value
      position.value = (position.value + 1) % playlist.length

      if (position.value + 1 === playlist.length) {
        position.value = -1
      }

      if (position.value % 2) {
        state.value = {
          ...state.value,
          a: {
            ...state.value.a,
            src: `./media/${codec}/${playlist[position.value + 1]}.mp4`
          },
          b: {
            ...state.value.b,
            hidden: false
          }
        }

        refs.b.current.play()
        currentVideo.value = 'b'
      } else {
        state.value = {
          ...state.value,
          b: {
            ...state.value.b,
            src: `./media/${codec}/${playlist[position.value + 1]}.mp4`,
            hidden: true
          }
        }

        refs.a.current.play()
        currentVideo.value = 'a'
      }
    },
    [playlist]
  )

  // biome-ignore lint: Signals don’t need to be deps
  const handleIntersection = useCallback(entries => {
    if (entries[0].isIntersecting) {
      refs[currentVideo].current.play()
    } else {
      refs[currentVideo].current.pause()
    }
  }, [])

  // biome-ignore lint: Signals don’t need to be deps
  useEffect(() => {
    if (refs.a.current) {
      if (MediaSource.isTypeSupported(types.h265)) {
        const codec = 'h265'
        state.value = {
          ...state.value,
          codec,
          a: {
            ...state.value.a,
            src: `./media/${codec}/${playlist[position.value]}.mp4`
          },
          b: {
            ...state.value.b,
            src: `./media/${codec}/${playlist[position.value + 1]}.mp4`
          }
        }
      }

      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5
      })

      refs.a.current.addEventListener(
        'canplay',
        ({ target }) => {
          target.play()
          currentVideo.value = 'a'
          observer.observe(refs.a.current.parentNode)
        },
        { passive: true, once: true }
      )

      return () => observer.unobserve(refs.a.current.parentNode)
    }
  }, [])

  return (
    <div class="video-player">
      <video
        playsInline
        muted
        preload="auto"
        className="media"
        ref={refs.a}
        tabIndex="-1"
        onEnded={handleVideoEnded}
        src={state.value.a.src}
        data-key="a"
      />
      <video
        playsInline
        muted
        preload="auto"
        className="media"
        ref={refs.b}
        tabIndex="-1"
        onEnded={handleVideoEnded}
        src={state.value.b.src}
        inert={state.value.b.hidden}
        data-key="b"
      />

      {hasCover ? <div class="cover" /> : null}
    </div>
  )
}
