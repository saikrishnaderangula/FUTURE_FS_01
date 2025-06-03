import React, { useState, useEffect } from 'react';

const BlogAdmin = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [contacts, setContacts] = useState({});
  const [linkData, setLinkData] = useState({ contactId: '', blogPostId: '' });
  const [linkStatus, setLinkStatus] = useState('');

  // Fetch all blog posts on mount
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blog');
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };
    fetchBlogPosts();
  }, []);

  // Fetch contacts linked to a blog post
  const fetchContactsForBlogPost = async (blogPostId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blog/${blogPostId}/contacts`);
      const data = await response.json();
      setContacts((prev) => ({ ...prev, [blogPostId]: data }));
    } catch (error) {
      console.error(`Error fetching contacts for blog post ${blogPostId}:`, error);
    }
  };

  const handleLinkChange = (e) => {
    setLinkData({ ...linkData, [e.target.name]: e.target.value });
  };

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    setLinkStatus('');

    try {
      const response = await fetch('http://localhost:5000/api/blog/contact-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact_id: parseInt(linkData.contactId),
          blog_post_id: parseInt(linkData.blogPostId),
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setLinkStatus('Contact linked successfully!');
        // Refresh contacts for the blog post
        fetchContactsForBlogPost(linkData.blogPostId);
      } else {
        setLinkStatus(result.error || 'Failed to link contact.');
      }
    } catch (error) {
      setLinkStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Blog Admin Dashboard</h2>

      {/* Blog Posts List */}
      <div className="space-y-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
            <p className="text-gray-600 mt-2">{post.content}</p>
            <p className="text-gray-500 text-sm mt-2">
              Posted on: {new Date(post.created_at).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}
            </p>

            {/* Fetch and Display Linked Contacts */}
            <button
              onClick={() => fetchContactsForBlogPost(post.id)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              Show Linked Contacts
            </button>

            {contacts[post.id] && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-700">Linked Contacts:</h4>
                {contacts[post.id].length === 0 ? (
                  <p className="text-gray-500">No contacts linked to this post.</p>
                ) : (
                  <ul className="mt-2 space-y-2">
                    {contacts[post.id].map((contact) => (
                      <li key={contact.id} className="p-4 bg-gray-100 rounded-lg">
                        <p><strong>Name:</strong> {contact.name}</p>
                        <p><strong>Email:</strong> {contact.email}</p>
                        <p><strong>Message:</strong> {contact.message}</p>
                        <p><strong>Submitted:</strong> {new Date(contact.created_at).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Link Contact to Blog Post */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Link Contact to Blog Post</h3>
        <form onSubmit={handleLinkSubmit} className="space-y-4">
          <div>
            <label htmlFor="contactId" className="block text-gray-700">Contact ID:</label>
            <input
              type="number"
              id="contactId"
              name="contactId"
              value={linkData.contactId}
              onChange={handleLinkChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="blogPostId" className="block text-gray-700">Blog Post ID:</label>
            <input
              type="number"
              id="blogPostId"
              name="blogPostId"
              value={linkData.blogPostId}
              onChange={handleLinkChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            Link Contact
          </button>
        </form>
        {linkStatus && (
          <p className={`mt-4 text-center ${linkStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
            {linkStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogAdmin;