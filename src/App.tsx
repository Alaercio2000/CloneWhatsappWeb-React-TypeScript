import { useEffect, useState } from 'react';

import Aside from './components/Aside';
import Chat from './components/Chat';

import './App.css';

import IGetChat from './interfaces/IGetChat';

import Database from './database';


export default function App() {

  const [ contactId, setContactId ] = useState(0);
  const [ chatList, setChatList ] = useState<IGetChat[]>(); 

  useEffect(() => {
    const database = new Database();
    const chatListAll = database.getChatListAll();
    setChatList(chatListAll);
  }, []);

  return(
    <div className="container">

      <Aside setContact={setContactId} chatList={chatList} setChatList={setChatList} />

      <Chat contact_id={contactId} setChatList={setChatList}/>
      
    </div>
  );
}