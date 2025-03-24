import VideoPlayer from './primitives/VideoPlayer'

import Footer from './sections/Footer'
import Header from './sections/Header'
import Navigation from './sections/Navigation'
import Program from './sections/Program'
import Programs from './sections/Programs'

import { data, loading } from './globalState'

export default function App() {
  return !loading.value ? (
    <>
      <div class="Media">
        <VideoPlayer playlist={data.value.media} />
      </div>
      <main class="Layout">
        <Navigation />
        <Header />
        <Programs />
        <Program />
        <Footer />
      </main>
    </>
  ) : null
}
