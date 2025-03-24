import { useSignal } from '@preact/signals'

export default function Tooltip({
  text,
  position = 'top',
  children,
  className = '',
  ...props
}) {
  const isVisible = useSignal(false)

  // Static position class map
  const positionClass = {
    top: 'tooltip-top',
    bottom: 'tooltip-bottom',
    left: 'tooltip-left',
    right: 'tooltip-right'
  }[position]

  // Simple class string construction
  const classString = ['tooltip', positionClass, className]
    .filter(Boolean)
    .join(' ')

  if (!text) return children

  return (
    <div
      {...props}
      className="tooltip-container"
      onMouseEnter={() => {
        isVisible.value = true
      }}
      onMouseLeave={() => {
        isVisible.value = false
      }}
    >
      {children}
      {isVisible.value && (
        <div className={classString} role="tooltip">
          {text}
        </div>
      )}
    </div>
  )
}
