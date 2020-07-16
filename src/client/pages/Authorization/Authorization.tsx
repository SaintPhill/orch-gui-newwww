import React from 'react'
import './Authorization.scss'
import Tricolor from '../../images/logos/Tricolor'
import Iflex from '../../images/logos/Iflex'
import { Button } from '../../UI/buttons/Button'

const Authorization: React.FC = () => {
    return (
        <div className="auth-container">
            <div className="header">
                <div className="header__logo">
                    <Tricolor />
                </div>
                <div className="header__logo">
                    <Iflex />
                </div>
            </div>
            <div className="main-title">
                <div className="main-title__text">
                    Вход в систему управления оркестрационными процессами
                </div>
            </div>
            <div className="auth-form">
                <div className="auth-form__item">
                    <label className="label">Пользователь</label>
                    <input type="text" className="input"/>
                </div>
                <div className="auth-form__item">
                    <label className="label">Пароль</label>
                    <input type="password" className="input"/>
                </div>
                <Button
                    trait="primary"
                >
                    Вход
                </Button>
            </div>
        </div>
    )
}

export default Authorization