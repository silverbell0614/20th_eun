import { Link, useParams } from 'react-router-dom'
import { getShow } from '../data/historyEntries'
import { SHOW_IMAGES } from '../data/historyImages'
import { PROFILE_IMAGES } from '../data/profileImages'
import { INTERVIEW_LINKS } from '../data/interviewLinks'

const SHOW_IMAGE_POSITIONS = {
  'kinky-boots-2020': 'object-center',
  'kinky-boots-2024': 'object-center',
  'hamlet-world-version-2008': 'object-top',
  'hamlet-2011': 'object-top',
  'frankenstein-2018': 'object-bottom',
  'mozart-2010': 'object-center',
  'mozart-2011': 'object-center',
}

const PROFILE_IMAGE_POSITIONS = {
  'bridges-of-madison-county-2018': '0% 0%',
  'bridges-of-madison-county-2025': '25% 0%',
}

const PROFILE_IMAGE_ZOOMS = {
  'jesus-christ-superstar-2024': 1.9,
  'mozart-2010': 1.2,
  'jekyll-and-hyde-2018': 1.03,
}

const PROFILE_IMAGE_OFFSETS = {
  'jesus-christ-superstar-2024': [4, 0],
  'jekyll-and-hyde-2018': [-2, -2],
  'mozart-2010': [0, -10],
}

const BEST_BANNER_RUN_ID = {
  'notre-dame-de-paris': 'notre-dame-de-paris-2009',
  'hamlet-world-version': 'hamlet-2011',
  mozart: 'mozart-2020',
  elisabeth: 'elisabeth-2026',
  'jesus-christ-superstar': 'jesus-christ-superstar-2024',
  frankenstein: 'frankenstein-2021',
  'jekyll-and-hyde': 'jekyll-and-hyde-2022',
  phantom: 'phantom-2016',
  'bridges-of-madison-county': 'bridges-of-madison-county-2025',
  'ben-hur': 'ben-hur-2017',
  'kinky-boots': 'kinky-boots-2024',
  'the-man-who-laughs': 'the-man-who-laughs-2025',
}

function TopBanner({ showId, firstRun }) {
  const bannerRunId = BEST_BANNER_RUN_ID[showId] ?? firstRun.id
  const image = SHOW_IMAGES[bannerRunId]

  return image ? (
    <img
      src={image}
      alt={firstRun.year}
      className={`aspect-[1920/420] w-full object-cover ${
        SHOW_IMAGE_POSITIONS[bannerRunId] ?? 'object-top'
      }`}
    />
  ) : (
    <div className="aspect-[1920/420] w-full bg-neutral-800" />
  )
}

function BackLink() {
  return (
    <Link
      to="/history"
      className="text-dark-ink-muted hover:text-dark-ink inline-flex items-center gap-2 text-sm"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M10 3L5 8L10 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      BACK
    </Link>
  )
}

function ImageFrame({ title, role, image, position, zoom, offset, className = '' }) {
  return (
    <div className={`flex justify-end ${className}`}>
      <div className="flex w-40 flex-col items-end sm:w-64">
        {image ? (
          <div className="aspect-[94/113] w-full overflow-hidden">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover object-top"
              style={{
                objectPosition: position,
                transform:
                  [offset && `translate(${offset[0]}px, ${offset[1]}px)`, zoom && `scale(${zoom})`]
                    .filter(Boolean)
                    .join(' ') || undefined,
                transformOrigin: 'center top',
              }}
            />
          </div>
        ) : (
          <div className="aspect-[94/113] w-full bg-neutral-200" />
        )}

        <div className="mt-4 w-max max-w-[calc(100vw-3rem)] text-right">
          <h1 className="text-dark-ink text-xl font-semibold sm:text-2xl">{title}</h1>
          <p className="text-dark-ink-muted mt-1 text-sm">{role}</p>
        </div>
      </div>
    </div>
  )
}

function ArchiveLink({ title, source, content, link }) {
  const Wrapper = link ? 'a' : 'div'
  const wrapperProps = link
    ? { href: link, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Wrapper
      {...wrapperProps}
      className={`bg-white/10 px-6 py-5 text-sm leading-relaxed sm:px-10 sm:py-6 ${
        link ? 'hover:bg-white/20' : ''
      }`}
    >
      <p>
        <span className="text-dark-ink-muted mr-2 text-sm">[{source}]</span>
        <span className="text-dark-ink text-base font-medium sm:text-lg">{title ?? source}</span>
      </p>
      {content && (
        <p className="text-dark-ink mt-3 text-sm whitespace-pre-line sm:text-base">{content}</p>
      )}
    </Wrapper>
  )
}

function YearRunBody({ run }) {
  const links = INTERVIEW_LINKS[run.id]

  return (
    <>
      <div className="mt-12 sm:mt-16">
        <p className="text-dark-ink-muted font-display text-5xl sm:text-6xl">{run.year}</p>

        <div className="mt-1 flex flex-col gap-1">
          {run.details.map((text, index) => (
            <p key={index} className="text-dark-ink-muted text-sm">
              {text}
            </p>
          ))}
        </div>

        {links && links.length > 0 && (
          <div className="mt-6 flex flex-col gap-4">
            {links.map((item, index) => (
              <ArchiveLink key={index} {...item} />
            ))}
          </div>
        )}
      </div>

      <div className="border-dark-line mt-16 border-t" />
    </>
  )
}

function NotFound() {
  return (
    <div className="bg-dark-bg flex min-h-screen flex-col items-center justify-center gap-6 px-6">
      <p className="text-dark-ink-muted text-sm">해당 아카이브를 찾을 수 없습니다.</p>
      <BackLink />
    </div>
  )
}

function HistoryDetail() {
  const { entryId } = useParams()
  const show = getShow(entryId)

  if (!show) return <NotFound />

  const [firstRun, ...restRuns] = [...show.runs].reverse()

  return (
    <div className="bg-dark-bg min-h-screen">
      <TopBanner showId={entryId} firstRun={firstRun} />

      <div className="border-dark-line mx-auto max-w-[1280px] border-t px-6 pt-8 sm:px-16">
        <BackLink />

        <ImageFrame
          title={show.title}
          role={firstRun.role}
          image={PROFILE_IMAGES[firstRun.id]}
          position={PROFILE_IMAGE_POSITIONS[firstRun.id]}
          zoom={PROFILE_IMAGE_ZOOMS[firstRun.id]}
          offset={PROFILE_IMAGE_OFFSETS[firstRun.id]}
          className="-mt-12 sm:-mt-24"
        />

        <YearRunBody run={firstRun} />
      </div>

      {restRuns.map((run) => (
        <div key={run.year} className="mx-auto max-w-[1280px] px-6 sm:px-16">
          <ImageFrame
            title={show.title}
            role={run.role}
            image={PROFILE_IMAGES[run.id]}
            position={PROFILE_IMAGE_POSITIONS[run.id]}
            zoom={PROFILE_IMAGE_ZOOMS[run.id]}
            offset={PROFILE_IMAGE_OFFSETS[run.id]}
            className="mt-16"
          />
          <YearRunBody run={run} />
        </div>
      ))}

      <div className="pb-40" />
    </div>
  )
}

export default HistoryDetail
