import { useEffect, useState } from 'react'
import { Routes, Route, useSearchParams, useResolvedPath } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'
import Invoices from './components/invoices/Invoices'
import './App.css'
import InvoiceDetail from './components/invoices/InvoiceDetail'
import Form from './components/form/Form'
import { getInvoices } from '../lib/getInvoices'
import { deleteInvoiceById } from '../lib/deleteInvoiceById'

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams()

  const { pathname } = useResolvedPath()

  const [invoices, setInvoices] = useState([])
  const [editInvoiceVisible, setEditInvoiceVisible] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  function updateInvoice(updatedInvoice) {
    setInvoices(invoices.map(invoice => {
      if (invoice.invoiceId === updatedInvoice.invoiceId) return updatedInvoice
      return invoice
    }))
  }

  function deleteInvoice(id) {
    setInvoices(invoices.filter(invoice => invoice.invoiceId.toLowerCase() !== id.toLowerCase()))

    deleteInvoiceById(id)
      .then(res => console.log(res))
      .catch(e => console.log(e))
  }

  function toggleEditInvoiceForm() {
    setEditInvoiceVisible(!editInvoiceVisible)
  }

  async function refreshInvoices() {
    setLoading(true)

    try {
      const refreshedInvoices = await getInvoices()

      if (refreshInvoices === 'Failed to fetch') {
        setError(true)
      } else {
        setInvoices(refreshedInvoices)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (searchParams.has('edit') && searchParams.get('edit')) {
      const id = pathname.replace('/', '')

      const targetInvoice = invoices.find(invoice => invoice.invoiceId.toLowerCase() === id.toLowerCase())

      setSelectedInvoice(targetInvoice)
    } else {
      setSelectedInvoice(null)
    }
  }, [searchParams])

  useEffect(() => {
    refreshInvoices()
  }, [])

  return (
    <>
      <Sidebar />
      <main>
        <Routes>
          <Route path='/'>
            <Route index  element={<Invoices error={error} loading={loading} invoices={invoices} toggleEditInvoiceForm={toggleEditInvoiceForm} />} />
            <Route path=':id' element=
              {
                <InvoiceDetail
                  refresh={refreshInvoices}
                  invoices={invoices} 
                  deleteInvoice={deleteInvoice} 
                  updateInvoice={updateInvoice}
                  toggleEditInvoiceForm={toggleEditInvoiceForm}
                />
              }
            />
          </Route>
        </Routes>
        <Form refresh={refreshInvoices} invoiceIds={invoices ? invoices?.map(invoice => invoice.invoiceId) : []} isVisible={editInvoiceVisible} hideForm={toggleEditInvoiceForm} invoice={selectedInvoice} />
      </main>
    </>
  )
}