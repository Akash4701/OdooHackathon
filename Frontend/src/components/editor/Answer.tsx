import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, Italic, Underline, List, ListOrdered, Code, Link, 
  Image, Eye, Edit3, Send, Smile, Hash, Quote, Type,
  AlignLeft, AlignCenter, AlignRight, Undo, Redo,
  Strikethrough, Highlighter, Palette, ChevronDown
} from 'lucide-react';
import { useParams } from 'react-router-dom';

const AnswerEditor = () => {
  const [content, setContent] = useState('');
 const { questionId } = useParams();
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [urlError, setUrlError] = useState('');
  const textareaRef = useRef(null);

  const emojis = ['😊', '😍', '🤔', '👍', '👎', '❤️', '🔥', '💯', '🎉', '🚀', '💡', '⚡', '🌟', '✨', '🎯', '🔔'];
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];

  

  const insertAtCursor = (text) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent = content.substring(0, start) + text + content.substring(end);
    
    setContent(newContent);
    
    // Focus and set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  const wrapSelection = (before, after = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const replacement = before + selectedText + after;
    
    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
      } else {
        textarea.setSelectionRange(start + before.length, start + before.length);
      }
    }, 0);
  };

  const formatText = (type) => {
    setShowEmojiPicker(false);
    setShowColorPicker(false);
    
    switch (type) {
      case 'bold':
        wrapSelection('**', '**');
        break;
      case 'italic':
        wrapSelection('*', '*');
        break;
      case 'underline':
        wrapSelection('<u>', '</u>');
        break;
      case 'strikethrough':
        wrapSelection('~~', '~~');
        break;
      case 'code':
        wrapSelection('`', '`');
        break;
      case 'codeblock':
        insertAtCursor('\n```\n\n```\n');
        break;
      case 'quote':
        insertAtCursor('\n> ');
        break;
      case 'h1':
        insertAtCursor('\n# ');
        break;
      case 'h2':
        insertAtCursor('\n## ');
        break;
      case 'h3':
        insertAtCursor('\n### ');
        break;
      case 'ul':
        insertAtCursor('\n- ');
        break;
      case 'ol':
        insertAtCursor('\n1. ');
        break;
      case 'link':
        wrapSelection('[', '](url)');
        break;
      case 'image':
        insertAtCursor('![alt text](image-url)');
        break;
      case 'hr':
        insertAtCursor('\n---\n');
        break;
      case 'highlight':
        wrapSelection('==', '==');
        break;
    }
  };

  const renderPreview = (text) => {
    // Simple markdown-like rendering for preview
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-800 text-green-400 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/==(.*?)==/g, '<mark class="bg-yellow-400 text-black px-1">$1</mark>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-2 text-white">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-2 text-white">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mb-2 text-white">$1</h3>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-300 mb-2">$1</blockquote>')
      .replace(/^- (.*$)/gm, '<li class="ml-4 text-gray-300">• $1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 list-decimal text-gray-300">$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:underline">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded" />')
      .replace(/^---$/gm, '<hr class="border-gray-600 my-4" />')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-300 p-3 rounded overflow-x-auto"><code>$1</code></pre>')
      .replace(/\n/g, '<br />');

    return { __html: html };
  };

  const handleSubmit = async () => {
    // Validate content
    if (!content.trim() || content.length < 10) {
      alert('Content must be at least 10 characters long');
      return;
    }
    
    // Validate questionId - must be from URL only
  

    setIsSubmitting(true);
    const ans = {
      content: content.trim(),
      questionId: questionId
    };
    console.log('Submitting answer:', ans);
    
    try {
      const response = await fetch('http://localhost:8000/api/v1/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ans)
      });

      if (response.ok) {
        alert('Answer submitted successfully!');
        setContent('');
        // Note: questionId remains from URL, not cleared
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to submit answer'}`);
      }
    } catch (error) {
      alert(`Network error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-2">Answer Editor</h1>
          <p className="text-gray-300">Create rich, formatted answers with markdown support</p>
        </div>

        {/* Question ID Display - Read-only from URL */}
        <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
          <h3 className="font-semibold text-gray-100 mb-2">Question ID (from URL)</h3>
          {urlError ? (
            <div className="text-red-400 text-sm">
              <p>{urlError}</p>
              <p className="mt-1">Current URL: {window.location.href}</p>
            </div>
          ) : (
            <div className="text-green-400 text-sm">
              <p>Question ID: <span className="font-mono bg-gray-700 px-2 py-1 rounded">{questionId}</span></p>
              <p className="text-gray-400 mt-1">✓ Extracted from URL parameters</p>
            </div>
          )}
        </div>

        {/* Editor Controls */}
        <div className="border border-gray-600 rounded-lg overflow-hidden shadow-lg">
          {/* Toolbar */}
          <div className="bg-gray-800 border-b border-gray-600 p-3">
            <div className="flex flex-wrap gap-2 items-center">
              {/* Mode Toggle */}
              <div className="flex bg-gray-700 rounded-lg border border-gray-600 overflow-hidden">
                <button
                  onClick={() => setIsPreview(false)}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    !isPreview 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Edit3 className="w-4 h-4 inline mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => setIsPreview(true)}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    isPreview 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Eye className="w-4 h-4 inline mr-1" />
                  Preview
                </button>
              </div>

              <div className="w-px h-6 bg-gray-600"></div>

              {/* Text Formatting */}
              <div className="flex gap-1">
                <button
                  onClick={() => formatText('bold')}
                  className="p-2 rounded hover:bg-gray-700 transition-colors text-gray-300"
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  onClick={() => formatText('italic')}
                  className="p-2 rounded hover:bg-gray-700 transition-colors text-gray-300"
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  onClick={() => formatText('underline')}
                  className="p-2 rounded hover:bg-gray-700 transition-colors text-gray-300"
                  title="Underline"
                >
                  <Underline className="w-4 h-4" />
                </button>
                <button
                  onClick={() => formatText('strikethrough')}
                  className="p-2 rounded hover:bg-gray-700 transition-colors text-gray-300"
                  title="Strikethrough"
                >
                  <Strikethrough className="w-4 h-4" />
                </button>
                <button
                  onClick={() => formatText('highlight')}
                  className="p-2 rounded hover:bg-gray-700 transition-colors text-gray-300"
                  title="Highlight"
                >
                  <Highlighter className="w-4 h-4" />
                </button>
              </div>

              <div className="w-px h-6 bg-gray-600"></div>

              {/* Headers */}
              <div className="flex gap-1">
                <button
                  onClick={() => formatText('h1')}
                  className="px-2 py-1 rounded hover:bg-gray-700 transition-colors text-sm font-medium text-gray-300"
                  title="Heading 1"
                >
                  H1
                </button>
                <button
                  onClick={() => formatText('h2')}
                  className="px-2 py-1 rounded hover:bg-gray-700 transition-colors text-sm font-medium text-gray-300"
                  title="Heading 2"
                >
                  H2
                </button>
                <button
                  onClick={() => formatText('h3')}
                  className="px-2 py-1 rounded hover:bg-gray-700 transition-colors text-sm font-medium text-gray-300"
                  title="Heading 3"
                >
                  H3
                </button>
              </div>

              <div className="w-px h-6 bg-gray-600"></div>

              {/* Lists */}
              <div className="flex gap-1">
                <button
                  onClick={() => formatText('ul')}
                  className="p-2 rounded hover:bg-gray-700 transition-colors text-gray-300"
                  title="Bullet List"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => formatText('ol')}
                  className="p-2 rounded hover:bg-gray-700 transition-colors text-gray-300"
                  title="Numbered List"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
              </div>

              <div className="w-px h-6 bg-gray-600"></div>

              {/* Code & Quote */}
              <div className="flex gap-1">
                <button
                  onClick={() => formatText('code')}
                  className="p-2 rounded hover:bg-gray-700 transition-colors text-gray-300"
                  title="Inline Code"
                >
                  <Code className="w-4 h-4" />
                </button>
                <button
                  onClick={() => formatText('codeblock')}
                  className="px-2 py-1 rounded hover:bg-gray-700 transition-colors text-sm font-medium text-gray-300"
                  title="Code Block"
                >
                  {}
                </button>
                <button
                  onClick={() => formatText('quote')}
                  className="p-2 rounded hover:bg-gray-700 transition-colors text-gray-300"
                  title="Quote"
                >
                  <Quote className="w-4 h-4" />
                </button>
              </div>

              <div className="w-px h-6 bg-gray-600"></div>

              {/* Links & Media */}
              <div className="flex gap-1">
                <button
                  onClick={() => formatText('link')}
                  className="p-2 rounded hover:bg-gray-700 transition-colors text-gray-300"
                  title="Link"
                >
                  <Link className="w-4 h-4" />
                </button>
                <button
                  onClick={() => formatText('image')}
                  className="p-2 rounded hover:bg-gray-700 transition-colors text-gray-300"
                  title="Image"
                >
                  <Image className="w-4 h-4" />
                </button>
              </div>

              <div className="w-px h-6 bg-gray-600"></div>

              {/* Emoji Picker */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowEmojiPicker(!showEmojiPicker);
                    setShowColorPicker(false);
                  }}
                  className="p-2 rounded hover:bg-gray-700 transition-colors text-gray-300"
                  title="Emoji"
                >
                  <Smile className="w-4 h-4" />
                </button>
                {showEmojiPicker && (
                  <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-3 z-10">
                    <div className="grid grid-cols-8 gap-1">
                      {emojis.map((emoji, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            insertAtCursor(emoji);
                            setShowEmojiPicker(false);
                          }}
                          className="w-8 h-8 rounded hover:bg-gray-700 transition-colors flex items-center justify-center"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Horizontal Rule */}
              <button
                onClick={() => formatText('hr')}
                className="px-2 py-1 rounded hover:bg-gray-700 transition-colors text-sm font-medium text-gray-300"
                title="Horizontal Rule"
              >
                HR
              </button>
            </div>
          </div>

          {/* Editor/Preview Area */}
          <div className="relative">
            {!isPreview ? (
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your answer... Use markdown syntax for formatting!"
                className="w-full h-96 p-4 bg-gray-900 text-gray-300 border-none outline-none resize-none font-mono text-sm leading-6 placeholder-gray-500"
                style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}
              />
            ) : (
              <div className="h-96 p-4 overflow-y-auto bg-gray-900">
                {content ? (
                  <div 
                    className="prose prose-sm max-w-none text-gray-300"
                    dangerouslySetInnerHTML={renderPreview(content)}
                  />
                ) : (
                  <div className="text-gray-500 italic">Preview will appear here...</div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-800 border-t border-gray-600 p-3 flex justify-between items-center">
            <div className="text-sm text-gray-400">
              Characters: {content.length} {content.length < 10 && content.length > 0 && (
                <span className="text-red-400">(minimum 10)</span>
              )}
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || content.length < 10 }
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Answer
                </>
              )}
            </button>
          </div>
        </div>

        {/* Markdown Help */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
          <h3 className="font-semibold text-gray-100 mb-2">Markdown Quick Reference</h3>
          <div className="text-sm text-gray-300 space-y-1">
            <p><code className="bg-gray-700 px-1 py-0.5 rounded">**bold**</code> → <strong>bold</strong></p>
            <p><code className="bg-gray-700 px-1 py-0.5 rounded">*italic*</code> → <em>italic</em></p>
            <p><code className="bg-gray-700 px-1 py-0.5 rounded">`code`</code> → <code className="bg-gray-700 px-1 py-0.5 rounded">code</code></p>
            <p><code className="bg-gray-700 px-1 py-0.5 rounded">[link](url)</code> → link</p>
            <p><code className="bg-gray-700 px-1 py-0.5 rounded">- list item</code> → bullet point</p>
            <p><code className="bg-gray-700 px-1 py-0.5 rounded"># Heading</code> → Large heading</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerEditor;