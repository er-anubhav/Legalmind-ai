import React from 'react';

function Footer() {
  return (
    <footer className="mt-12 bg-slate-800 text-white py-4">
    <div className="container font-serif mx-auto px-6">
      <p className="text-center text-sm">
          LegalMind AI &copy;{new Date().getFullYear()}, All rights reserved.
      </p>
    </div>
  </footer>
  );
}

export default Footer;