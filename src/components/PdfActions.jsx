import React from 'react'
import html2pdf from 'html2pdf.js'

function pad(n) { return n.toString().padStart(2, '0') }

const dateToYmd = (s) => {
  try {
    const d = new Date(s)
    return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}`
  } catch {
    return ''
  }
}

const PdfActions = ({ data }) => {
  const onDownload = async () => {
    const el = document.getElementById('offer-preview')
    if (!el) return
    const cleanName = (data.candidate_name || 'Candidate').split(/\s+/)[0]
    const cleanCompany = (data.company_name || 'Company').split(/\s+/)[0]
    const dateStr = dateToYmd(data.start_date) || 'DATE'
    const fileName = `OFFER_${cleanName}_${cleanCompany}_${dateStr}.pdf`

    const opt = {
      margin: [10, 10, 10, 10],
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    await html2pdf().set(opt).from(el).save()
  }

  const onEmail = () => {
    alert('Email sending is not configured in this demo. You can attach the downloaded PDF to your email.')
  }

  return (
    <div className="flex items-center gap-3">
      <button onClick={onDownload} className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium">Download PDF</button>
      <button onClick={onEmail} className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">Email PDF</button>
    </div>
  )
}

export default PdfActions
