import { useSignal } from '@preact/signals'
import { useId } from 'preact/hooks'
import Icon from '../../primitives/Icon'

export default function StarInput({
  length = 5,
  value = 1,
  onChange,
  name = 'starinput'
}) {
  const id = useId()

  const handleClick = event => {
    const target = event.target.closest('[data-index]')
    if (target) {
      const nextValue = Number.parseInt(target.dataset.index, 10)
      onChange?.({ type: 'star-input', value: nextValue, name })
    }
  }

  return (
    <div className="star-input" onClick={handleClick} onKeyUp={handleClick}>
      {Array.from({ length }, (_, index) => (
        <Icon
          // biome-ignore lint: ID included with index
          key={`${id}-${index}`}
          name={value > index ? 'star-full' : 'star-empty'}
          data-index={index + 1}
        />
      ))}
    </div>
  )
}
