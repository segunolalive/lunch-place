import { useState } from 'react'
import { Container, SearchBox, VenueType, VotingTable } from './components'
import { useVenues } from './hooks'

type Group = {
  items: VenueType[]
}

type SearchResponse = {
  response: {
    groups: Group[]
  }
}

function App() {
  const [searchText, setSearchText] = useState('')
  const { data } = useVenues<SearchResponse>(searchText)

  const venues = data?.response?.groups?.[0]?.items
  return (
    <Container>
      <h1>Lunchplace</h1>
      <SearchBox initialValue={searchText} searchFn={setSearchText} />
      {venues && <VotingTable venues={data?.response?.groups?.[0]?.items} />}
    </Container>
  )
}

export default App
