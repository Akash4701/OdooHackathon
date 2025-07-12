import React, { useState, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Link2,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Smile,
  Save,
  Eye,
  Code,
  Quote,
  Minus,
  Undo,
  Redo,
  Plus,
  X
} from 'lucide-react'

const emojis = ['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🔥', '💯', '🎉', '🚀', '💡', '⭐', '✨', '🌟', '🎯']

const MenuBar = ({ editor, isMobile }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')

  const addLink = useCallback(() => {
    if (linkUrl) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
      setLinkUrl('')
      setShowLinkDialog(false)
    }
  }, [editor, linkUrl])

  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const addEmoji = useCallback((emoji) => {
    editor.chain().focus().insertContent(emoji).run()
    setShowEmojiPicker(false)
  }, [editor])

  if (!editor) return null

  const buttonClass = "flex items-center justify-center p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  const activeClass = "bg-blue-500 text-white hover:bg-blue-600"

  return (
    <div className={`border-b border-gray-200 bg-gray-50 ${isMobile ? 'p-2' : 'p-3'}`}>
      <div className={`flex flex-wrap gap-1 ${isMobile ? 'gap-1' : 'gap-2'}`}>
        {/* Text Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${buttonClass} ${editor.isActive('bold') ? activeClass : ''}`}
          title="Bold"
        >
          <Bold size={isMobile ? 16 : 18} />
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${buttonClass} ${editor.isActive('italic') ? activeClass : ''}`}
          title="Italic"
        >
          <Italic size={isMobile ? 16 : 18} />
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${buttonClass} ${editor.isActive('strike') ? activeClass : ''}`}
          title="Strikethrough"
        >
          <Strikethrough size={isMobile ? 16 : 18} />
        </button>

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${buttonClass} ${editor.isActive('bulletList') ? activeClass : ''}`}
          title="Bullet List"
        >
          <List size={isMobile ? 16 : 18} />
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${buttonClass} ${editor.isActive('orderedList') ? activeClass : ''}`}
          title="Numbered List"
        >
          <ListOrdered size={isMobile ? 16 : 18} />
        </button>

        {/* Text Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`${buttonClass} ${editor.isActive({ textAlign: 'left' }) ? activeClass : ''}`}
          title="Align Left"
        >
          <AlignLeft size={isMobile ? 16 : 18} />
        </button>
        
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`${buttonClass} ${editor.isActive({ textAlign: 'center' }) ? activeClass : ''}`}
          title="Align Center"
        >
          <AlignCenter size={isMobile ? 16 : 18} />
        </button>
        
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`${buttonClass} ${editor.isActive({ textAlign: 'right' }) ? activeClass : ''}`}
          title="Align Right"
        >
          <AlignRight size={isMobile ? 16 : 18} />
        </button>

        {/* Emoji Picker */}
        <div className="relative">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className={buttonClass}
            title="Insert Emoji"
          >
            <Smile size={isMobile ? 16 : 18} />
          </button>
          {showEmojiPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-2 z-10">
              <div className="grid grid-cols-4 gap-1">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => addEmoji(emoji)}
                    className="p-1 hover:bg-gray-100 rounded text-lg"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Link */}
        <div className="relative">
          <button
            onClick={() => setShowLinkDialog(!showLinkDialog)}
            className={`${buttonClass} ${editor.isActive('link') ? activeClass : ''}`}
            title="Insert Link"
          >
            <Link2 size={isMobile ? 16 : 18} />
          </button>
          {showLinkDialog && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-3 z-10 min-w-64">
              <input
                type="url"
                placeholder="Enter URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                onKeyPress={(e) => e.key === 'Enter' && addLink()}
              />
              <div className="flex gap-2">
                <button
                  onClick={addLink}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowLinkDialog(false)}
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Image */}
        <button
          onClick={addImage}
          className={buttonClass}
          title="Insert Image"
        >
          <ImageIcon size={isMobile ? 16 : 18} />
        </button>

        {/* Additional formatting */}
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`${buttonClass} ${editor.isActive('code') ? activeClass : ''}`}
          title="Inline Code"
        >
          <Code size={isMobile ? 16 : 18} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${buttonClass} ${editor.isActive('blockquote') ? activeClass : ''}`}
          title="Quote"
        >
          <Quote size={isMobile ? 16 : 18} />
        </button>

        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={buttonClass}
          title="Horizontal Rule"
        >
          <Minus size={isMobile ? 16 : 18} />
        </button>

        {/* Undo/Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className={buttonClass}
          title="Undo"
        >
          <Undo size={isMobile ? 16 : 18} />
        </button>
        
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className={buttonClass}
          title="Redo"
        >
          <Redo size={isMobile ? 16 : 18} />
        </button>
      </div>
    </div>
  )
}

const TagInput = ({ tags, setTags, isMobile }) => {
  const [inputValue, setInputValue] = useState('')

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setInputValue('')
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Tags</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="hover:text-blue-600"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTag(inputValue.trim())
            }
          }}
          placeholder="Add a tag..."
          className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={() => addTag(inputValue.trim())}
          className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  )
}

const TiptapEditor = () => {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your content here...',
      }),
    ],
    content: '<p>Start writing your amazing content here! 🚀</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none min-h-[300px] p-4',
      },
    },
  })

  const saveContent = async () => {
    if (!editor || !title.trim()) {
      alert('Please provide a title and content')
      return
    }

    setIsSaving(true)
    try {
      const htmlContent = editor.getHTML()
      
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: htmlContent,
          tags: tags,
          createdAt: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        const result = await response.json()
        alert('Content saved successfully!')
        console.log('Saved content:', result)
      } else {
        throw new Error('Failed to save content')
      }
    } catch (error) {
      console.error('Error saving content:', error)
      alert('Error saving content. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className={`max-w-4xl mx-auto ${isMobile ? 'p-4' : 'p-6'} bg-white`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
            Rich Text Editor
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Eye size={16} />
              {previewMode ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={saveContent}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save size={16} />
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a short and descriptive title..."
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Tags Input */}
        <TagInput tags={tags} setTags={setTags} isMobile={isMobile} />

        {/* Editor */}
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
          <div className="text-sm font-medium text-gray-700 bg-gray-50 px-4 py-2 border-b border-gray-200">
            Description
          </div>
          
          {!previewMode ? (
            <>
              <MenuBar editor={editor} isMobile={isMobile} />
              <div className="min-h-[400px]">
                <EditorContent editor={editor} />
              </div>
            </>
          ) : (
            <div className="p-4 min-h-[400px]">
              <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">{title || 'Untitled'}</h2>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: editor?.getHTML() || '<p>No content yet...</p>' 
                  }} 
                />
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
          <p><strong>Features included:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Bold, Italic, Strikethrough formatting</li>
            <li>Numbered and bullet lists</li>
            <li>Emoji insertion</li>
            <li>Hyperlink insertion</li>
            <li>Image upload support</li>
            <li>Text alignment (Left, Center, Right)</li>
            <li>Code blocks, quotes, and horizontal rules</li>
            <li>Undo/Redo functionality</li>
            <li>Mobile responsive design</li>
            <li>Multi-select tags</li>
            <li>HTML output for database storage</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TiptapEditor