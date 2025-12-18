'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

interface Comment {
  title: string
  body: string
}

interface CommentsFormProps {
  comments: Comment[]
  onChange: (comments: Comment[]) => void
}

export default function CommentsForm({ comments, onChange }: CommentsFormProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleAdd = () => {
    if (title.trim() && body.trim()) {
      onChange([...comments, { title: title.trim(), body: body.trim() }])
      setTitle('')
      setBody('')
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Add Comments</h3>
        <p className="text-sm text-gray-500">Add comment for your customer</p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title of comment"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:border-transparent"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Comment here"
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:border-transparent resize-none"
        />
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 text-sm text-[#0F5132] hover:underline font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add more comment</span>
        </button>
      </div>
    </div>
  )
}
