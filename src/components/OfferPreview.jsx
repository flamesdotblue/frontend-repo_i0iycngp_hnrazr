import React, { forwardRef } from 'react'

const t = {
  en: {
    dear: 'Dear',
    weArePleased: 'We are pleased to offer you the position of',
    inOur: 'in our',
    teamAt: 'team at',
    startDate: 'Your expected start date is',
    reportingTo: 'and you will be reporting to',
    atOur: 'at our',
    office: 'office.',
    salary: 'The total compensation offered to you is',
    validUntil: 'This offer is valid until',
    pleaseSign: 'Please sign and return a copy of this letter to confirm your acceptance.',
    sincerely: 'Sincerely',
    notes: 'Notes / Special Conditions',
  },
  hi: {
    dear: 'प्रिय',
    weArePleased: 'हमें आपको पद प्रस्तावित करते हुए प्रसन्नता हो रही है',
    inOur: 'हमारी',
    teamAt: 'टीम में',
    startDate: 'आपकी अपेक्षित ज्वाइनिंग तिथि है',
    reportingTo: 'और आप रिपोर्ट करेंगे',
    atOur: 'हमारे',
    office: 'ऑफ़िस में।',
    salary: 'आपका कुल पारिश्रमिक होगा',
    validUntil: 'यह ऑफ़र मान्य है तक',
    pleaseSign: 'कृपया स्वीकृति हेतु इस पत्र पर हस्ताक्षर कर वापस भेजें।',
    sincerely: 'सादर',
    notes: 'नोट्स / विशेष शर्तें',
  }
}

const formatDate = (dateStr, lang) => {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-GB', {
      year: 'numeric', month: 'long', day: 'numeric'
    })
  } catch (e) {
    return dateStr
  }
}

const Para = ({ children }) => (
  <p className="mb-4 leading-7 text-gray-800">{children}</p>
)

const Section = ({ title, children }) => (
  <div className="mt-6">
    <h3 className="text-sm font-semibold tracking-wide text-gray-500 uppercase mb-2">{title}</h3>
    <div className="prose prose-sm max-w-none">
      {children}
    </div>
  </div>
)

const sanitizeNotes = (input) => {
  if (!input) return ''
  let s = input.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  s = s.replace(/on\w+\s*=\s*"[^"]*"/gi, '')
  s = s.replace(/on\w+\s*=\s*'[^']*'/gi, '')
  // very lightweight markdown: *bold* and _italic_
  s = s.replace(/\*(.*?)\*/g, '<strong>$1</strong>').replace(/_(.*?)_/g, '<em>$1</em>')
  // preserve line breaks
  s = s.replace(/\n/g, '<br/>')
  return s
}

const FormalTemplate = ({ d, lang }) => {
  const i = t[lang]
  return (
    <div className="px-10 py-12">
      <header className="flex items-center justify-between mb-8">
        <div>
          {d.company_logo && <img src={d.company_logo} alt="logo" className="h-14 object-contain" />}
        </div>
        <div className="text-right text-sm text-gray-600">
          <div className="font-semibold text-gray-800">{d.company_name}</div>
          <div className="max-w-[280px]">{d.company_address}</div>
        </div>
      </header>
      <main className="text-[11pt]">
        <Para>
          {i.dear} <span className="font-semibold">{d.candidate_name}</span>,
        </Para>
        <Para>
          {i.weArePleased} <span className="font-semibold">{d.designation}</span> {i.inOur} {d.department ? <span className="font-semibold">{d.department}</span> : '—'} {i.teamAt} <span className="font-semibold">{d.company_name}</span>. {i.startDate} <span className="font-semibold">{formatDate(d.start_date, lang)}</span> {i.reportingTo} <span className="font-semibold">{d.reporting_manager}</span> {i.atOur} <span className="font-semibold">{d.location}</span> {i.office}
        </Para>
        <Para>
          {i.salary} <span className="font-semibold">{d.salary}</span>. {i.validUntil} <span className="font-semibold">{formatDate(d.offer_expiry, lang)}</span>.
        </Para>
        {d.salary_breakup && (
          <Section title="Compensation Details">
            <div>{d.salary_breakup}</div>
          </Section>
        )}
        {d.notes && (
          <Section title={t[lang].notes}>
            <div dangerouslySetInnerHTML={{ __html: sanitizeNotes(d.notes) }} />
          </Section>
        )}
        <Para>{i.pleaseSign}</Para>
      </main>
      <footer className="mt-12">
        <div className="h-16">
          {d.signature_image && <img src={d.signature_image} alt="signature" className="h-16 object-contain" />}
        </div>
        <div className="text-sm font-medium">{d.signatory_name}</div>
        <div className="text-sm text-gray-600">{d.signatory_designation}</div>
        {d.footer_text && (
          <div className="border-t mt-8 pt-3 text-xs text-gray-500">{d.footer_text}</div>
        )}
      </footer>
    </div>
  )
}

const FriendlyTemplate = ({ d, lang }) => {
  const i = t[lang]
  return (
    <div className="px-10 py-12">
      <header className="flex items-start gap-4 mb-8">
        {d.company_logo && <img src={d.company_logo} alt="logo" className="h-14 object-contain" />}
        <div>
          <div className="text-2xl font-extrabold text-blue-700">Offer Letter</div>
          <div className="text-sm text-gray-500">{d.company_name} • {d.company_address}</div>
        </div>
      </header>
      <main className="text-[11pt]">
        <Para>
          <span className="font-semibold">{i.dear} {d.candidate_name}</span> — welcome! We're thrilled to invite you to join us as a <span className="font-semibold">{d.designation}</span> {d.department ? `in ${d.department}` : ''} at <span className="font-semibold">{d.company_name}</span>.
        </Para>
        <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-md border">
          <div><span className="font-medium">Start:</span> {formatDate(d.start_date, lang)}</div>
          <div><span className="font-medium">Manager:</span> {d.reporting_manager}</div>
          <div><span className="font-medium">Location:</span> {d.location}</div>
          <div><span className="font-medium">CTC:</span> {d.salary}</div>
          {d.employee_id && <div><span className="font-medium">Employee ID:</span> {d.employee_id}</div>}
          <div><span className="font-medium">Valid until:</span> {formatDate(d.offer_expiry, lang)}</div>
        </div>
        {d.salary_breakup && (
          <Section title="Compensation Details">
            <div>{d.salary_breakup}</div>
          </Section>
        )}
        {d.notes && (
          <Section title={t[lang].notes}>
            <div dangerouslySetInnerHTML={{ __html: sanitizeNotes(d.notes) }} />
          </Section>
        )}
        <Para>
          {i.pleaseSign}
        </Para>
      </main>
      <footer className="mt-12">
        <div className="h-16">
          {d.signature_image && <img src={d.signature_image} alt="signature" className="h-16 object-contain" />}
        </div>
        <div className="text-sm font-medium">{d.signatory_name} • {d.signatory_designation}</div>
        {d.footer_text && (
          <div className="border-t mt-8 pt-3 text-xs text-gray-500">{d.footer_text}</div>
        )}
      </footer>
    </div>
  )
}

const OfferPreview = forwardRef(({ data, template, language, showGuides }, ref) => {
  return (
    <div ref={ref} id="offer-preview" className="bg-white shadow-xl mx-auto">
      {/* PDF A4 dimensions at 96 DPI ~ 794x1123, we keep responsive but with A4 ratio */}
      <div className="w-[794px] max-w-full" style={{ aspectRatio: '1 / 1.414' }}>
        <div className="relative h-full">
          {showGuides && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-8 border-2 border-dashed border-blue-200"></div>
            </div>
          )}
          {template === 'formal' ? (
            <FormalTemplate d={data} lang={language} />
          ) : (
            <FriendlyTemplate d={data} lang={language} />
          )}
        </div>
      </div>
    </div>
  )
})

export default OfferPreview
