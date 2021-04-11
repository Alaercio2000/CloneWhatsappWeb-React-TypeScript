import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSearch,
    faArrowDown
} from '@fortawesome/free-solid-svg-icons';

import './styles.css';

interface Props{
    setValueSearch : Function
}

const Search : React.FC<Props> = ({ setValueSearch }) => {

    const [ focusInput, setFocusInput ] = useState(false);
    const inputSearch = useRef<any>(null);

    const clickSearch = () => {
        inputSearch.current?.focus();
    }

    const focusSearch = () => {
        setFocusInput(true);
    }

    const blurSearch = () => {
        setFocusInput(false);
    }

    const changeValue = ( value: string ) => {
        setValueSearch(value);
    }

    return (
        <section className="areaSearch" style={focusInput ? {} : {
            padding: "8px 15px",
        }}>
            <div className="search" style={focusInput ? {} : {
                borderRadius: 20,
            }}>
                <div className="buttonSearch" style={ focusInput ? {
                    transform: "rotate(90deg)"
                } : {} }>
                    {
                        focusInput ? 
                            <FontAwesomeIcon icon={faArrowDown} size="lg" color="#9de0fd"/>
                        :
                            <div onClick={clickSearch}>
                                <FontAwesomeIcon icon={faSearch} size="sm" color="#919191" />
                            </div>
                    }
                </div>

                <input onChange={(e => changeValue(e.target.value))} ref={inputSearch} onFocus={focusSearch} onBlur={blurSearch} className="inputSearch" type="text" name="search" placeholder="Pesquisar ou começar uma nova conversa" />
            </div>
        </section>
    );
}

export default Search;