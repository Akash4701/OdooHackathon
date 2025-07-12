import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Underline,
  List, 
  ListOrdered, 
  Link, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Smile,
  Save,
  Eye,
  Edit,
  Quote,
  Type,
  X,
  Plus
} from 'lucide-react';

// Mock emoji picker component since we can't import emoji-picker-react
const EmojiPicker = ({ onEmojiClick, show, onClose }) => {
  const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
    '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
    '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
    '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
    '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
    '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯',
    '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐',
    '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈',
    '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾',
    '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿',
    '😾', '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤏', '✌️', '🤞'
  ];

  if (!show) return null;

  return (
    <div className="absolute top-full left-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80 max-h-60 overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-700">Choose Emoji</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <X size={16} />
        </button>
      </div>
      <div className="grid grid-cols-8 gap-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => onEmojiClick({ emoji })}
            className="text-xl hover:bg-gray-100 p-2 rounded transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

// Tag input component
const TagInput = ({ tags, setTags, placeholder = "Add tags..." }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const addTag = (tag) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div 
      className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-lg min-h-[42px] cursor-text focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag, index) => (
        <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {tag}
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeTag(tag);
            }}
            className="hover:bg-blue-200 rounded-full p-0.5"
          >
            <X size={12} />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (inputValue.trim()) {
            addTag(inputValue);
          }
        }}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-1 min-w-0 border-none outline-none bg-transparent text-sm"
      />
    </div>
  );
};

// Rich Text Editor Component
const RichTextEditor = ({ content, onChange, editable = true, placeholder = "Start typing..." }) => {
  const editorRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const handleInput = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    handleInput();
  };

  const insertText = (text) => {
    if (editorRef.current) {
      editorRef.current.focus();
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const textNode = document.createTextNode(text);
        range.insertNode(textNode);
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);
        handleInput();
      }
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      const text = prompt('Enter link text:') || url;
      execCommand('insertHTML', `<a href="${url}" target="_blank">${text}</a>`);
    }
  };

 

  const onEmojiClick = (emojiData) => {
    insertText(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const toolbarButtons = [
    { icon: Bold, command: 'bold', title: 'Bold' },
    { icon: Italic, command: 'italic', title: 'Italic' },
    { icon: Strikethrough, command: 'strikeThrough', title: 'Strikethrough' },
    { icon: Underline, command: 'underline', title: 'Underline' },
    { icon: ListOrdered, command: 'insertOrderedList', title: 'Numbered List' },
    { icon: List, command: 'insertUnorderedList', title: 'Bullet List' },
    { icon: AlignLeft, command: 'justifyLeft', title: 'Align Left' },
    { icon: AlignCenter, command: 'justifyCenter', title: 'Align Center' },
    { icon: AlignRight, command: 'justifyRight', title: 'Align Right' },
    { icon: Quote, command: 'formatBlock', value: 'blockquote', title: 'Quote' },
  ];

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      {editable && (
        <div className="bg-gray-50 border-b p-2 flex flex-wrap items-center gap-1">
          {/* Text Formatting */}
          <div className="flex items-center gap-1 border-r pr-2 mr-2">
            {toolbarButtons.slice(0, 4).map((button, index) => (
              <button
                key={index}
                onClick={() => execCommand(button.command, button.value)}
                className="p-2 rounded hover:bg-gray-200 transition-colors"
                title={button.title}
              >
                <button.icon size={16} />
              </button>
            ))}
          </div>

          {/* Lists */}
          <div className="flex items-center gap-1 border-r pr-2 mr-2">
            {toolbarButtons.slice(4, 6).map((button, index) => (
              <button
                key={index}
                onClick={() => execCommand(button.command, button.value)}
                className="p-2 rounded hover:bg-gray-200 transition-colors"
                title={button.title}
              >
                <button.icon size={16} />
              </button>
            ))}
          </div>

          {/* Alignment */}
          <div className="flex items-center gap-1 border-r pr-2 mr-2">
            {toolbarButtons.slice(6, 9).map((button, index) => (
              <button
                key={index}
                onClick={() => execCommand(button.command, button.value)}
                className="p-2 rounded hover:bg-gray-200 transition-colors"
                title={button.title}
              >
                <button.icon size={16} />
              </button>
            ))}
          </div>

          {/* Quote */}
          <div className="flex items-center gap-1 border-r pr-2 mr-2">
            <button
              onClick={() => execCommand('formatBlock', 'blockquote')}
              className="p-2 rounded hover:bg-gray-200 transition-colors"
              title="Quote"
            >
              <Quote size={16} />
            </button>
          </div>

          {/* Media & Links */}
          <div className="flex items-center gap-1 border-r pr-2 mr-2">
            <button
              onClick={insertLink}
              className="p-2 rounded hover:bg-gray-200 transition-colors"
              title="Insert Link"
            >
              <Link size={16} />
            </button>
            
           
            
            <div className="relative">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 rounded hover:bg-gray-200 transition-colors"
                title="Insert Emoji"
              >
                <Smile size={16} />
              </button>
              <EmojiPicker
                show={showEmojiPicker}
                onEmojiClick={onEmojiClick}
                onClose={() => setShowEmojiPicker(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Editor Content */}
      <div
        ref={editorRef}
        contentEditable={editable}
        onInput={handleInput}
        className={`p-4 min-h-[300px] max-h-[500px] overflow-y-auto focus:outline-none ${
          editable ? 'bg-white' : 'bg-gray-50'
        }`}
        style={{
          lineHeight: '1.6',
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Placeholder */}
      {editable && !content && (
        <div className="absolute top-16 left-4 text-gray-400 pointer-events-none">
          {placeholder}
        </div>
      )}

      {/* Hidden file input */}
     

      <style jsx>{`
        [contenteditable] ul {
          list-style-type: disc;
          padding-left: 20px;
        }
        [contenteditable] ol {
          list-style-type: decimal;
          padding-left: 20px;
        }
        [contenteditable] li {
          margin: 4px 0;
        }
        [contenteditable] blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 16px;
          margin: 16px 0;
          font-style: italic;
          color: #6b7280;
        }
        [contenteditable] h1, [contenteditable] h2, [contenteditable] h3 {
          font-weight: bold;
          margin: 16px 0 8px 0;
        }
        [contenteditable] h1 { font-size: 2em; }
        [contenteditable] h2 { font-size: 1.5em; }
        [contenteditable] h3 { font-size: 1.2em; }
        [contenteditable] p {
          margin: 8px 0;
        }
        [contenteditable] a {
          color: #3b82f6;
          text-decoration: underline;
        }
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 8px 0;
        }
      `}</style>
    </div>
  );
};

// Main Question Form Component
const QuestionForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('<p></p>');
  const [tags, setTags] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const handleSubmit = async () => {
    
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    
    if (!description.trim() || description === '<p></p>') {
      alert('Please enter a description');
      return;
    }

    if (tags.length === 0) {
      alert('Please add at least one tag');
      return;
    }

    setIsSaving(true);
    setSaveStatus('');

    const questionData = {
      title: title.trim(),
      description: description,
      tags: tags,
      timestamp: new Date().toISOString(),

    };

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      });

      if (response.ok) {
        setSaveStatus('Question submitted successfully!');
        // Reset form
        setTitle('');
        setDescription('<p></p>');
        setTags([]);
        setIsPreview(false);
      } else {
        setSaveStatus('Failed to submit question');
      }
    } catch (error) {
      setSaveStatus('Error submitting question: ' + error.message);
      console.log('Question data that would be sent:', questionData);
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(''), 5000);
    }
  };

  const suggestedTags = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'JWT', 'API', 'Frontend', 'Backend', 'CSS', 'HTML', 'Vue.js', 'Angular', 'Python', 'Django', 'Flask', 'REST API', 'GraphQL'];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <h1 className="text-3xl font-bold">Ask a Question</h1>
          <p className="text-blue-100 mt-2">Share your question with the community</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a short and descriptive title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              maxLength={200}
            />
            <p className="text-sm text-gray-500 mt-1">{title.length}/200 characters</p>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  isPreview 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isPreview ? <Edit size={16} className="inline mr-1" /> : <Eye size={16} className="inline mr-1" />}
                {isPreview ? 'Edit' : 'Preview'}
              </button>
            </div>
            
            {isPreview ? (
              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[300px]">
                <h3 className="text-lg font-semibold mb-3">Preview</h3>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            ) : (
              <RichTextEditor
                content={description}
                onChange={setDescription}
                placeholder="Describe your question in detail. Include any relevant code, error messages, or context..."
              />
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags <span className="text-red-500">*</span>
            </label>
            <TagInput
              tags={tags}
              setTags={setTags}
              placeholder="Add tags (press Enter or comma to add)..."
            />
            <p className="text-sm text-gray-500 mt-1">Add up to 5 relevant tags</p>
            
            {/* Suggested Tags */}
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700 mb-2">Suggested tags:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.slice(0, 10).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      if (tags.length < 5 && !tags.includes(tag)) {
                        setTags([...tags, tag]);
                      }
                    }}
                    disabled={tags.includes(tag) || tags.length >= 5}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus size={12} className="inline mr-1" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-gray-500">
              All fields marked with <span className="text-red-500">*</span> are required
            </div>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Save size={18} />
              {isSaving ? 'Submitting...' : 'Submit Question'}
            </button>
          </div>

          {/* Save Status */}
          {saveStatus && (
            <div className={`p-3 rounded-lg ${
              saveStatus.includes('successfully') 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {saveStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;