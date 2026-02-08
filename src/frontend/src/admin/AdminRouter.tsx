import { useState } from 'react';
import { AdminLoginPage } from './AdminLoginPage';
import { AdminDashboardPage } from './AdminDashboardPage';
import { useAdminAuth } from './auth/adminAuth';

export function AdminRouter() {
  const { isAuthenticated, login, logout } = useAdminAuth();

  if (!isAuthenticated) {
    return <AdminLoginPage onLogin={login} />;
  }

  return <AdminDashboardPage onLogout={logout} />;
}
