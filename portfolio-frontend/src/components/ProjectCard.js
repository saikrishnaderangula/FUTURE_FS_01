import React, { useState } from 'react';

const ProjectCard = ({ title, description, link, image, category, technologies }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Project Card */}
      <div
        className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <p className="text-white text-lg font-semibold">View Details</p>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">{category}</p>
          <p className="text-gray-600 text-sm">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Project Details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 relative transform transition-all duration-300 scale-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
            <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="text-gray-600 mb-2"><strong>Category:</strong> {category}</p>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="mb-4">
              <p className="text-gray-600 font-semibold mb-2">Technologies:</p>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Visit Project
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;