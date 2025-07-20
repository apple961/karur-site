import React from 'react';

const Footer = ({ colors }) => {
  return (
    <footer className="py-12 px-4 md:px-8 lg:px-16" style={{ backgroundColor: colors.darkBackground, color: colors.white }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Museum Info Column */}
        <div>
          <h3 className="text-xl font-semibold mb-4">FRANS HALS MUSEUM</h3>
          <p className="text-gray-400 text-sm">Groot Heiligland 62, Haarlem</p>
          <p className="text-gray-400 text-sm mt-2">Open Tuesday – Sunday</p>
          <p className="text-gray-400 text-sm">11 AM – 5 PM</p>
          <p className="text-gray-400 text-sm mt-4">HAL</p>
          <p className="text-gray-400 text-sm">Grote Markt 16, Haarlem</p>
          <p className="text-gray-400 text-sm">Temporary modern and contemporary</p>
          <p className="text-gray-400 text-sm">art exhibition</p>
        </div>

        {/* Support Us / Quick Links Column */}
        <div>
          <h3 className="text-xl font-semibold mb-4">SUPPORT US</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">NEWS</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">PRESS</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">WORK AT</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">CONTACT</a></li>
          </ul>
        </div>

        {/* Stay Informed Column */}
        <div>
          <h3 className="text-xl font-semibold mb-4">STAY INFORMED</h3>
          <div className="rounded-lg p-6" style={{ backgroundColor: colors.buttonDark, border: `1px solid ${colors.textGray}` }}>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter</p>
            <input type="email" placeholder="example@email.com" className="w-full px-4 py-3 rounded-md mb-4 text-gray-800 focus:outline-none" />
            <button className="w-full px-6 py-3 rounded-md font-bold transition duration-300"
              style={{ backgroundColor: colors.buttonBeige, color: colors.darkBackground }}>
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t" style={{ borderColor: colors.textGray }}>
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-white">Terms and conditions</a>
            <a href="#" className="hover:text-white">Privacy Statement</a>
            <a href="#" className="hover:text-white">Credits</a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-white font-bold">VRIENDEN</span>
            <img src="https://placehold.co/80x30/1A202C/FFFFFF?text=LOTERIJ" alt="Loterij Logo" className="h-8" />
            <span className="text-white font-bold">HAARLEM</span>
            <div className="flex space-x-4 ml-4">
              {/* Social Media Icons (placeholders) */}
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.262c-1.225 0-1.628.761-1.628 1.547V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.251-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.07 4.85-.07zm0 2.163c-3.203 0-3.584.012-4.85.07-2.731.125-3.654 1.006-3.78 3.78-.058 1.265-.07 1.644-.07 4.85s.012 3.584.07 4.85c.126 2.773 1.049 3.655 3.78 3.78 1.265.057 1.645.07 4.85.07s3.584-.012 4.85-.07c2.73-.127 3.655-1.05 3.78-3.78.058-1.265.07-1.644.07-4.85s-.012-3.584-.07-4.85c-.125-2.73-1.049-3.655-3.78-3.78-1.265-.057-1.645-.07-4.85-.07zm0 3.627c-2.062 0-3.73 1.668-3.73 3.73s1.668 3.73 3.73 3.73 3.73-1.668 3.73-3.73-1.668-3.73-3.73-3.73zm0 2.163c.857 0 1.567.709 1.567 1.567s-.709 1.567-1.567 1.567-1.567-.709-1.567-1.567.709-1.567 1.567-1.567zm4.326-5.32c-.963 0-1.744.781-1.744 1.744s.781 1.744 1.744 1.744 1.744-.781 1.744-1.744-.781-1.744-1.744-1.744z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.079 1.443-4.699 2.312-7.52 2.312-.489 0-.972-.029-1.449-.086 2.985 1.943 6.507 3.066 10.279 3.066 12.367 0 18.137-10.29 18.137-19.176 0-.27-.01-.539-.026-.807.995-.719 1.857-1.607 2.536-2.618z"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
