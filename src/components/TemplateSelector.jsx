import React from 'react'

const TemplateSelector = ({ template, setTemplate, language, setLanguage, onToggleGuides, showGuides }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="formal">Formal</option>
          <option value="friendly">Friendly</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
        </select>
      </div>
      <div className="flex items-end">
        <button
          type="button"
          onClick={onToggleGuides}
          className={`w-full rounded-md border px-3 py-2 text-sm font-medium ${showGuides ? 'border-blue-500 text-blue-600' : 'border-gray-300 text-gray-700'}`}
        >
          {showGuides ? 'Hide' : 'Show'} Guides
        </button>
      </div>
    </div>
  )
}

export default TemplateSelector
