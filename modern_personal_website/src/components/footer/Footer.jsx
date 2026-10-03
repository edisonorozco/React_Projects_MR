import React from 'react'
import { useTranslation } from 'react-i18next'
import './footer.css'
import { build } from '../../data/profile'

const Footer = () => {
    const { t } = useTranslation()
    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="container footer__inner mono">
                <span>Edison Orozco · {year}</span>
                <span>
                    {build.commit
                        ? `${t('footer.deploy')} ${build.date} · ${build.commit}`
                        : t('footer.local')}
                </span>
                <span>react → s3 → cloudfront</span>
            </div>
        </footer>
    )
}

export default Footer
