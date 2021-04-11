import React from 'react';

import IContact from '../../../interfaces/IContact';

import imgProfile from '../../../assets/img/default.jpg';

import './styles.css';

import { 
    FaSearch,
    FaEllipsisV,
} from 'react-icons/fa';

interface Props{
    contactInfo: IContact | undefined
}

const Header: React.FC<Props> = ({ contactInfo }) => {

    return(
        <div className="chatHeader">
            <div className="headerLeft" title={contactInfo?.name}>
                <img className="imgProfile" src={imgProfile} alt={`Imagem de perfil do ${contactInfo?.name}`}/>
                <div>
                    <h3>{contactInfo?.name}</h3>
                </div>
            </div>

            <div className="headerRight">
                <FaSearch title="Pesquisar..." className="iconHeader" />
                <FaEllipsisV title="Mais opções"  className="iconHeader" />
            </div>
        </div>
    );
}

export default Header;