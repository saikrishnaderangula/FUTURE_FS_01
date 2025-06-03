import React, { useState} from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus('Message sent successfully!');
        setShowSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(result.error || 'Failed to send message.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`${text} copied to clipboard!`);
  };

  return (
    <div className="relative max-w-2xl mx-auto p-8 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-xl overflow-visible">
      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer transition-all duration-300"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="absolute left-4 top-4 text-gray-500 transition-all duration-300 transform peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-1 peer-valid:-top-3 peer-valid:text-sm peer-valid:text-blue-600 peer-valid:bg-white peer-valid:px-1"
          >
            Name
          </label>
        </div>

        {/* Email Field */}
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer transition-all duration-300"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-4 text-gray-500 transition-all duration-300 transform peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-1 peer-valid:-top-3 peer-valid:text-sm peer-valid:text-blue-600 peer-valid:bg-white peer-valid:px-1"
          >
            Email
          </label>
        </div>

        {/* Message Field */}
        <div className="relative">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer transition-all duration-300 min-h-[150px]"
            placeholder=" "
          />
          <label
            htmlFor="message"
            className="absolute left-4 top-4 text-gray-500 transition-all duration-300 transform peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-1 peer-valid:-top-3 peer-valid:text-sm peer-valid:text-blue-600 peer-valid:bg-white peer-valid:px-1"
          >
            Message
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
          {isSubmitting ? 'Sending...' : 'Send Message'}
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

     

      {/* Contact Info Positioned at Bottom-Right of the Page */}
      <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-2 text-sm text-gray-700 z-50 animate-bounce-on-load">
        <div className="group relative flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm hover:bg-white hover:shadow-md transition-all duration-300 animate-pulse-slow">
          <svg
            className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span
            onClick={() => copyToClipboard('worldofwords81@gmail.com')}
            className="cursor-pointer group-hover:text-blue-600 transition-colors duration-300"
          >
            worldofwords81@gmail.com
          </span>
          <span className="absolute right-0 bottom-8 hidden group-hover:block text-xs text-white bg-gray-800 rounded-md px-2 py-1 shadow-lg">
            Copy Email
          </span>
        </div>
        <div className="group relative flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm hover:bg-white hover:shadow-md transition-all duration-300 animate-pulse-slow">
          <svg
            className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <a
            href="tel:+1234567890"
            className="group-hover:text-blue-600 transition-colors duration-300"
          >
            +1 (234) 567-890
          </a>
          <span className="absolute right-0 bottom-8 hidden group-hover:block text-xs text-white bg-gray-800 rounded-md px-2 py-1 shadow-lg">
            Call
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;