import { Routes, Route } from 'react-router-dom'
import HomePage from '@pages/HomePage';
import { Login } from '@pages/Login';
import { NotFound } from '@pages/NotFound';
import { Register } from '@pages/Register';
import { RegisterConfirm } from '@pages/RegisterConfirm';
import { About } from '@pages/About';
import { AdminPanel } from '@pages/AdminPanel';
import { Analysis } from '@pages/Analysis';
import { CaseAnalysis } from '@pages/CaseAnalysis';
import { ClinicalDiagnostic } from '@pages/ClinicalDiagnostic';
import { Library } from '@pages/Library';
import { RecentActivity } from '@pages/RecentActivity';
import { ResearchingPanel } from '@pages/ResearchingPanel';
import { RoleGuide } from '@pages/RoleGuide';
import { TestingValidation } from '@pages/TestingValidation';
import { UserOverview } from '@pages/UserOverview';
import { UserProfile } from '@pages/UserProfile';
import { ForgotPassword } from '@pages/ForgotPassword';

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={ <HomePage/>}/>
      <Route path='/*' element={ <NotFound/>}/>
      <Route path='/login' element={ <Login/>}/>
      <Route path='/register' element={ <Register/>}/>
      <Route path='/register-confirm' element={ <RegisterConfirm/>}/>
      <Route path='/forgot-password' element={ <ForgotPassword/>}/>
      <Route path='/about' element={ <About/>}/>
      <Route path='/admin-panel' element={ <AdminPanel/>}/>
      <Route path='/analysis' element={ <Analysis/>}/>
      <Route path='/case-analysis' element={ <CaseAnalysis/>}/>
      <Route path='/clinical-diagnostic' element={ <ClinicalDiagnostic/>}/>
      <Route path='/library' element={ <Library/>}/>
      <Route path='/recent-activity' element={ <RecentActivity/>}/>
      <Route path='/researching-panel' element={ <ResearchingPanel/>}/>
      <Route path='/role-guide' element={ <RoleGuide/>}/>
      <Route path='/testing-validation' element={ <TestingValidation/>}/>
      <Route path='/user-overview' element={ <UserOverview/>}/>
      <Route path='/profile' element={ <UserProfile/>}/>
    </Routes>
  );
}