import { Link } from 'wouter-preact'
import Text from '../../primitives/Text'

export default function Navigation() {
  return (
    <nav class="Navigation">
      <Link to="/">
        <svg aria-hidden="true" role="img" width="52.17" height="16">
          <use href="#icon-brand-full" />
        </svg>
      </Link>
      <button type="button">
        <a href="#programs">
          <Text weight={500} size={4}>
            Programs
          </Text>
        </a>
      </button>
    </nav>
  )
}
