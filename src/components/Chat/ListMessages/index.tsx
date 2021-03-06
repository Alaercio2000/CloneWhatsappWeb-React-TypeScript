import React, { useEffect, useRef, useState } from 'react';
import IMessage from '../../../interfaces/IMessage';

import { FaCaretDown } from 'react-icons/fa';

import './styles.css';

import BackImg from '../../../assets/img/background-chat.png';

interface Props{
    messages: IMessage[],
    actionNewMessage: number,
}

const ListMessages: React.FC<Props> = ({ messages, actionNewMessage }) => {

    const [ height, setHeight ] = useState(window.innerHeight - 130);
    const [ width, setWidth ] = useState(window.innerWidth - 450);

    const refListMessages = useRef<HTMLDivElement | any>();

    const scrollBottomList = () => {
        const scroll = refListMessages.current?.scrollHeight - refListMessages.current?.clientHeight;
        refListMessages.current?.scrollTo(0, scroll);
    };

    useEffect(() => {
        window.addEventListener("resize", () => {
            setHeight(window.innerHeight - 130);
            setWidth(window.innerWidth - 450);
        });
    }, []);

    useEffect(() => {
        scrollBottomList();
    }, [ actionNewMessage ]);


    interface IPropsFormatText{
        text: string
    }

    const FormatText: React.FC<IPropsFormatText> = ({ text }) => {
        const textFormat = text.split("\n");
        return(
            <span>
                {textFormat.map(item => (
                    <p key={item.replaceAll(" ", "") + Math.floor(Math.random() * 1000)} className="textFormat">
                        {item}
                    </p>
                ))}
            </span>
        );
    }

    return(
        <main id="mainId" style={{
            width: width,
            height: height,
            maxWidth: 1550,
        }}>
            <div className="backColor"></div>
            <div className="backImgChat" style={{ backgroundImage : `url(${BackImg})`}}></div>
            <div ref={refListMessages} className="listMessages">
                {
                    messages.map(item => (
                            <div key={item.id} className={item.send === 0 ? "notSend" : "send"}>
                                {
                                    item.send === 0 ? <FaCaretDown className="caretNotSend" /> : <></>
                                }
                                <div className={item.send === 0 ? "areaMsgNotSend" : "areaMsgSend"}>
                                    <FormatText text={item.text} />
                                </div>
                                {
                                    item.send === 1 ? <FaCaretDown className="caretSend" /> : <></>
                                }
                            </div>
                    ))
                }
            </div>
        </main>
    );
}

export default ListMessages;