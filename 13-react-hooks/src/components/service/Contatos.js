import React, { useState, useEffect } from 'react';

const firebaseURL = 'https://ppgti1003-default-rtdb.firebaseio.com/contacts.json';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contacts, setContacts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const newContact = { name, email, phone };

    try {
      const response = await fetch(firebaseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });

      if (response.ok) {
        alert('Contato cadastrado com sucesso!');
        setName('');
        setEmail('');
        setPhone('');
        fetchContacts(); // Atualizar lista de contatos
      } else {
        alert('Erro ao salvar o contato.');
      }
    } catch (error) {
      alert('Houve um problema na comunicação com o servidor.');
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch(firebaseURL);
      if (response.ok) {
        const data = await response.json();
        const parsedContacts = Object.keys(data || {}).map((key) => ({
          id: key,
          ...data[key],
        }));
        setContacts(parsedContacts);
      } else {
        alert('Erro ao carregar os contatos.');
      }
    } catch (error) {
      alert('Houve um problema na comunicação com o servidor.');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Cadastro de Contatos</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nome</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>E-mail</label>
          <input
            style={styles.input}
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Telefone</label>
          <input
            style={styles.input}
            type="tel"
            placeholder="Digite seu telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button type="submit" style={styles.button}>
          Cadastrar
        </button>
      </form>

      <h2 style={styles.listTitle}>Contatos Registrados</h2>
      <ul style={styles.list}>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <li key={contact.id} style={styles.contactItem}>
              <p>Nome: {contact.name}</p>
              <p>E-mail: {contact.email}</p>
              <p>Telefone: {contact.phone}</p>
            </li>
          ))
        ) : (
          <p style={styles.emptyList}>Nenhum contato registrado.</p>
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  listTitle: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#333',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  contactItem: {
    backgroundColor: '#e9ecef',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  emptyList: {
    textAlign: 'center',
    color: '#555',
    marginTop: '20px',
  },
};

export default App;