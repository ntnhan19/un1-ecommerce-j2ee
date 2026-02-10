import React from 'react';

const AuthLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
