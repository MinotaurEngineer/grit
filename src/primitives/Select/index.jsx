import { useSignal } from '@preact/signals'
import { useCallback, useEffect, useRef } from 'preact/hooks'

export default function Select({
  options = [{ label: 'Demo', value: 'demo' }],
  onChange = null,
  placeholder = 'Select an option',
  name = 'select',
  value = null
}) {
  const isOpen = useSignal(false)
  const selectRef = useRef(null)

  // biome-ignore lint: Signals don’t need to be deps
  const toggleOpen = useCallback(() => {
    isOpen.value = !isOpen.value
  }, [])

  // biome-ignore lint: Signals don’t need to be deps
  const handleSelect = useCallback(
    value => {
      onChange?.({ type: 'select-box', name, value })
      isOpen.value = false
    },
    [onChange]
  )

  // biome-ignore lint: we need this for multiples
  const handleClickOutside = useCallback(
    event => {
      if (
        isOpen.value &&
        selectRef.current &&
        !selectRef.current.contains(event.target)
      ) {
        isOpen.value = false
      }
    },
    [isOpen, selectRef]
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  return (
    <div class="select-box" open={isOpen.value} ref={selectRef}>
      <button
        class="value"
        onClick={toggleOpen}
        onKeyDown={e => e.key === 'Enter' && toggleOpen()}
        aria-expanded={isOpen.value}
        tabIndex={0}
        type="button"
      >
        <div class="value-text">
          {Array.isArray(options) && options.length > 0
            ? (options.find(option => option?.value === value)?.label ??
              placeholder)
            : placeholder}
        </div>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24"
          height="24"
          class="value-icon"
          aria-hidden="true"
        >
          <title>select icon</title>
          <path
            d={
              !isOpen.value
                ? 'M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z'
                : 'M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z'
            }
          />
        </svg>
      </button>
      <div class="options">
        {options.map(option => (
          <button
            key={option.value}
            aria-selected={value === option.value}
            class={`option ${value === option.value ? 'selected' : ''}`}
            onClick={() => handleSelect(option.value)}
            onKeyDown={e => e.key === 'Enter' && handleSelect(option.value)}
            tabIndex={0}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
