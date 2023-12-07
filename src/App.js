import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react';
import {Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp} from 'firebase/firestore'
import { db } from './firebase-config';
import enviar from './imgs/send.png'

function App() {
  const[user, setUser] = useState('')
  const [newMensage, setNewMensage] = useState('')
  const [messages, setMessages] = useState([])
  
  const userName =  useRef(null)
  const mesagesRef = collection(db, "messages")
  
  const divRef = useRef(null);

  useEffect(() => {
    // Função para rolar a div para o final
    const scrollToBottom = () => {
      if (divRef.current) {
        divRef.current.scrollTop = divRef.current.scrollHeight;
      }
    };

    // Chama a função sempre que o componente for atualizado
    scrollToBottom();
  });

  useEffect(()=>{
    const queryMensages = query(mesagesRef, orderBy('createdAt'));
    const unsuscribe = onSnapshot(queryMensages, (snapshot)=>{
      let messages = []
      snapshot.forEach((doc)=>{
        messages.push({...doc.data(), id: doc.id})
      })
      setMessages(messages)
    })
    return ()=> unsuscribe()
  }, [])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(newMensage === '') return;
    await addDoc(mesagesRef,{
      text: newMensage,
      createdAt: serverTimestamp(),
      nick: user,
    })
    setNewMensage("")
  }
  
    return (
      <div className="App">
        {user === '' ? (
          <div className='nome'>
            <div className='nomeInf'>
              <label>Digite seu Nome:</label>
              <input type="text" placeholder='Seu Nome:' ref={userName}/>
              <button className='botao' onClick={()=> setUser(userName.current.value)}>Confirmar</button>
            </div>
          </div>
          ):(

          <div className='chat-app'>     
            <div className='contMens' ref={divRef}>
              {messages.map((mesage)=>
                <div>
                  <span style={
                      {
                      padding: '5px',
                      borderRadius: '5px', 
                      fontWeight: 'bold',
                      color: '#A5D1E1',
                      }
                      }>{mesage.nick}: </span>
                  <div className="mensagem" key={mesage.id}>
                    {mesage.text}
                  </div>
                </div>
              )
              }
            </div>
              <form className='formulario' onSubmit={handleSubmit}>
              <input 
              className='campoMensagem'
              type="text"
              placeholder='Mensagem'
              onChange={(e)=>setNewMensage(e.target.value)}
              value={newMensage}
              />
              <button type='submit' className='enviar '>
                <img className='imgEnviar' src={enviar} />
              </button>
            </form>
          </div>
        )}
      </div>
    );
}

export default App;
