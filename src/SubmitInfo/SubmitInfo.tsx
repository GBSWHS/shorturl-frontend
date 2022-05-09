import {Variants} from 'framer-motion'
import {useEffect, useState} from 'react'
import {useAppSelector} from '../Store/hooks'
import { motion } from 'framer-motion'
import style from './SubmitInfo.module.css'

type Status = 'pending' | 'resolved' | 'rejected'

interface Props {
  onFinished: () => any
}

const variants: Variants = {
  initial: { translateY: 100, opacity: 0, scale: 0.5 },
  animate: { translateY: 0, opacity: 1, scale: 1 },
  exit: { translateY: -100, opacity: 0, scale: 0.5 }
}

const SubmitInfo = ({ onFinished }: Props) => {
  const [error, setError] = useState('')
  const [status, setStatus] = useState<Status>('pending')
  const shortPath = useAppSelector((state) => decodeURIComponent(state.shortPath.value))
  const longURL = useAppSelector((state) => decodeURIComponent(state.longURL.value))
  
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/regist?s=${shortPath}&l=${longURL}`)
      if (res.status === 201) {
        setStatus('resolved')
        return 
      }

      setError({
        401: '인트라넷에 접속할 수 없습니다. 교내 내트워크를 사용하고 있는지 확인해주세요.',
        409: `${shortPath}는 이미 사용중입니다!`,
        500: '서버가 아픈것 같습니다. 잠시뒤 다시 시도해 주세요.'
      }[res.status]!)

      setStatus('rejected')
    })()
  }, [shortPath, longURL])

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className={style.parent}>
      {status === 'pending' && '잠시만 기다려주세요...'}
      {status === 'resolved' && (
        <div className={style.modal}>
          {shortPath}로 줄였어요!

          <button
            className={style.button}
            onClick={onFinished}>
            Again?
          </button>
        </div>
      )}

      {status === 'rejected' && (
        <div className={style.modal}>
          오류! {error}
          
          <button
            className={style.button}
            onClick={onFinished}>
            Again?
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default SubmitInfo
