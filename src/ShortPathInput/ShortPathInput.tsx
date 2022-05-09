import { AnimatePresence, motion, Variants } from "framer-motion"
import {ChangeEventHandler, createRef, KeyboardEventHandler, useEffect, useState} from "react"
import {useAppDispatch } from "../Store/hooks"
import {setShortPath} from "../Store/shortPathSlice"

import style from './ShortPathInput.module.css'

interface Props {
  onFinished: () => any
}

const variants: Variants = {
  initial: { translateY: 100, opacity: 0, scale: 0.5 },
  animate: { translateY: 0, opacity: 1, scale: 1 },
  exit: { translateY: -100, opacity: 0, scale: 0.5 }
}

const ShortPathInput = ({ onFinished }: Props) => {
  const ref = createRef<HTMLInputElement>()
  const dispatch = useAppDispatch()

  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [value, setValue] = useState('')

  useEffect(() => ref.current?.focus(), [ref])

  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (['Enter', 'Tab'].includes(e.key)) {
      if (value.match(/\/|\?|#/)) {
        setSubmitted(false)
        setError('/, ?, #은 사용할 수 없습니다')
        setTimeout(() => setError(''), 1000)
        return
      }

      if (value.length < 4 || value.length > 20) {
        setSubmitted(false)
        setError('입력이 너무 짧거나 너무 깁니다.')
        setTimeout(() => setError(''), 1000)
        return
      }

      setSubmitted(true)
      dispatch(setShortPath(value))
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
    
      <h1>원하는 짧은 주소를 입력해주세요</h1>

      <div className={style.frame}>
        <div className={style.prefix}>
          https://gbsw.hs.kr/
        </div>

        <input
          ref={ref}
          className={style.input}
          onKeyPress={onKeyPress}
          onChange={onChange}
          placeholder="여기를 눌러 입력을 시작하세요" />

      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ scale: 0, color: '#fafafa' }}
            animate={{ scale: 1, color: '#F2616B' }}
            exit={{ scale: 0 }}>
            
            {error}

          </motion.p>
        )}
      </AnimatePresence>

    </motion.div>
  )
}

export default ShortPathInput
