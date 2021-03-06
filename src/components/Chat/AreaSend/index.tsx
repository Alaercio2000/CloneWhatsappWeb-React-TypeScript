import { MdMood }  from 'react-icons/md';
import { FaPaperclip, FaMicrophone, FaPaperPlane } from 'react-icons/fa'
import "./styles.css";
import React, { useEffect, useRef, useState } from 'react';
import Database from '../../../database';

interface Props{
    contact_id: number,
    setChatList: Function,
    setMessages: Function,
    setActionMessage: Function,
}

const AreaSend : React.FC<Props> = ({ contact_id, setChatList, setMessages, setActionMessage }) => {

    const [ text, setText ]  = useState('');
    const [ width, setWidth ] = useState(window.innerWidth - 450)

    const refInputMessage = useRef<HTMLTextAreaElement | any>();

    useEffect(() => {
        setText('');
        refInputMessage.current?.focus();
    }, [contact_id]);

    const sendMessage = () => {
        if (text.replaceAll(/(\r\n|\n|\r)/gm, "").length > 0) {
            const database = new Database();

            database.insertMessage(text, contact_id);

            setText('');
            setChatList(database.getChatListAll());
            setMessages(database.getAllMessagesChat(contact_id).messages_all);
            setActionMessage(Date.now());
            setTimeout(() => refInputMessage.current?.focus(), 100);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth - 450);
        })
    }, []);

    return (
        <section className="areaSend" style={{
            width: width,
            maxWidth: 1550,
        }}>
            <div className="emogisLeft">
                <MdMood className="iconEmogi" />
                <FaPaperclip className="iconPaperClip" title="Anexar" />
            </div>

            <div className="areaInputMessage">
                <textarea ref={refInputMessage} className="inputMessage" placeholder="Digite uma mensagem" value={text} onChange={e => setText(e.currentTarget.value)} onKeyPress={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        sendMessage();
                        refInputMessage.current?.blur();
                    }
                }}></textarea>
            </div>

            <div className="emogiRight">
                {
                    text === "" ? 
                        <FaMicrophone className="iconMicrofone" />
                    :
                        <FaPaperPlane className="iconPaperPlane" onClick={sendMessage} />
                }
            </div>
        </section>
    );
}

export default AreaSend;