import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import ProjectCard from './components/ProjectCard';
import Resume from './components/Resume';
import ContactForm from './components/ContactForm';
import BlogForm from './components/BlogForm';
import BlogAdmin from './components/BlogAdmin';

function App() {
  const [currentSection, setCurrentSection] = useState('cover');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState('');
  const [adminFormData, setAdminFormData] = useState({ username: '', password: '' });

  const projects = [
    { 
      title: 'Project 1', 
      description: 'A brief description of project 1.', 
      link: 'https://example.com', 
      image: '/project1.jpg',
      category: 'Web Development',
      technologies: ['React', 'Tailwind CSS']
    },
    { 
      title: 'Project 2', 
      description: 'A brief description of project 2.', 
      link: 'https://example.com', 
      image: '/project2.jpg',
      category: 'Mobile App',
      technologies: ['Flutter', 'Firebase']
    },
  ];

  const navItems = [
    { id: 'about', label: 'About Me' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
    { id: 'add-blog', label: 'Add Blog Post' },
    { id: 'blog-admin', label: 'Blog Admin' },
  ];

  const handleNavClick = (sectionId) => {
    setCurrentSection(sectionId);
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Admin credentials (hardcoded for simplicity; in production, validate via backend)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'password123',
  };

  const handleAdminLoginChange = (e) => {
    setAdminFormData({ ...adminFormData, [e.target.name]: e.target.value });
    setAdminLoginError(''); // Clear error on input change
  };

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    const { username, password } = adminFormData;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAdminAuthenticated(true);
      setAdminLoginError('');
      setAdminFormData({ username: '', password: '' }); // Clear form
    } else {
      setAdminLoginError('Invalid username or password.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setAdminLoginError('');
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Helmet>
        <title>PortFolio</title>
        <meta name="description" content="Personal portfolio of Your Name, showcasing skills, projects, and achievements as a Your Profession." />
        <meta name="keywords" content="portfolio, Your Name, Your Profession, projects, skills, resume, contact, blog" />
        <meta name="author" content="Your Name" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Your Name | Personal Portfolio" />
        <meta property="og:description" content="Explore the portfolio of Your Name, a Your Profession showcasing skills, projects, achievements, and blog posts." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:image" content="https://yourwebsite.com/og-image.jpg" />
      </Helmet>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">FutureInterns</h1>
            </div>
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    currentSection === item.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600 hover:scale-105'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {currentSection !== 'cover' && (
                <button
                  onClick={() => handleNavClick('cover')}
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:scale-105 transition-all duration-300"
                >
                  Home
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {/* Cover Page */}
        {currentSection === 'cover' && (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
                Welcome to My Portfolio
              </h1>
              <p className="text-xl md:text-2xl mb-8 animate-fade-in-delayed">
                Hi, I'm Sai Krishna
              </p>
              <div className="flex justify-center">
                <div
                  className="group w-40 h-12 bg-white text-blue-600 font-semibold rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:w-64 hover:h-48 cursor-pointer flex items-start justify-center"
                  onClick={() => handleNavClick('about')}
                >
                  <div className="flex flex-col items-center w-full h-full">
                    <span className="text-lg mt-3 group-hover:text-white group-hover:mb-4 transition-all duration-300">
                      About Me
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full px-6">
                      <p className="text-sm text-purple-600">
                        I'm Your Name, a passionate Your Profession with experience in Your Skills/Field. I specialize in creating innovative solutions and have a strong background in Your Background.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About Section */}
        {currentSection === 'about' && (
          <section id="about" className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center animate-fade-in">
                About Me
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed animate-fade-in-delayed">
                Write about your background, skills, and achievements here.
              </p>
            </div>
          </section>
        )}

        {/* Portfolio Section */}
        {currentSection === 'portfolio' && (
          <section id="portfolio" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center animate-fade-in">
                My Projects
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={index}
                    title={project.title}
                    description={project.description}
                    link={project.link}
                    image={project.image}
                    category={project.category}
                    technologies={project.technologies}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Resume Section */}
        {currentSection === 'resume' && (
          <section id="resume" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center animate-fade-in">
                Resume
              </h2>
              <Resume />
            </div>
          </section>
        )}

        {/* Contact Section */}
        {currentSection === 'contact' && (
          <section id="contact" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center animate-fade-in">
                Contact Me
              </h2>
              <ContactForm />
            </div>
          </section>
        )}

        {/* Add Blog Post Section */}
        {currentSection === 'add-blog' && (
          <section id="add-blog" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center animate-fade-in">
                Add a New Blog Post
              </h2>
              <BlogForm />
            </div>
          </section>
        )}

        {/* Blog Admin Section with Authentication */}
        {currentSection === 'blog-admin' && (
          <section id="blog-admin" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {!isAdminAuthenticated ? (
                <div className="max-w-md mx-auto bg-gray-50 p-8 rounded-lg shadow-lg">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Admin Login
                  </h2>
                  <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={adminFormData.username}
                        onChange={handleAdminLoginChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter username"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={adminFormData.password}
                        onChange={handleAdminLoginChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter password"
                        required
                      />
                    </div>
                    {adminLoginError && (
                      <p className="text-red-600 text-center">{adminLoginError}</p>
                    )}
                    <button
                      type="submit"
                      className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                    >
                      Login
                    </button>
                  </form>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-4xl font-bold text-gray-800 text-center animate-fade-in">
                      Blog Admin Dashboard
                    </h2>
                    <button
                      onClick={handleAdminLogout}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                    >
                      Logout
                    </button>
                  </div>
                  <BlogAdmin />
                </div>
              )}
            </div>
          </section>
        )}
      </main>

    
    </div>
  );
}

export default App;