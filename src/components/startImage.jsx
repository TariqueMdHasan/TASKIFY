import React, {useEffect, useRef} from 'react'
import './startImage.css'
import Book from '../assets/penn.png'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";

function StartImage() {
    const bookRef = useRef()
    const navigate = useNavigate()

    useEffect(()=> {
        gsap.fromTo(bookRef.current, 
            {
                y: 30
            },{
                y: -30,
                duration: 2,
                repeat: -1,
                ease: 'none',
                yoyo: true
            }
        )
    })



    return (
        <div class="start-Left">
            <button className='si-back' onClick={() => navigate('/')}>
                <IoMdArrowRoundBack />
            </button>
            <div class="start-images">
                <img src={Book} alt="A robot" class="Art-image" ref={bookRef} />
            </div>
            <div class="start-Left-Text" >
                <h2>Welcome aboard my friend</h2>
                <h4>Just a couple of clicks and we start</h4>
            </div>
        </div>
    )
}

export default StartImage