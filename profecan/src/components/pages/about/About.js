import React from 'react';
import './About.css';
import Footer from '../../footer/Footer';

export default function About() {
    return (
        <>

            <div className='container'>

                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320">
                    <path fill="#e95f0f"
                        fill-opacity="1" d="M0,320L60,288C120,256,240,192,360,160C480,128,600,128,720,154.7C840,181,960,235,1080,224C1200,213,1320,139,1380,101.3L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z">
                    </path>
                    <text x="50%" y="20%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="40px" font-weight="bold">Nosotros</text>
                </svg>

                <div className='about'>
                    <div className='about__title'>
                        <img src="../images/logo.png"
                            alt="Estamos ubicados en el Km 0,5 vía Sonsón - Aguadas"
                            width="250px"
                            height="200px"
                        />
                        <p style={{ textAlign: 'center' }}>Estamos ubicados en el Km 0,5 vía Sonsón - Aguadas</p>
                    </div>

                    <div className='about__description'>
                        <p>
                            Nuestra misión es promover el bienestar animal, la tenencia responsable de mascotas y la protección del medio ambiente a través de asesoría, divulgación, rescate de fauna, estelirización masiva, promoción de normatividad y defensa de los derechos animales, en colaboración con diversas organizaciones y sectores.
                        </p>
                    </div>
                </div>

                <div className='container__images'>
                    <div className='text__img1'>
                        <p style={{ textAlign: 'center' }}> <h3> SERVICIOS </h3>
                            <br />  • Hogar de paso o refugio para animales en situación de vulnerabilidad.
                            <br />  • Jornadas de vacunación y esterilización masivas.
                            <br /> • Educación y sensibilización sobre tenencia responsable de mascotas.
                        </p>
                    </div>
                    <div className='container second'>

                    </div>
                </div>

                <div className='container__images'>
                    <div className='text__img2'>
                        <p style={{ textAlign: 'center' }}><br /> VISIÓN <br /> <br />  Ser el albergue referente en nuestra comunidad, donde cada mascota reciba amor, cuidado y una oportunidad de encontrar un hogar lleno de cariño. Trabajamos incansablemente para promover la tenencia responsable de mascotas y ser un pilar fundamental en la protección y bienestar animal.   </p>
                    </div>
                    <div className='img_3'>

                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}