import { useSignal } from '@preact/signals'
import Icon from './Icon'

export default function Accordion({
  title,
  children,
  className = '',
  iconName = 'chevron-down',
  ...props
}) {
  const isOpen = useSignal(false)

  const containerClasses = ['accordion', isOpen.value && 'is-open', className]
    .filter(Boolean)
    .join(' ')

  if (!title) return null

  return (
    <details
      {...props}
      className={containerClasses}
      open={isOpen.value}
      onToggle={e => {
        isOpen.value = e.currentTarget.open
      }}
    >
      <summary className="header">
        <span className="title">{title}</span>
        <Icon
          name={iconName}
          className={`indicator ${isOpen.value ? 'open' : ''}`}
          size="sm"
          aria-hidden="true"
        />
      </summary>
      <div className="content">{children}</div>
    </details>
  )
}
