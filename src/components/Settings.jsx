import React, {useState} from 'react'
import './Settings.css'
import { IoMdContact } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

function Settings() {
      const[passwordType, setPasswordType] = useState('password')
      const[passwordTypeOne, setPasswordTypeOne] = useState('password')
      const[passwordTypeSlashOne, setPasswordTypeSlashOne] = useState(<FaRegEyeSlash />)
      const[passwordTypeSlash, setPasswordTypeSlash] = useState(<FaRegEyeSlash />)
      
  
      const togglePasswordVisibilityFirst = () => {
          if(passwordTypeOne === 'password'){
              setPasswordTypeOne('text');
              setPasswordTypeSlashOne(<FaRegEye />)
          }else{
              setPasswordTypeOne('password');
              setPasswordTypeSlashOne(<FaRegEyeSlash />)
          }
      }
  
      const togglePasswordVisibility = () => {
          if(passwordType === 'password'){
              setPasswordType('text');
              setPasswordTypeSlash(<FaRegEye />)
          }else{
              setPasswordType('password');
              setPasswordTypeSlash(<FaRegEyeSlash />)
          }
      }

  return (
    <div className='Settings'>
      <div className='settings-input-container'>
        <div className="settings-image-input1">
          <IoMdContact />
        </div>
        <input type="text" className='settings-input' placeholder='Name' />
        <div className="settings-image-input2">

        </div>
      </div>

      <div className='settings-input-container'>
        <div className="settings-image-input1">
          <MdOutlineMailOutline />
        </div>
        <input type="text" className='settings-input' placeholder='Name' />
        <div className="settings-image-input2">
          
        </div>
      </div>

      <div className='settings-input-container'>
        <div className="settings-image-input1">
          <MdLockOutline />
        </div>
        <input type={passwordTypeOne} className='settings-input' placeholder='Name' />
        <div className="settings-image-input2" onClick={togglePasswordVisibilityFirst}>
          {passwordTypeSlashOne}
        </div>
      </div>

      <div className='settings-input-container'>
        <div className="settings-image-input1">
          <MdLockOutline />
        </div>
        <input type={passwordType} className='settings-input' placeholder='Name' />
        <div className="settings-image-input2" onClick={togglePasswordVisibility}>
          {passwordTypeSlash}
        </div>
      </div>

    </div>
  )
}

export default Settings







// import React, { useState } from 'react';
// import './Settings.css';
// import { IoMdContact } from 'react-icons/io';
// import { MdOutlineMailOutline } from 'react-icons/md';
// import { MdLockOutline } from 'react-icons/md';
// import { FaRegEye } from 'react-icons/fa';
// import { FaRegEyeSlash } from 'react-icons/fa';

// function Settings() {
//   // Separate state variables for each password field
//   const [passwordType, setPasswordType] = useState('password');
//   const [passwordTypeOne, setPasswordTypeOne] = useState('password');
//   const [passwordTypeSlashOne, setPasswordTypeSlashOne] = useState(<FaRegEyeSlash />);
//   const [passwordTypeSlash, setPasswordTypeSlash] = useState(<FaRegEyeSlash />);

//   // Toggle visibility for the first password field
//   const togglePasswordVisibilityFirst = () => {
//     if (passwordTypeOne === 'password') {
//       setPasswordTypeOne('text');
//       setPasswordTypeSlashOne(<FaRegEye />);
//     } else {
//       setPasswordTypeOne('password');
//       setPasswordTypeSlashOne(<FaRegEyeSlash />);
//     }
//   };

//   // Toggle visibility for the second password field
//   const togglePasswordVisibility = () => {
//     if (passwordType === 'password') {
//       setPasswordType('text');
//       setPasswordTypeSlash(<FaRegEye />);
//     } else {
//       setPasswordType('password');
//       setPasswordTypeSlash(<FaRegEyeSlash />);
//     }
//   };

//   return (
//     <div className='Settings'>
//       {/* Name input */}
//       <div className='settings-input-container'>
//         <div className="settings-image-input1">
//           <IoMdContact />
//         </div>
//         <input type="text" className='settings-input' placeholder='Name' />
//         <div className="settings-image-input2"></div>
//       </div>

//       {/* Email input */}
//       <div className='settings-input-container'>
//         <div className="settings-image-input1">
//           <MdOutlineMailOutline />
//         </div>
//         <input type="text" className='settings-input' placeholder='Email' />
//         <div className="settings-image-input2"></div>
//       </div>

//       {/* First password input */}
//       <div className='settings-input-container'>
//         <div className="settings-image-input1">
//           <MdLockOutline />
//         </div>
//         <input
//           type={passwordTypeOne}
//           className='settings-input'
//           placeholder='Password'
//         />
//         <div className="settings-image-input2" onClick={togglePasswordVisibilityFirst}>
//           {passwordTypeSlashOne}
//         </div>
//       </div>

//       {/* Second password input */}
//       <div className='settings-input-container'>
//         <div className="settings-image-input1">
//           <MdLockOutline />
//         </div>
//         <input
//           type={passwordType}
//           className='settings-input'
//           placeholder='Confirm Password'
//         />
//         <div className="settings-image-input2" onClick={togglePasswordVisibility}>
//           {passwordTypeSlash}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Settings;
