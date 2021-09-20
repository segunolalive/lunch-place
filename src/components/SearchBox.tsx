import { useState, ChangeEvent, FormEvent } from 'react'
import { Button, Form, SRText, SearchInput } from './Primitives';


type SearchProps = {
  initialValue?: string
  searchFn: (text: string) => void
}


export function SearchBox({ initialValue = '', searchFn }: SearchProps) {
  const [text, setText] = useState(initialValue)

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value)
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    console.log("SUBMITTING ========")
    searchFn(text)
  }

  return (
    <Form onSubmit={onSubmit}>
      <label htmlFor="search-field">
        <SRText>Enter address</SRText>
      </label>
      <SearchInput
        type="text"
        inputMode="search"
        value={text}
        id="search-field"
        onChange={onChange}
        placeholder="e.g Lagos"
      />
      <Button type="submit">Search</Button>
    </Form>
  )
}
