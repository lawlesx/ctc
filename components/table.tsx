import { useMemo } from 'react';
import { useTable } from 'react-table';
import Data from '../data/data.json';
import {Columns} from './column';
import useSWR from 'swr';

const fetcher = async(path : string) => {
  const res = await fetch(path);
  
  return res.json();
}

export interface data { 
  id: number,
  first_name: string,
  last_name: string,
  email: string,  
  gender: string,
  ip_address: string,
  
}

export default function Table() {
  const { data, error } = useSWR('http://localhost:8000/items', fetcher);
  console.log(data);
  
  console.log(Columns);

  const columns = useMemo(()=> Columns, [])
  const row: data[] = useMemo(()=> Data, [])

  console.log(columns,row)

  const tableInstance = useTable({
    columns,
    row
  })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance

  return (
    <div>
      <table {...getTableProps}>
        <thead>
          {
            headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps}>
                {
                  headerGroup.headers.map ( column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))
                }
              </tr>
            ))
          }         
        </thead>
        <tbody {...getTableBodyProps}>
          {
            rows.map(row => {
              prepareRow(row)
              return (
                  <tr {...row.getRowProps()}>
                    {
                      row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      })
                    }            
                  </tr>
                )
            })
          }
          
        </tbody>
      </table>
    </div>
  )

  return (
    <div>Hello</div>
  )
}