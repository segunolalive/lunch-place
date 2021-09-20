import styled from 'styled-components'

export const Button = styled.button`
  min-width: 3rem;
  border-radius: 2rem;
  padding: 0.5rem 2rem;
  text-align: center;
  font-weight: bold;
  color: white;
  background-color: #4f42a3;
  border: none;
  cursor: pointer;
`
export const Form = styled.form`
  display: flex;
  width: 100%;
  max-width: 500px;
}
`

export const TextInput = styled.input`
  width: 100%;
  background-color: white;
  border: 2px solid #eee;
  border-radius: 4px;
  padding: 0.5rem;
`

export const SearchInput = styled(TextInput)`
  flex-grow: 1;
  margin-right: 1rem;
`