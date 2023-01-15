import { forwardRef } from 'react'
import { IField, ITextArea } from './form.interface'
import styles from './form.module.scss'
import cn from 'classnames'
const uuid = require('uuid')

const TextEditor = forwardRef<HTMLTextAreaElement, ITextArea>(({placeholder, error, style, ...rest}, ref) => {
  return (
    <div className={styles.textEditorContainer} style={style}>
      <label>
        <span>
          {placeholder}
        </span>
        <textarea style={{width: '100%', height: '100px'}} className={styles.textEditor} ref={ref} {...rest}></textarea>
      </label>
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  )
})

TextEditor.displayName = 'TextEditor'

export default TextEditor