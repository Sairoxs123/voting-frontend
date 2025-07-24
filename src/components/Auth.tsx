import React, { useState, useEffect, useCallback } from 'react';
import sendRequest from '../utils/requests';
import { Link } from 'react-router-dom';
import {useCookies} from "react-cookie"
import {sendVerificationEmail} from "../utils/AuthServices"

// Main App component
const Auth: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [currentStep, setCurrentStep] = useState<'rules' | 'jssid' | 'email'>('rules');
  const [progress, setProgress] = useState<number>(0);
  const [jssidInput, setJssidInput] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');

  const handleAuth = async () => {
    const formData : FormData = new FormData()
    formData.append('jssid', "JSSPS" + jssidInput)
    formData.append('email', emailInput + "@jsspsdubai.com")
    sendRequest("post", "/auth", formData).then((res) => {
      if (!res.voted) {
        setCookie("user", {
          email : emailInput + "@jsspsdubai.com",
          jssid : "JSSPS" + jssidInput
        })
        sendVerificationEmail(emailInput + "@gmail.com").then(() => {
          window.location.href = "/email/sent"
        });
      }
    });
  }

  const startVoting = useCallback(() => {
    setCurrentStep('jssid');
    setProgress(100 / 3);
  }, []);

  const handleNext = useCallback((nextStep: 'jssid' | 'email') => {
    setCurrentStep(nextStep);
    setProgress(prev => prev + 100 / 3);
  }, []);

  const handlePrev = useCallback((prevStep: 'rules' | 'jssid') => {
    setCurrentStep(prevStep);
    setProgress(prev => prev - 100 / 3);
  }, []);

  const handleJssidInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setJssidInput(e.target.value);
  }, []);

  // Handle Email input change and enable/disable the 'Next' button
  const handleEmailInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  }, []);

  // Effect hook to handle global event listeners for context menu and keyboard shortcuts
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener('contextmenu', handleContextMenu);

    // Disable specific keyboard shortcuts (F12, Ctrl+Shift+I/J/C/T, Ctrl+U)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') { // Prevent form submission on Enter key
        e.preventDefault();
        return false;
      }
      if (e.keyCode === 123) { // F12 key
        return false;
      }
      if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'T'].includes(e.key.toUpperCase())) {
        return false;
      }
      if (e.ctrlKey && e.key.toUpperCase() === 'U') {
        return false;
      }
      return true;
    };
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return (
    // Main container with background image and overlay
    <div className="min-h-screen bg-cover bg-center relative
                    bg-[url('https://www.yallaschools.com/uploads/JSS_Pvt_School.jpg')]
                    after:content-[''] after:absolute">

      {/* Home link button */}
      <Link
        to="/"
        className="absolute top-0 left-0 m-2.5 px-10 py-4 text-center text-white uppercase
                   transition-all duration-500 bg-gradient-to-r from-gray-800 via-blue-500 to-gray-800
                   bg-[length:200%_auto] shadow-lg rounded-xl text-4xl font-bold
                   hover:bg-right-center hover:no-underline"
      >
        Home
      </Link>

      {/* Progress bar section */}
      <div className="w-full px-4 pt-[5%]"> {/* Added px-4 for padding on smaller screens */}
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mt-2">
        <h1 className="text-white text-5xl font-bold">VOTE!!!</h1>
      </div>

      {/* Rules Page */}
      {currentStep === 'rules' && (
        <div id="rules" className="block">
          <div className="bg-white/90 rounded-xl shadow-2xl p-10 max-w-4xl mx-auto mt-12 text-gray-800">
            <h1 className="text-gray-800 text-4xl font-bold text-center mb-7 uppercase
                           border-b-4 border-blue-500 pb-4">
              School Election Voting Rules
            </h1>
            <div className="text-lg leading-relaxed">
              <p>Welcome to the JSS Private School Dubai student council elections. Before you proceed with casting your vote, please read and understand the following rules:</p>
              <ol className="ml-5 mt-5 list-decimal">
                <li className="mb-4 pl-2.5">Each student is entitled to cast only one vote for each position.</li>
                <li className="mb-4 pl-2.5">You must use your official school JSSID and email to authenticate your voting eligibility.</li>
                <li className="mb-4 pl-2.5">Please <b className="uppercase">do not</b> type JSSPS while entering your JSSID and @jsspsdubai.com while entering your school email.</li>
                <li className="mb-4 pl-2.5">Please <b className="uppercase">do not</b> use <i>safari</i> for the voting process. If you do not have any other device to vote from, you can use the computers in the senior IT lab but please make sure you are able to login to your outlook account.</li>
                <li className="mb-4 pl-2.5">Please check the spam or junk folder in your mail if the verification email is not visible in your inbox.</li>
                <li className="mb-4 pl-2.5">You will be voting for the following positions: Head Boy, Head Girl, Sports Captain (Boys), Sports Captain (Girls), Deputy Head Boy, Deputy Head Girl, Deputy Sports Captain (Boys), and Deputy Sports Captain (Girls).</li>
                <li className="mb-4 pl-2.5">Once your vote is submitted, it cannot be changed or retracted.</li>
                <li className="mb-4 pl-2.5">Attempting to vote multiple times or manipulate the voting system is strictly prohibited.</li>
                <li className="mb-4 pl-2.5">The system will verify your identity before allowing you to cast your vote.</li>
                <li className="mb-4 pl-2.5">Your vote will remain confidential and secure.</li>
                <li className="mb-4 pl-2.5">If you encounter any technical issues during the voting process, please contact your class teacher to inform the IT Department immediately.</li>
              </ol>
              <div className="text-center mt-7 italic text-gray-600">
                <p>By clicking "Start Voting" below, you acknowledge that you have read and agree to abide by these rules.</p>
              </div>
            </div>
            <button
              className="bg-gradient-to-br from-blue-500 to-gray-800 text-white text-2xl font-bold
                         px-10 py-4 border-none rounded-full cursor-pointer block mx-auto mt-10 mb-5
                         transition-all duration-300 ease-in-out shadow-md
                         hover:from-gray-800 hover:to-blue-500 hover:-translate-y-1 hover:shadow-lg"
              onClick={startVoting}
            >
              Start Voting
            </button>
          </div>
        </div>
      )}

      {/* JSSID Input Page */}
      {currentStep === 'jssid' && (
        <div id="jssid" className="block">
          <div className="flex items-center justify-center
                          bg-cover bg-center p-5 max-w-3xl h-[50vh] mx-auto mt-12 rounded-xl shadow-lg
                          bg-[url('https://w0.peakpx.com/wallpaper/506/235/HD-wallpaper-white-hexagon-geometric-shapes-white-aesthetic.jpg')]
                          relative after:content-[''] after:absolute after:inset-0 after:bg-black/30">
            <div className="relative z-10 text-white"> {/* Added relative z-10 for text to be above overlay */}
              <div>
                <span className="text-5xl md:text-6xl">Enter your JSSID:</span>
              </div>
              <br />
              <div className="flex justify-center items-center">
                <span className="text-3xl md:text-4xl">JSSPS</span>
                <input
                  type="text"
                  id="jssid-input"
                  name="jssid"
                  form="vote"
                  placeholder="Ex: A0089"
                  className="ml-2 border-2 border-blue-500 rounded-lg px-4 py-2 outline-none
                             transition-all duration-300 ease-in-out shadow-md
                             focus:border-blue-400 focus:shadow-lg placeholder:text-blue-200 placeholder:opacity-70
                             text-3xl max-w-[300px] text-gray-800"
                  value={jssidInput}
                  onChange={handleJssidInputChange}
                />
              </div>
            </div>
          </div>
          <br />
          <div className="absolute bottom-5 left-1/4 -translate-x-1/2">
            <button
              type="button"
              onClick={() => handlePrev('rules')}
              className="text-2xl font-bold px-10 py-5 bg-gradient-to-br from-red-500 to-red-400
                         text-white border-none cursor-pointer w-full rounded-xl transition-all duration-300 ease-in-out
                         shadow-md hover:scale-105 hover:shadow-lg"
            >
              Previous
            </button>
          </div>
          <div className="absolute bottom-5 right-1/4 translate-x-1/2">
            <button
              type="button"
              onClick={() => handleNext('email')}
              id="jssid-button"
              className={`text-2xl font-bold px-10 py-5 bg-green-500 text-white border-none
                         cursor-pointer w-full rounded-xl transition-all duration-300 ease-in-out
                         shadow-md hover:bg-green-600 hover:scale-105 ${jssidInput.length >= 4 ? 'block' : 'hidden'}`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Email Input Page */}
      {currentStep === 'email' && (
        <div id="email" className="block">
          <div className="flex items-center justify-center
                          bg-cover bg-center p-5 max-w-3xl h-[50vh] mx-auto mt-12 rounded-xl shadow-lg
                          bg-[url('https://w0.peakpx.com/wallpaper/506/235/HD-wallpaper-white-hexagon-geometric-shapes-white-aesthetic.jpg')]
                          relative after:content-[''] after:absolute after:inset-0 after:bg-black/30">
            <div className="relative z-10 text-white">
              <div>
                <span className="text-5xl md:text-6xl ml-15">Enter your email:</span>
              </div>
              <br />
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  name="email"
                  id="email-input"
                  form="vote"
                  placeholder="Ex: saiteja"
                  className="border-2 border-blue-500 rounded-lg px-4 py-2 outline-none
                             transition-all duration-300 ease-in-out shadow-md
                             focus:border-blue-400 focus:shadow-lg placeholder:text-blue-200 placeholder:opacity-70
                             text-3xl max-w-[300px] text-gray-800"
                  value={emailInput}
                  onChange={handleEmailInputChange}
                />
                <span className="text-3xl md:text-4xl ml-2">@jsspsdubai.com</span>
              </div>
            </div>
          </div>
          <br />
          <div className="absolute bottom-5 left-1/4 -translate-x-1/2">
            <button
              type="button"
              onClick={() => handlePrev('jssid')}
              className="text-2xl font-bold px-10 py-5 bg-gradient-to-br from-red-500 to-red-400
                         text-white border-none cursor-pointer w-full rounded-xl transition-all duration-300 ease-in-out
                         shadow-md hover:scale-105 hover:shadow-lg"
            >
              Previous
            </button>
          </div>
          <div className="absolute bottom-5 right-1/4 translate-x-1/2">
            {/* The original code had type="submit" here. Keeping it for form semantics. */}
            <button
              type="button"
              id="email-button"
              onClick={() => handleAuth()}
              className={`text-2xl font-bold px-10 py-5 bg-green-500 text-white border-none
                         cursor-pointer w-full rounded-xl transition-all duration-300 ease-in-out
                         shadow-md hover:bg-green-600 hover:scale-105 ${emailInput.length > 1 ? 'block' : 'hidden'}`}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
