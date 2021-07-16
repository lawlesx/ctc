export interface columnInterface {
  Header : string;
  accessor: string;
}

export const Columns: columnInterface[] = [
  {
    Header : "id",
    accessor: 'id'
  },
  {
    Header: 'First Name',
    accessor: 'first_name'
  }, 
  {
    Header: 'Last Name',
    accessor: 'last_name'
  },
  {
    Header: 'Email',
    accessor: 'email'
  },
  {
    Header: 'Ip Address',
    accessor: 'ip_address'
  }
]