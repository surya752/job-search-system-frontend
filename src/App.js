import logo from './logo.svg';
import './App.css';
import HomePage from './Components/HomePage';
import "bootstrap/dist/css/bootstrap.css";
import EmployerNav from './Components/EmployerNav';
import JobSeekerNav from './Components/JobSeekerNav';
import SignUpComponent from './Components/SignUpComponent';
import Navbar from './Components/NavBar';
import Footer from './Components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Jobs from './Components/EmployerComponents/Jobs';
import JobSeeker from './Components/EmployerComponents/JobSeeker';
import PostJob from './Components/EmployerComponents/PostJob';
import Profile from './Components/EmployerComponents/Profile';
import ViewJobs from './Components/JobSeekerComponents/ViewJobs';
import AppliedJobs from './Components/JobSeekerComponents/AppliedJobs';
import JobBasket from './Components/JobSeekerComponents/JobBasket';
import JobSeekerProfile from './Components/JobSeekerComponents/JobSeekerProfile';
import { Login } from './Components/Login';
import { RegisterEmployer } from './Components/RegisterEmployer';
import { RegisterJobSeeker } from './Components/RegisterJobSeeker';
import EditJob from './Components/EmployerComponents/EditJob';
import EditProfile from './Components/JobSeekerComponents/EditProfile';
import EditEmployer from './Components/EmployerComponents/EditEmployer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<HomePage />}></Route>
        
          <Route path='/employer/jobs' element={<Jobs />}></Route>
          <Route path='/employer/jobseeker' element={<JobSeeker />}></Route>
          <Route path='/employer/editjob/:jobid' element={<EditJob />}></Route>
          <Route path='/employer/postjob' element={<PostJob />}></Route>
          <Route path='/employer/profile' element={<Profile />}></Route>
          <Route path='/employer/editprofile/:id' element={<EditEmployer />}></Route>

          <Route path='/jobseeker/jobs' element={<ViewJobs />}></Route>
          <Route path='/jobseeker/appliedjobs' element={<AppliedJobs />}></Route>
          <Route path='/jobseeker/jobbasket' element={<JobBasket />}></Route>
          <Route path='/jobseeker/profile' element={<JobSeekerProfile />}></Route>
          <Route path='/jobseeker/editprofile/:id' element={<EditProfile/>}></Route>

          <Route path='/login' element={<Login/>}></Route>
          <Route path='/registeremployer' element={<RegisterEmployer/>}></Route>
          <Route path='/registerjobseeker' element={<RegisterJobSeeker/>}></Route>
          
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
