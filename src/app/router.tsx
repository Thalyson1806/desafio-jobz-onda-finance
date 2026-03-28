import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { PrivateRoute } from '../shared/components/PrivateRoute'
import { Layout } from '../shared/components/Layout'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { TransferPage } from '../features/transfer/pages/TransferPage'
import { ExtratoPage } from '../features/extrato/pages/ExtratoPage'

function LayoutRoute() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route element={<LayoutRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/extrato" element={<ExtratoPage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
