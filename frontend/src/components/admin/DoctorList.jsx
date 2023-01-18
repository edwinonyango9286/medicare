import React from 'react'
import { useState } from 'react';
import DataTable,{ createTheme } from 'react-data-table-component'
import Base from '../Base';

createTheme('medicareDatatable', {
    text: {
      primary: 'white',
      secondary: '#2aa198',
    },
    background: {
      default: '',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark');

function DoctorList() {
    const [loading,setloading] = useState(true)
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
        },
    ];
    
    const data = [
        {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 2,
            title: 'The Ghostbusters',
            year: '1985',
        },
        {
            id: 3,
            title: 'Ghostbusters',
            year: '1987',
        },
        {
            id: 4,
            title: 'The Beetlejuice',
            year: '1982',
        },
    ]

  return (
    <Base>
        <div className="shadow-lg bg-gradient-to-br to-violet-800 from-sky-700">
            <DataTable
                progressPending={loading}
                columns={columns}
                data={data}
                theme="medicareDatatable"
            />
        </div>
    </Base>
  )
}

export default DoctorList