import { useId } from 'preact/hooks'
import Icon from '../../primitives/Icon'

/**
 * StarRating component
 *
 * @param {Object} props
 * @param {number} props.count - Rating value (default: 3)
 * @param {number} props.maximum - Maximum rating value (default: 5)
 */

export default function StarRating({ count = 3, maximum = 5 }) {
  const fullStars = Math.floor(count)
  const halfStars = count % 1 >= 0.5 ? 1 : 0
  const emptyStars = maximum - fullStars - halfStars

  const id = useId()

  return (
    <div className="star-rating">
      {Array.from({ length: fullStars }, (_, index) => (
        // biome-ignore lint: ID included with index
        <Icon key={`${id}-full-${index}`} name={'star-full'} />
      ))}
      {halfStars === 1 && <Icon name={'star-half'} />}
      {Array.from({ length: emptyStars }, (_, index) => (
        // biome-ignore lint: ID included with index
        <Icon key={`${id}-empty-${index}`} name={'star-empty'} />
      ))}
    </div>
  )
}
