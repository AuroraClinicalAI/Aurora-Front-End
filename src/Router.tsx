import { Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/home/HomePage';
import { Login } from '@/pages/auth/Login';
import { NotFound } from '@/pages/general/NotFound';
import { Register } from '@/pages/auth/Register';
import { RegisterConfirm } from '@/pages/auth/RegisterConfirm';
import { About } from '@/pages/home/About';
import { AdminPanel } from '@/pages/dashboard/AdminPanel';
import { Analysis } from '@/pages/clinical/Analysis';
import { CaseAnalysis } from '@/pages/clinical/CaseAnalysis';
import { ClinicalDiagnostic } from '@/pages/clinical/ClinicalDiagnostic';
import { Library } from '@/pages/library/Library';
import { RecentActivity } from '@/pages/users/RecentActivity';
import { ResearchingPanel } from '@/pages/clinical/ResearchingPanel';
import { RoleGuide } from '@/pages/tutorial/RoleGuide';
import { TestingValidation } from '@/pages/clinical/TestingValidation';
import { UserProfile } from '@/pages/users/UserProfile';
import { UserProfileSettings } from '@/pages/users/UserProfileSettings';
import { ForgotPassword } from '@/pages/auth/ForgotPassword';
import { Logout } from '@/pages/auth/Logout';
import { AccountActivation } from '@/pages/auth/AccountActivation';
import { CaseAssistant } from '@/pages/clinical/CaseAssistant';
import { PredictiveAnalysis } from '@/pages/clinical/PredictiveAnalysis';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { UserRole } from '@/types/Roles';
import { Unauthorized } from '@/pages/Unauthorized';
import { PrivacyPolicy } from './pages/general/PrivacyPolicy';
import { TermsOfUse } from './pages/general/TermsOfUse';
import { Dashboard } from '@/pages/dashboard/Dashboard';
import { CaseManagement } from '@/pages/clinical/CaseManagement';
import { UserDirectory } from '@/pages/dashboard/UserDirectory';
import { HelpCenter } from '@/pages/tutorial/HelpCenter';

export const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/register-confirm' element={<RegisterConfirm />} />
      <Route path='/activate/:token' element={<AccountActivation />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/about' element={<About />} />
      <Route path='/role-guide' element={<RoleGuide />} />
      <Route path='/unauthorized' element={<Unauthorized />} />
      <Route path='/privacy-policy' element={<PrivacyPolicy />} />
      <Route path='/terms-of-use' element={<TermsOfUse />} />
      <Route path='/help' element={<HelpCenter />} />

      {/* Protected Routes (Authenticated Users) */}
      <Route element={<ProtectedRoute />}>
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/profile/settings' element={<UserProfileSettings />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/library' element={<Library />} />
        <Route path='/recent-activity' element={<RecentActivity />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>

      {/* Role Restricted Routes */}

      {/* ADMIN & MODERADOR */}
      <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.MODERADOR]} />}>
        <Route path='/admin-panel' element={<AdminPanel />} />
        <Route path='/admin/users' element={<UserDirectory />} />
      </Route>

      {/* PRACTICANTE, PSICOLOGO, EVALUADOR */}
      <Route element={<ProtectedRoute allowedRoles={[UserRole.PRACTICANTE, UserRole.PSICOLOGO, UserRole.EVALUADOR, UserRole.ADMIN, UserRole.MODERADOR]} />}>
        <Route path='/cases' element={<CaseManagement />} />
        <Route path='/clinical-diagnostic' element={<ClinicalDiagnostic />} />
        <Route path='/analysis' element={<Analysis />} />
        <Route path='/case-analysis' element={<CaseAnalysis />} />
        <Route path='/case-assistant' element={<CaseAssistant />} />
        <Route path='/predictive-analysis' element={<PredictiveAnalysis />} />
      </Route>

      {/* ADMIN, MODERADOR, PSICOLOGO */}
      <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.MODERADOR, UserRole.PSICOLOGO]} />}>
        <Route path='/researching-panel' element={<ResearchingPanel />} />
      </Route>

      {/* EVALUADOR, ADMIN, MODERADOR */}
      <Route element={<ProtectedRoute allowedRoles={[UserRole.EVALUADOR, UserRole.ADMIN, UserRole.MODERADOR]} />}>
        <Route path='/testing-validation' element={<TestingValidation />} />
      </Route>

      {/* Catch-all */}
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
}
