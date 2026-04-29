import React from 'react';
import Form from './components/Form';
import MessageList from './components/MessageList';
import './App.css';

function App() {
  return (
    <div className='app'>
      <div className='container'>
        <div className='shape1'></div>
        <div className='shape2'></div>
        <Form />
      </div>
      <MessageList />
    </div>
  )
}

export default App