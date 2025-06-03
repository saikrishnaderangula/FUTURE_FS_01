import React, { useState } from 'react';

const BlogForm = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');
    setShowSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus('Blog post added successfully!');
        setShowSuccess(true);
        setFormData({ title: '', content: '' });
      } else {
        setStatus(result.error || 'Failed to add blog post.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto p-8 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-xl overflow-visible">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add a New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div className="relative">
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer transition-all duration-300"
            placeholder=" "
          />
          <label
            htmlFor="title"
            className="absolute left-4 top-4 text-gray-500 transition-all duration-300 transform peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-1 peer-valid:-top-3 peer-valid:text-sm peer-valid:text-blue-600 peer-valid:bg-white peer-valid:px-1"
          >
            Title
          </label>
        </div>

        {/* Content Field */}
        <div className="relative">
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer transition-all duration-300 min-h-[150px]"
            placeholder=" "
          />
          <label
            htmlFor="content"
            className="absolute left-4 top-4 text-gray-500 transition-all duration-300 transform peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-1 peer-valid:-top-3 peer-valid:text-sm peer-valid:text-blue-600 peer-valid:bg-white peer-valid:px-1"
          >
            Content
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`relative w-full p-4 text-white rounded-lg transition-all duration-300 flex items-center justify-center ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg'
          }`}
        >
          {isSubmitting ? (
            <svg
              className="animate-spin h-5 w-5 text-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
              />
            </svg>
          ) : null}
          {isSubmitting ? 'Adding...' : 'Add Blog Post'}
        </button>
      </form>

      {/* Status Message with Success Animation */}
      {status && (
        <div className="mt-6 flex items-center justify-center space-x-2 animate-fade-in">
          {showSuccess && (
            <svg
              className="w-6 h-6 text-green-600 animate-checkmark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          <p
            className={`text-center ${
              status.includes('successfully') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status}
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogForm;