import { AnimatePresence, motion, Variants } from "framer-motion"
import {ChangeEventHandler, createRef, KeyboardEventHandler, useEffect, useState} from "react"
import {useAppDispatch } from "../Store/hooks"
import {setLongURL} from "../Store/longURLSlice"

import style from './LongURLInput.module.css'

interface Props {
  onFinished: () => any
}

const VAILD_URL_REGEXP = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i

const variants: Variants = {
  initial: { translateY: 100, opacity: 0, scale: 0.5 },
  animate: { translateY: 0, opacity: 1, scale: 1 },
  exit: { translateY: -100, opacity: 0, scale: 0.5 }
}

const LongURLInput = ({ onFinished }: Props) => {
  const ref = createRef<HTMLInputElement>()
  const dispatch = useAppDispatch()

  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [value, setValue] = useState('')

  useEffect(() => {
    ref.current?.focus()
  }, [ref])

  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (['Enter', 'Tab'].includes(e.key)) {
      if (!value.match(VAILD_URL_REGEXP)) {
        setSubmitted(false)
        setError('URL이 올바르지 않습니다.')

        setTimeout(() => setError(''), 1000)
        return
      }

      if (value.length < 4 || value.length > 255) {
        setSubmitted(false)
        setError('입력이 너무 짧거나 너무 깁니다.')

        setTimeout(() => setError(''), 1000)
        return
      }

      setSubmitted(true)
      dispatch(setLongURL(value))
      onFinished()
    }
  }

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (submitted) return

    setValue(e.target.value)
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className={style.parent}>

      <h1>줄일 주소를 입력해주세요</h1>

      <input
        ref={ref}
        className={style.input}
        onKeyPress={onKeyPress}
        onChange={onChange}
        placeholder="http(s)://..." />

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ scale: 0, color: '#fafafa' }}
            animate={{ scale: 1, color: '#f2616b' }}
            exit={{ scale: 0 }}>
            
            {error}

          </motion.p>
        )}
      </AnimatePresence>
 
    </motion.div>
 )
}

export default LongURLInput
