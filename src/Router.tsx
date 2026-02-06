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

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/*' element={<NotFound />} />
      <Route path='/register' element={<Register />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/register-confirm' element={<RegisterConfirm />} />
      <Route path='/activate/:token' element={<AccountActivation />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/about' element={<About />} />
      <Route path='/admin-panel' element={<AdminPanel />} />
      <Route path='/analysis' element={<Analysis />} />
      <Route path='/case-analysis' element={<CaseAnalysis />} />
      <Route path='/clinical-diagnostic' element={<ClinicalDiagnostic />} />
      <Route path='/library' element={<Library />} />
      <Route path='/recent-activity' element={<RecentActivity />} />
      <Route path='/researching-panel' element={<ResearchingPanel />} />
      <Route path='/role-guide' element={<RoleGuide />} />
      <Route path='/testing-validation' element={<TestingValidation />} />
      <Route path='/profile' element={<UserProfile />} />
      <Route path='/profile/settings' element={<UserProfileSettings />} />
      <Route path='/case-assistant' element={<CaseAssistant />} />
      <Route path='/predictive-analysis' element={<PredictiveAnalysis />} />
    </Routes>
  );
}
