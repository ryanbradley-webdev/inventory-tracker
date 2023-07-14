import { useEffect, useState } from 'react'
import { Routes, Route, useSearchParams, useResolvedPath } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'
import Invoices from './components/invoices/Invoices'
import './App.css'
import InvoiceDetail from './components/invoices/InvoiceDetail'
import sampleData from './sampleData/data.json'
import Form from './components/form/Form'

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams()

  const { pathname } = useResolvedPath()

  const [invoices, setInvoices] = useState(sampleData)
  const [editInvoiceVisible, setEditInvoiceVisible] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  function updateInvoice(updatedInvoice) {
    setInvoices(invoices.map(invoice => {
      if (invoice.id === updatedInvoice.id) return updatedInvoice
      return invoice
    }))
  }

  function deleteInvoice(id) {
    setInvoices(invoices.filter(invoice => invoice.id.toLowerCase() !== id.toLowerCase()))
  }

  function toggleEditInvoiceForm() {
    setEditInvoiceVisible(!editInvoiceVisible)
  }

  useEffect(() => {
    if (searchParams.has('edit') && searchParams.get('edit')) {
      const id = pathname.replace('/', '')

      const targetInvoice = invoices.find(invoice => invoice.id.toLowerCase() === id.toLowerCase())

      setSelectedInvoice(targetInvoice)
    } else {
      setSelectedInvoice(null)
    }
  }, [searchParams])

  return (
    <>
      <Sidebar />
      <main>
        <Routes>
          <Route path='/'>
            <Route index  element={<Invoices invoices={invoices} toggleEditInvoiceForm={toggleEditInvoiceForm} />} />
            <Route path=':id' element=
              {
                <InvoiceDetail 
                  invoices={invoices} 
                  deleteInvoice={deleteInvoice} 
                  updateInvoice={updateInvoice}
                  toggleEditInvoiceForm={toggleEditInvoiceForm}
                />
              }
            />
          </Route>
        </Routes>
        <Form isVisible={editInvoiceVisible} hideForm={toggleEditInvoiceForm} invoice={selectedInvoice} />
      </main>
    </>
  )
}