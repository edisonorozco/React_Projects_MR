import React, { useState, useEffect } from 'react';
import { Button } from '../button/Button';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        Profecan
                        <i class='bx bxl-baidu'></i>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'bx bx-x' : 'bx bx-menu'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Inicio
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/about'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Nosotros
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/adoptions'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Adopciones
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link
                                to='/contact'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Contacto
                            </Link>
                        </li>

                    </ul>

                </div>
            </nav>
        </>
    );
}

export default Navbar;