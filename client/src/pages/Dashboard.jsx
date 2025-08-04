import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user, token, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [isNameHovered, setIsNameHovered] = useState(false);
  const [stats, setStats] = useState({
    credits: 0,
    imagesGenerated: 0,
    favoriteStyles: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) {
        setError('Authentication required. Please login.');
        setIsLoading(false);
        navigate('/');
        return;
      }

      try {
        console.log('Fetching dashboard data with token:', token ? 'Yes' : 'No');
        
        const [creditsResponse, generationsResponse] = await Promise.all([
          axios.get(`${backendUrl}/api/user/credits`, {
            headers: { 
              token,
              'Content-Type': 'application/json'
            }
          }),
          axios.get(`${backendUrl}/api/image/user-generations`, {
            headers: { 
              token,
              'Content-Type': 'application/json'
            }
          })
        ]);

        console.log('Credits response:', creditsResponse.data);
        console.log('Generations response:', generationsResponse.data);

        if (creditsResponse.data.success && generationsResponse.data.success) {
          setStats({
            credits: creditsResponse.data.credits || 0,
            imagesGenerated: generationsResponse.data.totalGenerations || 0,
            favoriteStyles: generationsResponse.data.uniqueStyles || 0
          });
          setError(null);
        } else {
          const errorMessage = creditsResponse.data.message || generationsResponse.data.message || 'Failed to fetch dashboard data';
          console.error('Dashboard data error:', errorMessage);
          setError(errorMessage);
          if (errorMessage.includes('Authentication') || errorMessage.includes('login')) {
            navigate('/');
          }
          toast.error(errorMessage);
        }
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
        const errorMessage = error.response?.data?.message || 'Failed to load dashboard data';
        setError(errorMessage);
        if (error.response?.status === 401 || errorMessage.includes('Authentication') || errorMessage.includes('login')) {
          navigate('/');
        }
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [token, backendUrl, navigate]);

  const handleGenerateClick = () => {
    navigate('/result');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome & Stats */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              Welcome back, <span className="text-blue-600">{user?.name}</span>
              <motion.span
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="ml-1"
              >👋</motion.span>
            </h1>
            <p className="text-lg text-gray-500">Your creative journey continues...</p>
          </div>
          <motion.div 
            className="flex gap-6 w-full md:w-auto justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Stat Card */}
            <motion.div 
              className="bg-white border border-gray-100 rounded-xl shadow-md px-6 py-4 flex flex-col items-center min-w-[120px]"
              whileHover={{ scale: 1.04, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
            >
              <div className="text-blue-500 text-2xl mb-1">💎</div>
              <div className="text-2xl font-bold text-gray-900">{stats.credits}</div>
              <div className="text-xs text-gray-500 mt-1">Credits</div>
            </motion.div>
            <motion.div 
              className="bg-white border border-gray-100 rounded-xl shadow-md px-6 py-4 flex flex-col items-center min-w-[120px]"
              whileHover={{ scale: 1.04, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
            >
              <div className="text-blue-500 text-2xl mb-1">🖼️</div>
              <div className="text-2xl font-bold text-gray-900">{stats.imagesGenerated}</div>
              <div className="text-xs text-gray-500 mt-1">Images</div>
            </motion.div>
            <motion.div 
              className="bg-white border border-gray-100 rounded-xl shadow-md px-6 py-4 flex flex-col items-center min-w-[120px]"
              whileHover={{ scale: 1.04, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
            >
              <div className="text-blue-500 text-2xl mb-1">🎨</div>
              <div className="text-2xl font-bold text-gray-900">{stats.favoriteStyles}</div>
              <div className="text-xs text-gray-500 mt-1">Styles</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } }
          }}
        >
          <motion.button 
            onClick={handleGenerateClick}
            className="bg-blue-600 text-white rounded-xl p-6 shadow hover:shadow-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
            whileHover={{ scale: 1.07 }}
          >
            <div className="text-2xl mb-2">✨</div>
            <h3 className="font-semibold">New Creation</h3>
            <p className="text-sm text-blue-100 mt-1">Start generating</p>
          </motion.button>
          <motion.div whileHover={{ scale: 1.07 }}>
            <Link 
              to="/gallery" 
              className="bg-white border border-gray-100 text-gray-900 rounded-xl p-6 shadow hover:shadow-lg transition-all block"
            >
              <div className="text-2xl mb-2">🖼️</div>
              <h3 className="font-semibold">Gallery</h3>
              <p className="text-sm text-gray-400 mt-1">View your work</p>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.07 }}>
            <Link 
              to="/buy" 
              className="bg-white border border-gray-100 text-gray-900 rounded-xl p-6 shadow hover:shadow-lg transition-all block"
            >
              <div className="text-2xl mb-2">💎</div>
              <h3 className="font-semibold">Get Credits</h3>
              <p className="text-sm text-gray-400 mt-1">Power up</p>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.07 }}>
            <Link 
              to="/features" 
              className="bg-white border border-gray-100 text-gray-900 rounded-xl p-6 shadow hover:shadow-lg transition-all block"
            >
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-semibold">Features</h3>
              <p className="text-sm text-gray-400 mt-1">Learn more</p>
            </Link>
          </motion.div>
        </motion.div>

        {/* AI Tips & Inspiration */}
        <motion.div 
          className="bg-white rounded-2xl shadow p-6 mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">AI Tips & Inspiration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-gray-50 rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-blue-500 text-lg mb-3">✨ Prompt Engineering</div>
              <p className="text-gray-600 mb-3">Be specific with details like style, mood, lighting, and perspective for better results.</p>
              <button 
                onClick={handleGenerateClick}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Try Now →
              </button>
            </motion.div>
            <motion.div 
              className="bg-gray-50 rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-blue-500 text-lg mb-3">🎨 Style Mixing</div>
              <p className="text-gray-600 mb-3">Combine different art styles like "watercolor meets cyberpunk" for unique creations.</p>
              <button 
                onClick={handleGenerateClick}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Try Now →
              </button>
            </motion.div>
            <motion.div 
              className="bg-gray-50 rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-blue-500 text-lg mb-3">🌟 Pro Tips</div>
              <p className="text-gray-600 mb-3">Use descriptive adjectives and reference specific artists or time periods for inspiration.</p>
              <button 
                onClick={handleGenerateClick}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Try Now →
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Resources & Help */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Tutorial</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">1</div>
                <div>
                  <p className="font-medium text-gray-800">Choose Your Style</p>
                  <p className="text-gray-500 text-sm">Browse through our collection of AI art styles</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">2</div>
                <div>
                  <p className="font-medium text-gray-800">Write Your Prompt</p>
                  <p className="text-gray-500 text-sm">Describe what you want to create in detail</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">3</div>
                <div>
                  <p className="font-medium text-gray-800">Generate & Share</p>
                  <p className="text-gray-500 text-sm">Create your image and share it with the world</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h3>
            <div className="space-y-4">
              <Link to="/features" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="text-2xl">📚</div>
                <div>
                  <p className="font-medium text-gray-800">Documentation</p>
                  <p className="text-gray-500 text-sm">Learn about all features</p>
                </div>
              </Link>
              <a href="#support" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="text-2xl">💬</div>
                <div>
                  <p className="font-medium text-gray-800">Support</p>
                  <p className="text-gray-500 text-sm">Get help when you need it</p>
                </div>
              </a>
              <Link to="/buy" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="text-2xl">💎</div>
                <div>
                  <p className="font-medium text-gray-800">Premium Features</p>
                  <p className="text-gray-500 text-sm">Unlock more possibilities</p>
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 