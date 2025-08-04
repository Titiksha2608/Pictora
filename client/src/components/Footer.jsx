import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            {/* Enhanced divider line above footer */}
            <div className="w-full h-0.5 bg-gray-300 opacity-20"></div>
            <footer className="w-full bg-gradient-to-b from-gray-50 to-white px-6 py-8 sm:py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Brand Section */}
                        <div className="lg:col-span-4">
                            <div className="flex items-center gap-2 mb-0">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                                    <img src={assets.logo_icon} alt="" className="w-6 h-6" />
                                </div>
                                <span className="text-gray-900 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pictora</span>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-md">
                                Turn your imagination into visual art in seconds with our AI-powered platform. Create stunning images with just a text prompt.
                            </p>
                            <div className="flex items-center gap-4">
                                <a href="https://github.com/Titiksha2608" className="group bg-white w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                                    <img src={assets.github_icon} alt="github" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </a>
                                <a href="https://www.linkedin.com/in/titiksha-mukhopadhyay-7a714b261/" className="group bg-white w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                                    <img src={assets.linkedin_icon} alt="linkedin" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="lg:col-span-2">
                            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Quick Links</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link to="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group">
                                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/gallery" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group">
                                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        Gallery
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/features" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group">
                                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/buy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group">
                                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        Pricing
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div className="lg:col-span-2">
                            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Support</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group">
                                        <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group">
                                        <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group">
                                        <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group">
                                        <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        Terms
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div className="lg:col-span-4">
                            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Stay Updated</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Subscribe for the latest updates and features. Get notified about new AI capabilities.
                            </p>
                            <form className="space-y-3">
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                                >
                                    Subscribe Now
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Enhanced Bottom Bar */}
                    <div className="mt-12 pt-8 text-center border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            © {currentYear} <span className="font-semibold text-gray-700">Imagify</span>. All rights reserved. 
                            <span className="mx-2">•</span>
                            <span className="text-blue-600">Powered by AI</span>
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
