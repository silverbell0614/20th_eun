import { useEffect } from 'react'
import chipUrl from '../assets/image/silverbell_chip.webp'
import twentiethWatermarkImg from '../assets/image/twentieth-watermark.webp'
import panoramaWatermarkImg from '../assets/image/panorama-watermark.webp'

function Preparing() {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [])

  return (
    <div className="bg-bg fixed inset-0 z-[70] flex items-center justify-center overflow-hidden p-4">
      <img
        src={twentiethWatermarkImg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[-19px] left-[-15px] z-0 w-[480px] sm:top-[-27px] sm:left-[-25px] sm:w-[768px] lg:w-[864px]"
      />
      <img
        src={panoramaWatermarkImg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[-15px] bottom-[-15px] z-0 w-[576px] sm:right-[-25px] sm:bottom-[-25px] sm:w-[960px] lg:w-[1152px]"
      />

      <div className="border-line relative z-10 w-full max-w-sm border bg-white p-6 text-center">
        <img src={chipUrl} alt="" className="mx-auto h-12 w-12" />

        <p className="text-ink mt-4 text-sm leading-relaxed">홈페이지 준비중입니다.</p>
      </div>
    </div>
  )
}

export default Preparing
