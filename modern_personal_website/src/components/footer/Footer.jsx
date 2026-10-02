import React from 'react'
import './footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container container">
                <h1 className="footer__title">Edison</h1>

                <ul className="footer__list">
                    <li >
                        <a href="#about" className="footer__link">About</a>
                    </li>

                    <li >
                        <a href="#portafolio" className="footer__link">Projects</a>
                    </li>

                    <li >
                        <a href="#services" className="footer__link">Services</a>
                    </li>
                </ul>

                <div className="footer__social">

                    <a href="https://www.facebook.com/edison.orozcocarmona" className="footer__social-link" target="_blank">
                        <i class="bx bxl-facebook"></i>
                    </a>

                    <a href="https://www.instagram.com/edison.orozco.c/?hl=es" className="footer__social-link" target="_blank">
                        <i class="bx bxl-instagram"></i>
                    </a>

                    <a href="https://github.com/edisonorozco" className="footer__social-link" target="_blank">
                        <i class="bx bxl-twitter"></i>
                    </a>

                </div>

                <span className="footer__copy">
                    &#169; Software Masters. All rigths reserved
                </span>
            </div>
        </footer>
    )
}

export default Footer
