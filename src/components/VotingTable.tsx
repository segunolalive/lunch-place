import { MouseEvent, useEffect, useState } from 'react'
import { getVenueDetails } from '../API'
import { REQUEST_STATUSES } from '../hooks'
import {
  Button,
  TextInput,
  Table,
  TableHead,
  TH,
  TD,
  TableBody,
  TableRow,
} from './Primitives'

export type VenueType = {
  venue: {
    id: string
    name: string
    categories: { name: string }[]
    rating: number
    canonicalUrl: string
  }
}
type VenueProps = {
  venues: Omit<VenueType, 'rating'>[]
}

const summarizeVotes = (votes: [string, string][]) => {
  const summary = votes.reduce<Record<string, number>>((all, [, venueId]) => {
    all[venueId] = Number(all[venueId]) ? all[venueId] + 1 : 1
    return all
  }, {})
  const max = Math.max(...Object.values(summary))
  return { summary, max }
}

export function VotingTable({ venues }: VenueProps) {
  const [detailsStatus, setDetailsStatus] = useState<REQUEST_STATUSES>(
    REQUEST_STATUSES.IDLE
  )
  const [details, setDetails] = useState<VenueType[]>([])
  const venueIds = venues.map((v) => v.venue.id)
  const idString = venueIds.join('')
  const [votes, setVotes] = useState<[string, string][]>([]) // [particpant, venueId]
  const { summary, max } = summarizeVotes(votes)
  const [vote, setVote] = useState('')
  const [participant, setParticipant] = useState('')

  useEffect(() => {
    setDetailsStatus(REQUEST_STATUSES.LOADING)
    getVenueDetails<{ response: VenueType }>(venueIds).then((response) => {
      const venueDetails = response.reduce<VenueType[]>(
        (allDetails, current) => {
          if (current.status === 'fulfilled' && current.value) {
            allDetails.push(current.value.response)
          }
          return allDetails
        },
        []
      )
      setDetails(venueDetails)
      if (response.every((item) => item.status === 'fulfilled')) {
        setDetailsStatus(REQUEST_STATUSES.SUCCESS)
      } else {
        setDetailsStatus(REQUEST_STATUSES.ERROR)
      }
    })
  }, [idString])

  const addParticipant = (event: MouseEvent<HTMLButtonElement>): void => {
    setVotes([...votes, [participant, vote]])
    setVote('')
    setParticipant('')
  }

  if (detailsStatus === REQUEST_STATUSES.LOADING)
    return <div>. . . Loading . . .</div>
  if (detailsStatus === REQUEST_STATUSES.ERROR)
    return <div>An Error Occured :(</div>

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TH>Participants</TH>
            {details.map(({ venue }) => (
              <TH key={venue.id} data-highlighted={summary[venue.id] === max}>
                <a
                  href={venue.canonicalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>{venue.name}</p>
                  <p>{venue.rating}</p>
                  <p>{venue.categories?.[0]?.name}</p>
                </a>
              </TH>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {votes.map(([participant, vote], index) => (
            <TableRow key={index}>
              <TD>{participant}</TD>
              {venueIds.map((id) => (
                <TD key={id} data-selected={vote === id} />
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TD>
              <TextInput
                placeholder="Enter your name"
                value={participant}
                onChange={(e) => setParticipant(e.target.value)}
              />
            </TD>
            {details.map(({ venue }) => (
              <TD key={venue.id}>
                <label>
                  <input
                    id={venue.id}
                    type="radio"
                    name="venue"
                    value={venue.id}
                    onChange={(e) => setVote(e.target.value)}
                    checked={venue.id === vote}
                  />
                  👍 &nbsp;
                </label>
              </TD>
            ))}
          </TableRow>
        </TableBody>
      </Table>
      <Button onClick={addParticipant} disabled={!participant || !vote}>
        Add partticipant
      </Button>
    </div>
  )
}
