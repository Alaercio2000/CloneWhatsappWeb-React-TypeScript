import React, { useEffect, useState } from 'react';

import IContact from '../../interfaces/IContact';
import IMessage from '../../interfaces/IMessage';

import './styles.css';
import ImgDefault from '../../assets/img/imgChatNone.jpg'

import Database from '../../database';

import Header from './Header';
import ListMessage from './ListMessages';
import AreaSend from './AreaSend';

interface Props{
    contact_id: number,
    setChatList: Function
}

const Chat: React.FC<Props> = ({ contact_id, setChatList }) => {
    const [ messages, setMessages ] = useState<IMessage[]>([]);
    const [ contactInfo, setContactInfo ] = useState<IContact>();
    const [ actionMessage, setActionMessage ] = useState(0);

    useEffect(() => {
        const database = new Database();

        const res = database.getAllMessagesChat(contact_id);
        setMessages(res.messages_all);
        setContactInfo(res.contact_info);

        database.readMessages(contact_id);

        setChatList(database.getChatListAll());
        setActionMessage(Date.now());
    }, [ contact_id, setChatList ]);

    return (
        <section className="chatContainer">
            { 
                contact_id > 0 ? 
                    <div className="areaChat">
                        <Header contactInfo={contactInfo} />

                        <ListMessage messages={messages} actionNewMessage={actionMessage} />

                        <AreaSend contact_id={contact_id} setChatList={setChatList} setMessages={setMessages} setActionMessage={setActionMessage} />
                    </div>
                :
                    <div className="areaDefault">
                        <div className="default">
                            <div className="backImg" style={{
                                backgroundImage: `url(${ImgDefault})`
                            }}>
                            </div>
                            <h1>Mantenha seu celular conectado</h1>
                            <p>O WhatsApp conecta ao seu telefone para sincronizar suas mensagens. Para reduzir o uso de dados, conecte seu telefone a uma rede Wi-Fi.</p>
                        </div>
                    </div>
            }
        </section>
    );
}

export default Chat;