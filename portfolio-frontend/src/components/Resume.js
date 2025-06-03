import React from 'react';
import { jsPDF } from 'jspdf';

const Resume = () => {
  const handleDownload = () => {
    // Initialize jsPDF
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    // Set font and styling
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);

    // Add Header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Sai Krishna Derangula', 40, 40);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(
      'Email: worldofwords81@gmail.com | Phone: +your-actual-phone-number | LinkedIn: derangula-saikrishna-b16175308 | GitHub: saikrishnaderangula',
      40,
      60
    );

    // Add a horizontal line
    doc.setLineWidth(1);
    doc.line(40, 70, 550, 70);

    // Professional Summary
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Professional Summary', 40, 90);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const summaryText = 'Computer Science student skilled in Python, Java, C, and JavaScript. Experienced in building full-stack applications with a focus on creativity and innovation. Passionate about developing platforms that enhance user engagement and learning through technology.';
    const summaryLines = doc.splitTextToSize(summaryText, 510); // Wrap text to fit page width
    doc.text(summaryLines, 40, 110);

    // Education
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Education', 40, 150);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('B.Tech, Computer Science and Engineering', 40, 170);
    doc.text('Mahatma Gandhi Institute of Technology (MGIT) | 2023–2027 | CGPA: Not specified', 40, 190);

    // Technical Skills
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Technical Skills', 40, 220);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('• Languages: Python, Java, C, JavaScript', 40, 240);
    doc.text('• Frameworks: React (based on portfolio usage)', 40, 260);
    doc.text('• Frontend: HTML, CSS (inferred from portfolio)', 40, 280);
    doc.text('• Databases: MySQL', 40, 300);
    doc.text('• Tools: VS Code, Git', 40, 320);

    // Projects
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Projects', 40, 350);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const projectText = 'Creative Writing Platform: Developed a platform for authors and users to write blogs, stories, gossips, and novels, featuring an AI plagiarism checker to ensure content originality. (React, JavaScript, MySQL)';
    const projectLines = doc.splitTextToSize(projectText, 510);
    doc.text(projectLines, 40, 370);

    // Soft Skills
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Soft Skills', 40, 410);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Communication | Problem Solving | Teamwork | Time Management', 40, 430);

    // Other
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Other', 40, 460);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('• Languages: English, Telugu', 40, 480);
    doc.text('• Activities: Participant in coding projects and hackathons (inferred from your project involvement)', 40, 500);
    doc.text('• Interests: Open Source Contributions, Web Development', 40, 520);

    // Download the PDF
    doc.save('Sai_Krishna_Derangula_Resume.pdf');
  };

  return (
    <div className="space-y-8">
      {/* Header with Name and Contact Info */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">Sai Krishna Derangula</h3>
        <p className="text-gray-600">
          Email: <a href="mailto:worldofwords81@gmail.com" className="text-blue-600 hover:underline">worldofwords81@gmail.com</a> | 
          Phone: <a href="tel:+your-actual-phone-number" className="text-blue-600 hover:underline">+your-actual-phone-number</a> | 
          LinkedIn: <a href="https://www.linkedin.com/in/derangula-saikrishna-b16175308" className="text-blue-600 hover:underline">derangula-saikrishna-b16175308</a> | 
          GitHub: <a href="https://github.com/saikrishnaderangula" className="text-blue-600 hover:underline">saikrishnaderangula</a>
        </p>
      </div>

      {/* Professional Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Professional Summary</h3>
        <p className="text-gray-600">
          Computer Science student skilled in Python, Java, C, and JavaScript. Experienced in building full-stack applications with a focus on creativity and innovation. Passionate about developing platforms that enhance user engagement and learning through technology.
        </p>
      </div>

      {/* Education */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Education</h3>
        <p className="text-gray-600">
          <strong>B.Tech, Computer Science and Engineering</strong><br />
          Mahatma Gandhi Institute of Technology (MGIT) | 2023–2027 | CGPA: Not specified
        </p>
      </div>

      {/* Technical Skills */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Technical Skills</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li><strong>Languages:</strong> Python, Java, C, JavaScript</li>
          <li><strong>Frameworks:</strong> React (based on portfolio usage)</li>
          <li><strong>Frontend:</strong> HTML, CSS (inferred from portfolio)</li>
          <li><strong>Databases:</strong> MySQL</li>
          <li><strong>Tools:</strong> VS Code, Git</li>
        </ul>
      </div>

      {/* Projects */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Projects</h3>
        <p className="text-gray-600">
          <strong>Creative Writing Platform:</strong> Developed a platform for authors and users to write blogs, stories, gossips, and novels, featuring an AI plagiarism checker to ensure content originality. (React, JavaScript, MySQL)
        </p>
      </div>

      {/* Soft Skills */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Soft Skills</h3>
        <p className="text-gray-600">
          Communication | Problem Solving | Teamwork | Time Management
        </p>
      </div>

      {/* Other */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Other</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li><strong>Languages:</strong> English, Telugu</li>
          <li><strong>Activities:</strong> Participant in coding projects and hackathons (inferred from your project involvement)</li>
          <li><strong>Interests:</strong> Open Source Contributions, Web Development</li>
        </ul>
      </div>

      {/* Download PDF Resume */}
      <div className="text-center">
        <button
          onClick={handleDownload}
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Download PDF Resume
        </button>
      </div>
    </div>
  );
};

export default Resume;