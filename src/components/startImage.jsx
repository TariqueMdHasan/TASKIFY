import React from 'react'
import './startImage.css'
import Art from '../assets/Art.png';

function StartImage() {
    return (
        <div class="start-Left">
            <div class="start-images">
                <img src={Art} alt="A robot" class="Art-image" />
            </div>
            <div class="start-Left-Text" >
                <h2>Welcome aboard my friend</h2>
                <h4>Just a couple of clicks and we start</h4>
            </div>
        </div>
    )
}

export default StartImage