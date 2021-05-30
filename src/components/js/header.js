import React from 'react'
import '../styles/header.css'

import { Link } from 'react-router-dom'

import BackButton from '../images/back-button.svg'

function Header() {

    return(
        <header>
            <div className="container">
                <Link to="/" >
                    <img className="img-header" src={BackButton} />
                </Link>
                
            </div>
        </header>
    )

}

export default Header;