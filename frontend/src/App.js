import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Profile from './Profile';
import AAC from './AAC';
import IEEE from './IEEE';
import Rhythms from './Rhythms';
import SDC from './SDC';
import Logout from './Logout';
import SquidRegister from './SquidRegister';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ieee" element={<IEEE />} />
            <Route path="/aac" element={<AAC />} />
            <Route path="/sdc" element={<SDC />} />
            <Route path="/rhythms" element={<Rhythms />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/squidregister" element={<SquidRegister />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
