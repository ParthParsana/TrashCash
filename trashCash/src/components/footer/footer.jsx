import React from 'react';
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#031913] text-[#E9EFEC] py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <img src={logo} alt="Trash Cash Logo" className="h-20 mb-4" />
          <p className="text-sm">Whatever you want to ask, our chat has the answers.</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:opacity-80"><i className="fab fa-twitter text-[#E9EFEC] text-lg"></i></a>
            <a href="#" className="hover:opacity-80"><i className="fab fa-facebook text-[#E9EFEC] text-lg"></i></a>
            <a href="#" className="hover:opacity-80"><i className="fab fa-linkedin text-[#E9EFEC] text-lg"></i></a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Weekly Demos</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Report a Bug</a></li>
            <li><a href="#" className="hover:underline">Request a New Feature</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">About</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Donate</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Help</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Information</a></li>
            <li><a href="#" className="hover:underline">Community</a></li>
            <li><a href="#" className="hover:underline">Creator Programme</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#747474] mt-6 pt-4 text-center text-sm">
        2024 Design Monks All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
