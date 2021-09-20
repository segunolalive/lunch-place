import styled from 'styled-components'

export const Table = styled.table`
  min-width: 500px;
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
`
  
export const TableHead = styled.thead``
  
export const TableBody = styled.tbody``

export const TH = styled.th`
  border: 2px solid #c0cbc294;
  width: 20%;

  &[data-ratio="2/5"] {
    width: 40%;
  }

  &[data-highlighted="true"] {
    background-color: #a3ba3369;
  }
`

export const TD = styled.td`
  height: 35px;
  padding: 2px;
  border: 2px solid #c0cbc294;
  position: relative;

  &[data-selected="true"] {
    background-color: #9fb82396;
  }
`

export const TableRow = styled.tr``
