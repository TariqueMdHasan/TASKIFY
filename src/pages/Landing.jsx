import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'
import gsap from 'gsap'
import Pen from '../assets/penL.png'

function Landing() {
  const boxRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const line4Ref = useRef(null)
  const div1Ref = useRef(null)
  const div2Ref = useRef(null)
  const div3Ref = useRef(null)
  const div4Ref = useRef(null)
  const imageRef = useRef(null)
  const circle1Ref = useRef(null)
  const circle2Ref = useRef(null)
  const circle3Ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const tl = gsap.timeline();
    const ap = gsap.timeline();
    // const bl = gsap.timeline();








    tl.fromTo(boxRef.current,
      {
        x: 20,
        y: -50,
        ease: 'power3.in',
        duration: 1,
      },
      {
        x: -100,
        rotate: -20,
        duration: 1,
        ease: 'power3.in',
        overwrite: "auto",
        onComplete: () => {
          gsap.set(boxRef.current, { clearProps: 'rotate' }); // Clear inline rotate style
        },
      })
      .fromTo(circle1Ref.current,
        {
          x: 1000,
          y: 1000
        }, {
        x: 0,
        y: 0,
        duration: 4,
        ease: 'power1.out',

      }
      ).fromTo(circle2Ref.current,
        {
          y: 1000,
          x: 1000
        }, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power1.out",

      }
      ).fromTo(circle3Ref.current,
        {
          x: 1000,
          y: -1000
        }, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power1.out",

      }
      )
      .fromTo(line1Ref.current,
        {
          width: "0%"
        },
        {
          width: "60%",
          duration: 1,
          ease: "power1.out"
        }
      ).fromTo(line2Ref.current,
        {
          width: "0%"
        },
        {
          width: "90%",
          duration: 1,
          ease: "power1.out"
        }
      ).fromTo(line3Ref.current,
        {
          width: "0%"
        },
        {
          width: "30%",
          duration: 1,
          ease: "power1.out"
        }
      ).fromTo(line4Ref.current,
        {
          width: "0%"
        },
        {
          width: "50%",
          duration: 1,
          ease: "power1.out"
        }
      );
    ap.fromTo(div1Ref.current,
      {
        x: -1000
      }, {
      x: 0,
      duration: 1,
      ease: 'power1.out'
    }
    ).fromTo(div2Ref.current,
      {
        x: -1000
      }, {
      x: 0,
      duration: 1,
      ease: 'power1.out'
    }
    ).fromTo(div3Ref.current,
      {
        x: -1000
      }, {
      x: 0,
      duration: 1,
      ease: 'power1.out'
    }
    ).fromTo(div4Ref.current,
      {
        x: -1000
      }, {
      x: 0,
      duration: 1,
      ease: 'power1.out'
    }
    );
    // bl.fromTo(circle1Ref.current,
    //   {
    //     x: 1000,
    //     y: 5000
    //   },{
    //     x: 0,
    //     y: 0,
    //     duration: 4,
    //     ease: 'power1.out',

    //   } 
    // ).fromTo(circle2Ref.current,
    //   {
    //     y: 1000,
    //     x:1000
    //   },{
    //     x: 0,
    //     y: 0,
    //     duration: 0.5,
    //     ease: "power1.out",

    //   } 
    // ).fromTo(circle3Ref.current,
    //   {
    //     x: 1000,
    //     y: -1000
    //   },{
    //     x: 0,
    //     y: 0,
    //     duration: 0.5,
    //     ease: "power1.out",

    //   } 
    // )



    gsap.to(imageRef.current, {
      rotation: 360,
      repeat: -1,
      duration: 2,
      ease: "linear" 
    });

  }, [])


  return (
    <div className='Landing-container'>
      <div className="landing-con1">
        <div className="ld-left1" ref={div1Ref}>
          <h2>TASKIFY</h2>
        </div>
        <div className="ld-left5">
          <img src={Pen} alt="pen" className='pen' ref={imageRef} />
        </div>
        <div className="ld-left2" ref={div2Ref}>
          <h1><span className='ld-h1-w'>Manage work,</span> <br /> <span className='ld-h1-b'>Increase Productivity</span></h1>
        </div>
        <div className="ld-left3" ref={div3Ref}>
          <h3>
            Streamline your workflow, manage you plan and accomplish more with our intuitive task management platform.
          </h3>
        </div>
        <div className="ld-left4" ref={div4Ref}>
          <button className='ld-reg-btn' onClick={() => navigate('/Registration')}>Get Started</button>
          <button className='ld-log-btn' onClick={() => navigate('/Login')}>Login</button>
        </div>
      </div>
      <div className="landing-con2">
        <div ref={boxRef} className='lp-left-container'>
          <div className="lp-blank1">
            <div className="lp-three-dot1" ref={circle1Ref}></div>
            <div className="lp-three-dot2" ref={circle2Ref}></div>
            <div className="lp-three-dot3" ref={circle3Ref}></div>
          </div>
          <div ref={line1Ref} className="lp-blank2">
            <div className="lp-blacnk21 lp1"></div>
            <div className="lp-blacnk22 lp1"></div>
            <div className="lp-blacnk23 lp1"></div>
            <div className="lp-blacnk24 lp1"></div>
            <div className="lp-blacnk25 lp1"></div>
            <div className="lp-blacnk26 lp1"></div>
            <div className="lp-blacnk27 lp1"></div>
            <div className="lp-blacnk28 lp1"></div>
            <div className="lp-blacnk29 lp1"></div>
            <div className="lp-blacnk210 lp1"></div>
            <div className="lp-blacnk211 lp1"></div>
            <div className="lp-blacnk212 lp1"></div>
            <div className="lp-blacnk213 lp1"></div>
            <div className="lp-blacnk214 lp1"></div>
            <div className="lp-blacnk215 lp1"></div>
            <div className="lp-blacnk216 lp1"></div>
            <div className="lp-blacnk217 lp1"></div>
            <div className="lp-blacnk218 lp1"></div>
            <div className="lp-blacnk219 lp1"></div>
            <div className="lp-blacnk220 lp1"></div>
            <div className="lp-blacnk221 lp1"></div>
            <div className="lp-blacnk222 lp1"></div>
            <div className="lp-blacnk223 lp1"></div>
            <div className="lp-blacnk224 lp1"></div>
            <div className="lp-blacnk225 lp1"></div>
            <div className="lp-blacnk226 lp1"></div>
            <div className="lp-blacnk227 lp1"></div>
            <div className="lp-blacnk228 lp1"></div>
            <div className="lp-blacnk229 lp1"></div>
            <div className="lp-blacnk230 lp1"></div>
          </div>
          <div ref={line2Ref} className="lp-blank3">
            <div className="lp3-blank1 lp3"></div>
            <div className="lp3-blank2 lp3"></div>
            <div className="lp3-blank3 lp3"></div>
            <div className="lp3-blank4 lp3"></div>
            <div className="lp3-blank5 lp3"></div>
            <div className="lp3-blank6 lp3"></div>
            <div className="lp3-blank7 lp3"></div>
            <div className="lp3-blank8 lp3"></div>
            <div className="lp3-blank9 lp3"></div>
            <div className="lp3-blank10 lp3"></div>
            <div className="lp3-blank11 lp3"></div>
            <div className="lp3-blank12 lp3"></div>
            <div className="lp3-blank13 lp3"></div>
            <div className="lp3-blank14 lp3"></div>
            <div className="lp3-blank15 lp3"></div>
            <div className="lp3-blank16 lp3"></div>
            <div className="lp3-blank17 lp3"></div>
            <div className="lp3-blank18 lp3"></div>
            <div className="lp3-blank19 lp3"></div>
            <div className="lp3-blank20 lp3"></div>
            <div className="lp3-blank21 lp3"></div>
            <div className="lp3-blank22 lp3"></div>
            <div className="lp3-blank23 lp3"></div>
            <div className="lp3-blank24 lp3"></div>
            <div className="lp3-blank25 lp3"></div>
            <div className="lp3-blank26 lp3"></div>
            <div className="lp3-blank27 lp3"></div>
            <div className="lp3-blank28 lp3"></div>
            <div className="lp3-blank29 lp3"></div>
            <div className="lp3-blank30 lp3"></div>
            <div className="lp3-blank31 lp3"></div>
            <div className="lp3-blank32 lp3"></div>
            <div className="lp3-blank33 lp3"></div>
            <div className="lp3-blank34 lp3"></div>
            <div className="lp3-blank35 lp3"></div>
            <div className="lp3-blank36 lp3"></div>
            <div className="lp3-blank37 lp3"></div>
            <div className="lp3-blank38 lp3"></div>
            <div className="lp3-blank39 lp3"></div>
            <div className="lp3-blank40 lp3"></div>
            <div className="lp3-blank41 lp3"></div>
            <div className="lp3-blank42 lp3"></div>
            <div className="lp3-blank43 lp3"></div>
            <div className="lp3-blank44 lp3"></div>
            <div className="lp3-blank45 lp3"></div>
          </div>
          <div ref={line3Ref} className="lp-blank4">
            <div className="lp4-blank1 lp4"></div>
            <div className="lp4-blank2 lp4"></div>
            <div className="lp4-blank3 lp4"></div>
            <div className="lp4-blank4 lp4"></div>
            <div className="lp4-blank5 lp4"></div>
            <div className="lp4-blank6 lp4"></div>
            <div className="lp4-blank7 lp4"></div>
            <div className="lp4-blank8 lp4"></div>
            <div className="lp4-blank9 lp4"></div>
            <div className="lp4-blank10 lp4"></div>
            <div className="lp4-blank11 lp4"></div>
            <div className="lp4-blank12 lp4"></div>
            <div className="lp4-blank13 lp4"></div>
            <div className="lp4-blank14 lp4"></div>
            <div className="lp4-blank15 lp4"></div>
          </div>
          <div ref={line4Ref} className="lp-blank5">
            <div className="lp5-blank1 lp5"></div>
            <div className="lp5-blank2 lp5"></div>
            <div className="lp5-blank3 lp5"></div>
            <div className="lp5-blank4 lp5"></div>
            <div className="lp5-blank5 lp5"></div>
            <div className="lp5-blank6 lp5"></div>
            <div className="lp5-blank7 lp5"></div>
            <div className="lp5-blank8 lp5"></div>
            <div className="lp5-blank9 lp5"></div>
            <div className="lp5-blank10 lp5"></div>
            <div className="lp5-blank11 lp5"></div>
            <div className="lp5-blank12 lp5"></div>
            <div className="lp5-blank13 lp5"></div>
            <div className="lp5-blank14 lp5"></div>
            <div className="lp5-blank15 lp5"></div>
            <div className="lp5-blank16 lp5"></div>
            <div className="lp5-blank17 lp5"></div>
            <div className="lp5-blank18 lp5"></div>
            <div className="lp5-blank19 lp5"></div>
            <div className="lp5-blank20 lp5"></div>
            <div className="lp5-blank21 lp5"></div>
            <div className="lp5-blank22 lp5"></div>
            <div className="lp5-blank23 lp5"></div>
            <div className="lp5-blank24 lp5"></div>
            <div className="lp5-blank25 lp5"></div>
          </div>
        </div>
      </div>
      <p className='developer'>Developed by Tarique</p>
    </div>
  )
}

export default Landing


