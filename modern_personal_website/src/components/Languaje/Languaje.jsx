import i18n from 'i18next';
import React from 'react'
import US from 'country-flag-icons/react/3x2/US'
import CO from 'country-flag-icons/react/3x2/CO'
import './languaje.css'
import { useState } from 'react'

const Languaje = () => {

    const lngs = [
        {
            code: 'en',
            nativeName: 'English',
        },
        {
            code: 'es',
            nativeName: 'Spanish',
        }
    ];

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    }

    return (

        <div className='content'>
            {lngs.map((lng) => {
                return (

                    lng.code === "en" ?
                        <US title="English"
                            className={toggleState === 1 ? "languajes active__languaje" : "languajes"}
                            key={lng.code}
                            type="submit"
                            onClick={() => {
                                i18n.changeLanguage(lng.code);
                                toggleTab(1);
                            }} />
                        :
                        <CO title="Español"
                            className={toggleState === 2 ? "languajes active__languaje" : "languajes"}
                            key={lng.code}
                            type="submit"
                            onClick={() => {
                                i18n.changeLanguage(lng.code);
                                toggleTab(2);
                            }} />

                );
            })}
        </div>

    )
}

export default Languaje
