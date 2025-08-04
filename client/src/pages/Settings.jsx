import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { theme, setTheme, isAuthenticated, credit, logout } = useContext(AppContext);
  const [profile, setProfile] = useState({ name: 'John Doe', email: 'john@example.com' });
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({ email: true, sms: false, inApp: true });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Placeholder handlers
  const handleProfileChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
  const handleLanguageChange = (e) => setLanguage(e.target.value);
  const handleNotificationChange = (e) => setNotifications({ ...notifications, [e.target.name]: e.target.checked });

  return (
    <div className=" bg-white mx-auto py-10 px-4 text-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Settings</h1>
      {/* Profile Section */}
      <section className="mb-8 bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Profile Information</h2>
        <div className="flex flex-col gap-4">
          <input
            className="bg-white rounded px-4 py-2 focus:outline-none border border-gray-200"
            type="text"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            placeholder="Name"
          />
          <input
            className="bg-white rounded px-4 py-2 focus:outline-none border border-gray-200"
            type="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            placeholder="Email"
          />
          <button className="self-start bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium transition">Save Changes</button>
        </div>
      </section>

      {/* Password Section */}
      <section className="mb-8 bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Change Password</h2>
        <div className="flex flex-col gap-4">
          <input className="bg-white rounded px-4 py-2 focus:outline-none border border-gray-200" type={showPassword ? 'text' : 'password'} placeholder="Current Password" />
          <input className="bg-white rounded px-4 py-2 focus:outline-none border border-gray-200" type={showPassword ? 'text' : 'password'} placeholder="New Password" />
          <input className="bg-white rounded px-4 py-2 focus:outline-none border border-gray-200" type={showPassword ? 'text' : 'password'} placeholder="Confirm New Password" />
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} /> Show Passwords
          </label>
          <button className="self-start bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium transition">Update Password</button>
        </div>
      </section>
      
      {/* Credits/Subscription */}
      <section className="mb-8 bg-white rounded-lg p-6 shadow-md flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Credits</h2>
          <p className="text-lg mt-1 text-gray-700">You have <span className="font-bold text-blue-600">{credit}</span> credits left.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium transition" onClick={() => navigate('/buy')}>Buy More</button>
      </section>

      {/* Notification Preferences
      <section className="mb-8 bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Notification Preferences</h2>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" name="email" checked={notifications.email} onChange={handleNotificationChange} /> Email Notifications
          </label>
          <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" name="sms" checked={notifications.sms} onChange={handleNotificationChange} /> SMS Notifications
          </label>
          <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" name="inApp" checked={notifications.inApp} onChange={handleNotificationChange} /> In-App Notifications
          </label>
        </div>
      </section> */}

      

      {/* Account Actions */}
      <section className="mb-8 bg-white rounded-lg p-6 shadow-md flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">Account Actions</h2>
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-medium transition w-fit">Delete Account</button>
        <button onClick={logout} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white font-medium transition w-fit">Logout</button>
      </section>

      {/* Connected Accounts */}
      <section className="mb-8 bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Connected Accounts</h2>
        <div className="flex gap-4">
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded flex items-center gap-2 text-gray-700"><span>GitHub</span></button>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded flex items-center gap-2 text-gray-700"><span>Google</span></button>
        </div>
      </section>

      

      {/* Language Selection
      <section className="mb-8 bg-white rounded-lg p-6 shadow-md flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Language</h2>
        <select
          className="bg-white rounded px-4 py-2 focus:outline-none text-gray-900 border border-gray-200"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </section> */}
    </div>
  );
};

export default Settings; 