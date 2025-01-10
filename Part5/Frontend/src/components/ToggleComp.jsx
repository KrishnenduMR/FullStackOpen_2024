import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const ToggleComp = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  const ButtonStyle = {
    margin: '20px',
    width: '120px',
    display: 'block',
  }

  return (
    <div>
      <div>
        <Button onClick={toggleVisibility} style={ButtonStyle}>{visible? "hide blogs" : props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
    </div>
  )
})

ToggleComp.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node
}

ToggleComp.displayName = 'ToggleComp'

export default ToggleComp