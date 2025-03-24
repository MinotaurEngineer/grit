import { h } from 'preact'

export default function Image({
  src,
  alt = '',
  fit = 'cover',
  type = 'image',
  className = '',
  children = null
}) {
  const as = type === 'image' ? 'img' : 'div'

  const classes = ['image', `image-fit-${fit}`, `image-type-${type}`, className]
    .join(' ')
    .trim()

  const props = {
    className: classes,
    ...(type === 'image' && { src, alt }), // <img> gets src and alt
    ...(type === 'banner' && { style: { backgroundImage: `url(${src})` } })
  }

  return h(as, props, children)
}
