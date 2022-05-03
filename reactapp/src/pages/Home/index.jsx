import React, { useState, useEffect } from 'react';
import './styles.css'

import { Card } from '../../components/Card';

export function Home() {

  const [studentName, setStudentName] = useState('Gabriel');
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: '', avatar:''});

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
      async function fetchData(){
      const response = await fetch('https://api.github.com/users/gabrielviol');
      const data = await response.json();
      console.log("Dados = ", data);

      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
      }

    fetchData();

    
    /*fetch('https://api.github.com/users/gabrielviol')
      .then(response => response.json())
      .then(data => {
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        })
      })*/
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>

        <div>
          <strong>{user.name}</strong>
          <img src={ user.avatar } alt="Foto de perfil" />
        </div>
      </header>
      
      <input 
        type="text" 
        placeholder="Digite o nome..."
        onChange={ e => setStudentName(e.target.value) }
      />
      <button type="button" onClick={handleAddStudent}>Adicionar</button>

      {
        students.map(student => (
          <Card
            key={student.time} 
            name={student.name} 
            time={student.time}
          />
        ))
      }
    </div>
  )
}
