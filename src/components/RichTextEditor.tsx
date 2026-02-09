import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  rows?: number;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Escribe aquí...',
  label,
  required = false,
  rows = 8,
}: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'indent',
    'align',
    'link'
  ];

  if (!mounted) {
    return (
      <div>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div 
          className="border border-gray-300 rounded-md bg-gray-50 animate-pulse"
          style={{ height: `${rows * 24}px` }}
        />
      </div>
    );
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="rich-text-editor border border-gray-300 rounded-md">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          style={{ height: 'auto' }}
        />
      </div>
      <style>{`
        .rich-text-editor {
          display: flex;
          flex-direction: column;
        }
        .rich-text-editor .ql-container {
          border: none;
          border-top: 1px solid #d1d5db;
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          font-size: 1rem;
          font-family: inherit;
        }
        .rich-text-editor .ql-toolbar {
          border: none;
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          background-color: #f9fafb;
        }
        .rich-text-editor .ql-editor {
          min-height: ${rows * 24}px;
          max-height: ${rows * 32}px;
          overflow-y: auto;
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }
        /* Asegurar que el dropdown de headers se vea correctamente */
        .rich-text-editor .ql-picker-options {
          z-index: 1000;
        }
        .rich-text-editor .ql-header .ql-picker-label {
          display: flex;
          align-items: center;
        }
        .ql-snow .ql-header.ql-picker {
          width: 100px;
        }
      `}</style>
    </div>
  );
}
