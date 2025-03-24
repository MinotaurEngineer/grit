import { data } from '../../globalState'
import Icon from '../../primitives/Icon'
import Text from '../../primitives/Text'
import { generateHash, navigateWithQueryAndHash } from '../../utils'
import { getUniqueOptions } from '../Programs/utils'

export default function Footer() {
  const branches = getUniqueOptions({
    data: data.value.programs,
    property: 'branch'
  })
    .map(({ value }) => value)
    .filter(value => value !== 'All')

  return (
    <footer class="Footer">
      <section class="top">
        <a href="#programs" class="action">
          <Text family={'mono'} size={2} shade={400} color="zinc">
            Programs
          </Text>
          <Icon name="arrow-up" color={'zinc'} shade={200} />
        </a>
      </section>
      <section class="brand">
        <svg aria-hidden="true" role="img" class="logo">
          <use href="#icon-brand-full" />
        </svg>
        <Text as="p" size={5} color="zinc" shade={600}>
          Comprehensive resource for civil and military fitness testing
          requirements
        </Text>
      </section>
      <section class="links">
        <Text as="h3" size={2} color="zinc">
          Test Categories
        </Text>
        <ul>
          {branches.map(branch => (
            <li key={generateHash(branch)}>
              <Text
                size={5}
                onClick={() =>
                  navigateWithQueryAndHash({
                    queryParams: { branch },
                    hash: 'programs'
                  })
                }
              >
                {branch} Testing
              </Text>
            </li>
          ))}
        </ul>
      </section>
      <section class="mastend">
        <Text color="zinc" as="small">
          © 2025 Fitness Testing Portal. All rights reserved.
        </Text>
      </section>
    </footer>
  )
}
