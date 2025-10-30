import React, { useRef, useState, useEffect } from 'react'
import { FileText, Settings, Download } from 'lucide-react'
import OfferForm from './components/OfferForm'
import OfferPreview from './components/OfferPreview'
import TemplateSelector from './components/TemplateSelector'
import PdfActions from './components/PdfActions'

const defaultData = {
  candidate_name: 'Sushma Sharma',
  designation: 'Frontend Developer',
  department: 'Product',
  start_date: '2025-11-12',
  reporting_manager: 'Amit Verma',
  location: 'Gurugram, India',
  salary: '₹6,00,000 per annum',
  salary_breakup: 'CTC: ₹6,00,000 | Basic: ₹28,000 | HRA: ₹10,000',
  offer_expiry: '2025-11-20',
  employee_id: 'GRH-2025-091',
  notes: 'This offer is contingent on background verification.',
  company_name: 'Greathire Pvt Ltd',
  company_address: 'Sector 10, Gurugram',
  company_logo: '',
  signatory_name: 'Rajat Malhotra',
  signatory_designation: 'HR Head',
  signature_image: '',
  footer_text: 'This is a computer generated document and does not require a physical signature.'
}

const requiredFields = [
  'candidate_name',
  'designation',
  'start_date',
  'reporting_manager',
  'location',
  'salary',
  'offer_expiry',
  'company_name',
  'signatory_name',
  'signatory_designation',
  'company_address'
]

function App() {
  const [data, setData] = useState(defaultData)
  const [errors, setErrors] = useState({})
  const [template, setTemplate] = useState('formal')
  const [language, setLanguage] = useState('en')
  const [showGuides, setShowGuides] = useState(false)
  const previewRef = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem('offer_form_data')
    if (saved) {
      try { setData(JSON.parse(saved)) } catch {}
    }
  }, [])

  const validate = () => {
    const e = {}
    requiredFields.forEach((f) => {
      if (!data[f] || String(data[f]).trim() === '') e[f] = 'Required'
    })
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onPasteJson = () => {
    const raw = prompt('Paste JSON input')
    if (!raw) return
    try {
      const obj = JSON.parse(raw)
      setData((d) => ({ ...d, ...obj }))
    } catch (e) {
      alert('Invalid JSON')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-blue-600 text-white"><FileText size={20} /></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Offer Letter Generator</h1>
              <p className="text-sm text-gray-600">Create professional Offer Letters with real-time preview and PDF export</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onPasteJson} className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">Paste JSON</button>
            <TemplateSelector template={template} setTemplate={setTemplate} language={language} setLanguage={setLanguage} onToggleGuides={() => setShowGuides(v => !v)} showGuides={showGuides} />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4 text-gray-700"><Settings size={18} /><span className="font-semibold">Offer Details</span></div>
            <OfferForm data={data} setData={setData} errors={errors} setErrors={setErrors} />
            <div className="mt-6">
              <PdfActions data={data} />
              {!validate() && (
                <p className="text-xs text-red-600 mt-3">Some required fields are missing. Fill them to ensure a complete PDF.</p>
              )}
            </div>
          </section>

          <section className="bg-white rounded-lg border shadow-sm p-0 overflow-hidden">
            <div className="bg-gray-50 border-b px-6 py-3 text-sm text-gray-600">Live Preview (A4)</div>
            <div className="p-3 overflow-auto">
              <OfferPreview ref={previewRef} data={data} template={template} language={language} showGuides={showGuides} />
            </div>
          </section>
        </div>

        <footer className="text-center text-xs text-gray-500 mt-8">
          Tip: You can save your form for later. Images are kept in your browser only.
        </footer>
      </div>
    </div>
  )
}

export default App
