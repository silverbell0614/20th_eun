import Container from '../components/Container'
import BrowserWindow from '../components/BrowserWindow'
import PrimaryLink from '../components/PrimaryLink'
import ticketEnvelopeImg from '../assets/image/ticket-envelope.webp'
import posterImg from '../assets/image/poster.webp'

function InfoRow({ label, value, valueClassName = '' }) {
  return (
    <div className="border-line grid grid-cols-[96px_1fr] gap-2 border-b py-4 text-sm sm:grid-cols-[140px_1fr] sm:gap-4">
      <span className="text-ink-muted">{label}</span>
      <span className={`text-ink ${valueClassName}`}>{value}</span>
    </div>
  )
}

function BookingComplete() {
  return (
    <main className="overflow-x-hidden">
      <Container className="!px-1 pt-10 pb-40 sm:!px-6 sm:pt-24 sm:pb-48 lg:!px-8">
        <div className="relative">
          <img
            src={ticketEnvelopeImg}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-[calc(45%-40px)] right-4 z-10 w-32 -translate-y-1/2 sm:top-[45%] sm:right-[74px] sm:w-[336px] sm:translate-x-8 lg:right-[82px] lg:w-[480px]"
          />

          <BrowserWindow>
            <h1 className="text-ink text-xl font-bold sm:text-2xl">예매완료</h1>
            <div className="border-line mt-4 border-t" />

            <div className="border-line mt-8 flex flex-col gap-4 border-b pb-8 sm:flex-row sm:gap-6">
              <div className="mx-auto mb-5 aspect-[1200/1697] w-full shrink-0 overflow-hidden sm:mx-0 sm:mb-0 sm:aspect-auto sm:h-40 sm:w-32">
                <img src={posterImg} alt="포스터" className="h-full w-full object-cover" />
              </div>

              <div className="flex-1 sm:order-2">
                <p className="text-ink-muted text-xs">예매번호 : T20061028</p>
                <h2 className="text-ink mt-2 text-lg font-semibold">스무해의 파노라마</h2>
                <p className="text-ink-muted mt-2 text-sm">관람일 2026-10-28(수) 19:30</p>
                <p className="text-ink-muted text-sm">은빛소리</p>
              </div>

              <div className="flex shrink-0 gap-2 sm:order-3 sm:items-start">
                <span className="border-line text-ink-muted rounded border px-3 py-1 text-xs">
                  1매
                </span>
                <span className="border-line text-ink rounded border px-3 py-1 text-xs font-medium">
                  예매완료
                </span>
              </div>
            </div>

            <h3 className="text-ink mt-10 text-lg font-bold">예매정보</h3>
            <div className="border-line mt-2 border-t">
              <InfoRow label="예매자" value="은빛소리" />
              <InfoRow label="예매일시" value="2026.10.28 (수) 06:14" />
              <InfoRow
                label="예매상태"
                value="예매완료"
                valueClassName="text-highlight font-semibold"
              />
              <InfoRow label="좌석정보" value="VVIP석 (1층 B구역 1열 10번)" />
              <InfoRow label="할인" value="은빛소리(본인만)_VVIP석_100%(1매)" />
              <InfoRow label="수령방법" value="현장수령" />
            </div>

            <h3 className="text-ink mt-10 text-lg font-bold">결제정보</h3>
            <div className="border-line mt-2 border-t">
              <InfoRow label="티켓금액" value="180,000원" />
              <InfoRow label="할인금액" value="은빛소리(본인만)_VVIP석_100%(-180,000원)" />
              <InfoRow label="쿠폰/예매권" value="0원" />
              <InfoRow label="수수료" value="0원" />
            </div>

            <div className="flex items-center justify-end gap-4 py-6 text-sm">
              <span className="text-ink-muted">총 결제금액</span>
              <span className="text-ink text-lg font-bold">0원</span>
            </div>

            <div className="mt-10 flex justify-center">
              <PrimaryLink to="/casting-board">캐스팅 정보 보러가기</PrimaryLink>
            </div>
          </BrowserWindow>
        </div>
      </Container>
    </main>
  )
}

export default BookingComplete
