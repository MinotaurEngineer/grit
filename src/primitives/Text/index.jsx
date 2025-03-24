import { h } from 'preact'

export default function Text({
  size = null,
  weight = null,
  className = '',
  as = 'span',
  family = null,
  color = null,
  shade = 500,
  children,
  ...rest
}) {
  const classString = [
    'text',
    size && `text-size-${size}`,
    family && `text-ff-${family}`,
    weight && `text-weight-${weight}`,
    color && `text-color-${color}-${shade}`,
    className
  ]
    .filter(Boolean)
    .join(' ')

  return h(as, { ...rest, className: classString }, children)
}
