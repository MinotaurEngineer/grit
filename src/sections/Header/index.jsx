import { data, loading } from '../../globalState'
import Text from '../../primitives/Text'

export default function Header() {
  if (loading.value === true || data.value === null) return null

  return (
    <header class="Header">
      <div class="content">
        <svg aria-hidden="true" role="img" class="logo">
          <use href="#icon-brand-full" />
        </svg>
        <Text weight={400} size={7} className="question">
          Do you have what it takes to pass a military fitness test?
        </Text>
        <Text as="a" href="#programs" size={5} weight={500} className="link">
          Get started
        </Text>
      </div>
    </header>
  )
}
