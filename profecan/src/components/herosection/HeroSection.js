import React from 'react';
import '../../App.css';
import { Button } from '../button/Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      {/*<video src='/videos/video-1.mp4' autoPlay loop muted />*/}
      <h1>Corporación PROFECAN</h1>
      <p>Juntos por el bienestar <br />animal </p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          label='/about'
        >
          Nosotros
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          label='/adoptions'
        >
          Adopciones
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
