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
  Plus,
  Tags
} from 'lucide-react';
import { tags } from '../tags';

// Mock emoji picker component
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
    <div className="absolute top-full left-0 z-50 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl p-4 w-80 max-h-60 overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-200">Choose Emoji</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-800 text-gray-400 hover:text-gray-200 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      <div className="grid grid-cols-8 gap-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => onEmojiClick({ emoji })}
            className="text-xl hover:bg-gray-800 p-2 rounded transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

// Tag input component
const TagInput = ({ selectedTags, setSelectedTags, placeholder = "Add tags..." }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredTags, setFilteredTags] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = tags.filter(tag => 
        tag.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedTags.some(selected => selected.id === tag.id)
      );
      setFilteredTags(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [inputValue, selectedTags]);

  const addTag = (tag) => {
    if (!selectedTags.some(selected => selected.id === tag.id) && selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
      setInputValue('');
      setShowDropdown(false);
    }
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagToRemove.id));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filteredTags.length > 0) {
      e.preventDefault();
      addTag(filteredTags[0]);
    } else if (e.key === 'Backspace' && inputValue === '' && selectedTags.length > 0) {
      removeTag(selectedTags[selectedTags.length - 1]);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  return (
    <div className="relative">
      <div 
        className="flex flex-wrap gap-2 p-3 border border-gray-600 bg-gray-800 rounded-lg min-h-[42px] cursor-text focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all"
        onClick={() => inputRef.current?.focus()}
      >
        {selectedTags.map((tag) => (
          <span key={tag.id} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-900 text-blue-200 rounded-full text-sm border border-blue-700">
            {tag.name}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
              className="hover:bg-blue-800 rounded-full p-0.5 text-blue-300 hover:text-blue-100"
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
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          placeholder={selectedTags.length === 0 ? placeholder : ''}
          className="flex-1 min-w-0 border-none outline-none bg-transparent text-sm text-gray-200 placeholder-gray-500"
        />
      </div>
      
      {/* Dropdown */}
      {showDropdown && filteredTags.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-10 bg-gray-800 border border-gray-600 rounded-lg shadow-xl mt-1 max-h-60 overflow-y-auto">
          {filteredTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => addTag(tag)}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 text-gray-200 transition-colors"
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Rich Text Editor Component
const RichTextEditor = ({ content, onChange, editable = true, placeholder = "Start typing..." }) => {
  const editorRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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
    <div className="border border-gray-600 rounded-lg overflow-hidden bg-gray-800">
      {/* Toolbar */}
      {editable && (
        <div className="bg-gray-900 border-b border-gray-700 p-2 flex flex-wrap items-center gap-1">
          {/* Text Formatting */}
          <div className="flex items-center gap-1 border-r border-gray-600 pr-2 mr-2">
            {toolbarButtons.slice(0, 4).map((button, index) => (
              <button
                key={index}
                onClick={() => execCommand(button.command, button.value)}
                className="p-2 rounded text-gray-400 hover:bg-gray-700 hover:text-gray-200 transition-colors"
                title={button.title}
              >
                <button.icon size={16} />
              </button>
            ))}
          </div>

          {/* Lists */}
          <div className="flex items-center gap-1 border-r border-gray-600 pr-2 mr-2">
            {toolbarButtons.slice(4, 6).map((button, index) => (
              <button
                key={index}
                onClick={() => execCommand(button.command, button.value)}
                className="p-2 rounded text-gray-400 hover:bg-gray-700 hover:text-gray-200 transition-colors"
                title={button.title}
              >
                <button.icon size={16} />
              </button>
            ))}
          </div>

          {/* Alignment */}
          <div className="flex items-center gap-1 border-r border-gray-600 pr-2 mr-2">
            {toolbarButtons.slice(6, 9).map((button, index) => (
              <button
                key={index}
                onClick={() => execCommand(button.command, button.value)}
                className="p-2 rounded text-gray-400 hover:bg-gray-700 hover:text-gray-200 transition-colors"
                title={button.title}
              >
                <button.icon size={16} />
              </button>
            ))}
          </div>

          {/* Quote */}
          <div className="flex items-center gap-1 border-r border-gray-600 pr-2 mr-2">
            <button
              onClick={() => execCommand('formatBlock', 'blockquote')}
              className="p-2 rounded text-gray-400 hover:bg-gray-700 hover:text-gray-200 transition-colors"
              title="Quote"
            >
              <Quote size={16} />
            </button>
          </div>

          {/* Media & Links */}
          <div className="flex items-center gap-1">
            <button
              onClick={insertLink}
              className="p-2 rounded text-gray-400 hover:bg-gray-700 hover:text-gray-200 transition-colors"
              title="Insert Link"
            >
              <Link size={16} />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 rounded text-gray-400 hover:bg-gray-700 hover:text-gray-200 transition-colors"
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
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable={editable}
          onInput={handleInput}
          className={`p-4 min-h-[300px] max-h-[500px] overflow-y-auto focus:outline-none text-gray-200 ${
            editable ? 'bg-gray-800' : 'bg-gray-900'
          }`}
          style={{
            lineHeight: '1.6',
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Placeholder */}
        {editable && (!content || content === '<p></p>') && (
          <div className="absolute top-4 left-4 text-gray-500 pointer-events-none">
            {placeholder}
          </div>
        )}
      </div>

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
          border-left: 4px solid #4b5563;
          padding-left: 16px;
          margin: 16px 0;
          font-style: italic;
          color: #9ca3af;
        }
        [contenteditable] h1, [contenteditable] h2, [contenteditable] h3 {
          font-weight: bold;
          margin: 16px 0 8px 0;
          color: #f3f4f6;
        }
        [contenteditable] h1 { font-size: 2em; }
        [contenteditable] h2 { font-size: 1.5em; }
        [contenteditable] h3 { font-size: 1.2em; }
        [contenteditable] p {
          margin: 8px 0;
        }
        [contenteditable] a {
          color: #60a5fa;
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
  const [selectedTags, setSelectedTags] = useState([]);
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

    if (selectedTags.length === 0) {
      alert('Please add at least one tag');
      return;
    }

    setIsSaving(true);
    setSaveStatus('');

    const questionData = {
      title: title.trim(),
      description: description,
      tagIds: selectedTags.map(tag => tag.id), // Send only the IDs to backend
    };
    console.log(questionData);

    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in to submit a question.');
      setIsSaving(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(questionData),
      });

      if (response.ok) {
        setSaveStatus('Question submitted successfully!');
        // Reset form
        setTitle('');
        setDescription('<p></p>');
        setSelectedTags([]);
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

  // Get first 10 tags for suggestions
  const suggestedTags = tags.slice(0, 10);

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-800">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 text-white p-6">
            <h1 className="text-3xl font-bold">Ask a Question</h1>
            <p className="text-blue-100 mt-2">Share your question with the community</p>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a short and descriptive title..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-200 placeholder-gray-500"
                maxLength={200}
              />
              <p className="text-sm text-gray-400 mt-1">{title.length}/200 characters</p>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Description <span className="text-red-400">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsPreview(!isPreview)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    isPreview 
                      ? 'bg-green-900 text-green-200 hover:bg-green-800 border border-green-700' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
                  }`}
                >
                  {isPreview ? <Edit size={16} className="inline mr-1" /> : <Eye size={16} className="inline mr-1" />}
                  {isPreview ? 'Edit' : 'Preview'}
                </button>
              </div>
              
              {isPreview ? (
                <div className="border border-gray-600 rounded-lg p-4 bg-gray-800 min-h-[300px]">
                  <h3 className="text-lg font-semibold mb-3 text-gray-200">Preview</h3>
                  <div 
                    className="prose prose-invert max-w-none text-gray-300"
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
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags <span className="text-red-400">*</span>
              </label>
              <TagInput
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                placeholder="Search and add tags..."
              />
              <p className="text-sm text-gray-400 mt-1">Add up to 5 relevant tags</p>
              
              {/* Suggested Tags */}
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-300 mb-2">Suggested tags:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => {
                        if (selectedTags.length < 5 && !selectedTags.some(selected => selected.id === tag.id)) {
                          setSelectedTags([...selectedTags, tag]);
                        }
                      }}
                      disabled={selectedTags.some(selected => selected.id === tag.id) || selectedTags.length >= 5}
                      className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-600"
                    >
                      <Plus size={12} className="inline mr-1" />
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div className="text-sm text-gray-400">
                All fields marked with <span className="text-red-400">*</span> are required
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSaving}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Save size={18} />
                {isSaving ? 'Submitting...' : 'Submit Question'}
              </button>
            </div>

            {/* Save Status */}
            {saveStatus && (
              <div className={`p-3 rounded-lg border ${
                saveStatus.includes('successfully') 
                  ? 'bg-green-900 text-green-200 border-green-700' 
                  : 'bg-red-900 text-red-200 border-red-700'
              }`}>
                {saveStatus}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;