import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'
import Invoices from './components/invoices/Invoices'
import './App.css'
import InvoiceDetail from './components/invoices/InvoiceDetail'
import sampleData from './sampleData/data.json'

export default function App() {
  const [invoices, setInvoices] = useState(sampleData)

  function updateInvoice(updatedInvoice) {
    setInvoices(invoices.map(invoice => {
      if (invoice.id === updatedInvoice.id) return updatedInvoice
      return invoice
    }))
  }

  function deleteInvoice(id) {
    setInvoices(invoices.filter(invoice => invoice.id.toLowerCase() !== id.toLowerCase()))
  }

  return (
    <>
      <Sidebar />
      <main>
        <Routes>
          <Route path='/'  element={<Invoices invoices={invoices} />} />
          <Route path=':id' element=
            {
              <InvoiceDetail 
                invoices={invoices} 
                deleteInvoice={deleteInvoice} 
                updateInvoice={updateInvoice} 
              />
            }
          />
        </Routes>
      </main>
    </>
  )
}