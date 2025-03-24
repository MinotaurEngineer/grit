import { useSearchParams } from 'wouter-preact'

import Icon from '../../primitives/Icon'
import StarRating from '../../primitives/StarRating'
import Text from '../../primitives/Text'

import { data, loading } from '../../globalState'
import { generateHash } from '../../utils'

export default function Program() {
  if (loading.value === true || data.value === null) return null

  const [searchParams] = useSearchParams()
  const programId = searchParams.get('programId')
  const program = data.value.programs.find(({ id }) => id === programId)

  if (!program) return null

  const {
    components,
    country,
    difficulty,
    description,
    introduction,
    branch,
    id,
    iso2code,
    name,
    scoring,
    service
  } = program

  return (
    <article className="Program" aria-labelledby="program-title" id="program">
      <header class="header">
        <div className="title">
          <Icon size={6} name={iso2code} aria-label={`Flag of ${country}`} />
          <Text as="h1" size={8} id="program-title">
            {name}
          </Text>
        </div>
        <section className="cards" aria-label="Program Overview">
          <dl className="card">
            <Text as="dt" size={2} family={'mono'}>
              Country
            </Text>
            <Text as="dd" size={6}>
              {country}
            </Text>
          </dl>
          <dl className="card">
            <Text as="dt" size={3} family={'mono'}>
              Service
            </Text>
            <Text as="dd" size={6}>
              {service}
            </Text>
          </dl>
          <dl className="card">
            <Text as="dt" size={3} family={'mono'}>
              Branch
            </Text>
            <Text as="dd" size={6}>
              {branch}
            </Text>
          </dl>
          <dl className="card">
            <Text as="dt" size={3} family={'mono'}>
              Difficulty
            </Text>
            <Text as="dd" size={6}>
              <StarRating
                count={difficulty}
                aria-label={`Difficulty: ${difficulty} out of 5`}
              />
            </Text>
          </dl>
        </section>
      </header>

      <section className="summary">
        <Text as="h2" size={11} weight={500}>
          {description}
        </Text>
        {introduction.map((p, index) => (
          <Text
            as="p"
            size={7 - index}
            color={'zinc'}
            shade={(2 + index) * 100}
            key={generateHash(p.slice(0, 10))}
          >
            {p}
          </Text>
        ))}
      </section>

      <section className="components">
        <Text as="h2" size={10}>
          Components &amp; Scoring
        </Text>
        <div className="content">
          {components.map(component => (
            <article
              key={generateHash(component.name)}
              aria-labelledby={`${generateHash(component.name)}-title`}
            >
              <header>
                <Text
                  as="h3"
                  id={`${generateHash(component.name)}-title`}
                  family={'mono'}
                  color={'zinc'}
                  shade={400}
                >
                  {component.name}
                </Text>
                <Text as="p" size={8}>
                  {component.evaluation}
                </Text>
                {component.target && (
                  <dl className="target">
                    <dt>Target</dt>
                    <dd>
                      {component.target.value}
                      {component.target.unit}
                    </dd>
                  </dl>
                )}
              </header>
              <ul
                className="scoring"
                aria-label={`Scoring details for ${component.name}`}
              >
                {component.scoring && component.scoring.length > 0 ? (
                  component.scoring.map(score => (
                    <li
                      className="param"
                      key={generateHash(
                        `${score.gender}-${score.age_group?.join('-')}-${score.metric}`
                      )}
                    >
                      <dl className="value">
                        <Text
                          as="dt"
                          family={'mono'}
                          size={3}
                          color="zinc"
                          shade={400}
                        >
                          {score.gender}
                        </Text>
                        <Text as="dd" size={5}>
                          {score.metric} <strong>{score.value}</strong>{' '}
                          {score.unit || ''}
                        </Text>
                      </dl>
                    </li>
                  ))
                ) : (
                  <li className="param">No scoring details available</li>
                )}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </article>
  )
}
