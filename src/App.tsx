import { useState } from 'react';
import { Container, SearchBox , VenueType, Venues} from './components';
import { VenueProvider, useVenues, } from "./hooks";

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
    <VenueProvider>
      <Container>
        <h1>Lunchplace</h1>
        <SearchBox initialValue={searchText} searchFn={setSearchText} />
        { venues &&
          <Venues venues={data?.response?.groups?.[0]?.items} />}
      </Container>
    </VenueProvider>
  );
}

export default App;
