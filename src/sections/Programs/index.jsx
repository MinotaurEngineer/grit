import Icon from '../../primitives/Icon'
import Select from '../../primitives/Select'
import StarInput from '../../primitives/StarInput'
import StarRating from '../../primitives/StarRating'
import Text from '../../primitives/Text'

import { data, loading } from '../../globalState'
import { navigateWithQueryAndHash, slugify } from '../../utils.js'

import handlers from './handlers'
import state from './state'

export default function Programs() {
  if (loading.value === true || data.value === null) return null

  const { options, values, programs } = state()
  const { handleFilter, handleReset } = handlers()

  return (
    <article class="Programs" id="programs">
      <Text className="title" as="h2" size={9}>
        Programs
      </Text>
      <div class="actions">
        <Text
          className="reset"
          as="button"
          size={2}
          weight={700}
          type="button"
          onClick={handleReset}
        >
          Reset All
        </Text>
      </div>
      <div class="filter">
        <Text as="h5" size={2} family={'mono'}>
          Country
        </Text>
        <Select
          name="country"
          onChange={handleFilter}
          value={values.country}
          options={options.country}
        />
      </div>

      <div class="filter">
        <Text as="h5" size={2} family={'mono'}>
          Service
        </Text>
        <Select
          name="service"
          value={values.service}
          onChange={handleFilter}
          options={options.service}
        />
      </div>

      <div class="filter">
        <Text as="h5" size={2} family={'mono'}>
          Branch
        </Text>
        <Select
          name="branch"
          value={values.branch}
          onChange={handleFilter}
          options={options.branch}
        />
      </div>

      <div class="filter stars">
        <Text as="h5" size={2} family={'mono'}>
          Difficulty
        </Text>
        <Text size={8}>
          <StarInput
            name="difficulty"
            value={Number.parseInt(values.difficulty)}
            onChange={handleFilter}
            length={Number.parseInt(options.difficulty.at(-1))}
          />
        </Text>
      </div>

      <hr class="rule" />

      {programs.map(
        ({ id, iso2code, service, branch, name, description, difficulty }) => (
          <button
            key={id}
            onClick={() => {
              /*
              handleFilter({
                name: 'programId',
                value: slugify(id)
              })
              */
              navigateWithQueryAndHash({
                queryParams: { branch, programId: slugify(id) },
                hash: 'program'
              })
            }}
            type="button"
            class="card"
          >
            <div class="title">
              <Text as="small" size={2} family={'mono'}>
                {service}/{branch}
              </Text>
              <Icon name={iso2code} />
            </div>
            <div class="content">
              <Text as="h2" size={6}>
                {name}
              </Text>
              <Text as="p" size={5}>
                {description}
              </Text>
              <Text size={4}>
                <StarRating count={difficulty} />
              </Text>
            </div>
          </button>
        )
      )}
    </article>
  )
}
