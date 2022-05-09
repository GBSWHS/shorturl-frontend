import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import LongURLInput from '../LongURLInput/LongURLInput'
import ShortPathInput from '../ShortPathInput/ShortPathInput'

import style from './App.module.css'
import SubmitInfo from '../SubmitInfo/SubmitInfo'

const App = () => {
  const [submitVisible, setSubmitVisible] = useState(false)
  const [longURLVisible, setLongURLVisible] = useState(true)
  const [shortPathVisible, setShortPathVisible] = useState(false)

  const longURLFinished = () => {
    setLongURLVisible(false)
    setShortPathVisible(true)
  }

  const shortPathFinished = () => {
    setShortPathVisible(false)
    setSubmitVisible(true)
  }

  const submitInfoFinished = () => {
    setSubmitVisible(false)
    setLongURLVisible(true)
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <a
        className={style.report}
        href="mailto:pmh_only@pmh.codes">악용신고</a>

      <AnimatePresence>
        {longURLVisible &&
          <LongURLInput onFinished={longURLFinished} />}
      </AnimatePresence>
      <AnimatePresence>
        {shortPathVisible &&
          <ShortPathInput onFinished={shortPathFinished} />}
      </AnimatePresence>
      <AnimatePresence>
        {submitVisible &&
          <SubmitInfo onFinished={submitInfoFinished} />}
      </AnimatePresence>
    </form> 
  )
}

export default App
