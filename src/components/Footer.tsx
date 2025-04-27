import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-6 mt-10">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Recipe App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
