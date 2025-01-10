import React, {useEffect, useRef} from 'react'
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

  useEffect(()=>{
    const tl = gsap.timeline();
    const ap = gsap.timeline();
    const bl = gsap.timeline();

    tl.fromTo(boxRef.current,
      {x: 20, 
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
        x: 1000
      },{
        x: 0,
        duration: 1,
        ease: 'power1.out'
      }
    ).fromTo(div2Ref.current,
      {
        x: -1000
      },{
        x: 0,
        duration: 1,
        ease: 'power1.out'
      }
    ).fromTo(div3Ref.current,
      {
        x: -1000
      },{
        x: 0,
        duration: 1,
        ease: 'power1.out'
      }
    ).fromTo(div4Ref.current,
      {
        x: -1000
      },{
        x: 0,
        duration: 1,
        ease: 'power1.out'
      }
    );
    bl.fromTo(circle1Ref.current,
      {
        x: -1000,
      },{
        x: 0,
        duration: 4,
        ease: 'power1.out',
        
      } 
    ).fromTo(circle2Ref.current,
      {
        y: 1000,
        x:1000
      },{
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power1.out",
        
      } 
    ).fromTo(circle3Ref.current,
      {
        x: 1000,
        y: -1000
      },{
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power1.out",
        
      } 
    )



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
            <img src={Pen} alt="pen" className='pen' ref={imageRef}/>
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
            <button className='ld-reg-btn' onClick={()=> navigate('/Registration')}>Get Started</button>
            <button className='ld-log-btn' onClick={()=> navigate('/Login')}>Login</button>
          </div>
        </div>
        <div className="landing-con2">
          <div ref={boxRef} className='lp-left-container'>
            <div className="lp-blank1">
              <div className="lp-three-dot1" ref={circle1Ref}></div>
              <div className="lp-three-dot2" ref={circle2Ref}></div>
              <div className="lp-three-dot3" ref={circle3Ref}></div>
            </div>
            <div ref={line1Ref}  className="lp-blank2"></div>
            <div ref={line2Ref} className="lp-blank3"></div>
            <div ref={line3Ref} className="lp-blank4"></div>
            <div ref={line4Ref} className="lp-blank5"></div>
          </div>
        </div>
    </div>
  )
}

export default Landing


