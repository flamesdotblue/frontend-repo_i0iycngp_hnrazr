import React, { useRef } from 'react'

const Input = ({ label, required, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      {...props}
      className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className || ''}`}
    />
  </div>
)

const TextArea = ({ label, required, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      {...props}
      className={`w-full min-h-[96px] rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className || ''}`}
    />
  </div>
)

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const OfferForm = ({ data, setData, errors, setErrors }) => {
  const logoRef = useRef(null)
  const signRef = useRef(null)

  const update = (field, value) => {
    setData((d) => ({ ...d, [field]: value }))
  }

  const onImageChange = async (e, field) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setErrors((er) => ({ ...er, [field]: 'Max image size is 2MB' }))
      return
    }
    const url = await fileToDataUrl(file)
    setErrors((er) => ({ ...er, [field]: undefined }))
    update(field, url)
  }

  const storeLocal = () => {
    localStorage.setItem('offer_form_data', JSON.stringify(data))
  }

  const loadLocal = () => {
    const raw = localStorage.getItem('offer_form_data')
    if (raw) setData(JSON.parse(raw))
  }

  const clearLocal = () => {
    localStorage.removeItem('offer_form_data')
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Candidate Full Name" required value={data.candidate_name} onChange={(e) => update('candidate_name', e.target.value)} />
        <Input label="Designation / Job Title" required value={data.designation} onChange={(e) => update('designation', e.target.value)} />
        <Input label="Department (optional)" value={data.department} onChange={(e) => update('department', e.target.value)} />
        <Input type="date" label="Start Date" required value={data.start_date} onChange={(e) => update('start_date', e.target.value)} />
        <Input label="Reporting Manager" required value={data.reporting_manager} onChange={(e) => update('reporting_manager', e.target.value)} />
        <Input label="Location of Joining" required value={data.location} onChange={(e) => update('location', e.target.value)} />
        <Input label="Salary / CTC" required value={data.salary} onChange={(e) => update('salary', e.target.value)} />
        <TextArea label="Salary Breakup (optional)" value={data.salary_breakup} onChange={(e) => update('salary_breakup', e.target.value)} />
        <Input type="date" label="Offer Valid Until" required value={data.offer_expiry} onChange={(e) => update('offer_expiry', e.target.value)} />
        <Input label="Employee ID (optional)" value={data.employee_id} onChange={(e) => update('employee_id', e.target.value)} />
        <div className="md:col-span-2">
          <TextArea label="Notes / Special Conditions (optional)" placeholder="You can use basic Markdown like *bold* and _italic_." value={data.notes} onChange={(e) => update('notes', e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Company Name" required value={data.company_name} onChange={(e) => update('company_name', e.target.value)} />
        <TextArea label="Company Address" required value={data.company_address} onChange={(e) => update('company_address', e.target.value)} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo (PNG/JPG, max 2MB)</label>
          <input ref={logoRef} type="file" accept="image/*" onChange={(e) => onImageChange(e, 'company_logo')} />
          {errors?.company_logo && <p className="text-xs text-red-600 mt-1">{errors.company_logo}</p>}
          {data.company_logo && (
            <img src={data.company_logo} alt="logo" className="mt-2 h-12 object-contain" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Authorized Signatory Name" required value={data.signatory_name} onChange={(e) => update('signatory_name', e.target.value)} />
        <Input label="Signatory Designation" required value={data.signatory_designation} onChange={(e) => update('signatory_designation', e.target.value)} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Digital Signature (PNG, max 2MB)</label>
          <input ref={signRef} type="file" accept="image/*" onChange={(e) => onImageChange(e, 'signature_image')} />
          {errors?.signature_image && <p className="text-xs text-red-600 mt-1">{errors.signature_image}</p>}
          {data.signature_image && (
            <img src={data.signature_image} alt="signature" className="mt-2 h-12 object-contain" />
          )}
        </div>
        <Input label="Footer text (optional)" value={data.footer_text} onChange={(e) => update('footer_text', e.target.value)} />
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={storeLocal} className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800">Save for later</button>
        <button type="button" onClick={loadLocal} className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800">Load saved</button>
        <button type="button" onClick={clearLocal} className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800">Clear saved</button>
      </div>
    </div>
  )
}

export default OfferForm
