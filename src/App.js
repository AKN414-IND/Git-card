import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import GitHubUserCard from './GitHubUserCard';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  return (
    <Router>
      <div style={styles.page}>
        <Header />
        <Main />
        <Footer />
      </div>
    </Router>
  );
}

const Header = () => (
  <header style={styles.header}>
    <h1 style={styles.headerTitle}>Git Profile Card</h1>
  </header>
);

const Main = () => {
  const location = useLocation();
  
  return (
    <div style={styles.container}>
      {location.pathname === '/' && <LandingPage />}
      <Routes>
        <Route path="/user/:username" element={<GitHubUserCard />} />
      </Routes>
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username) {
      navigate(`/user/${username}`);
    }
  };

  return (
    <div style={styles.landing}>
      <h2 style={styles.landingTitle}>Welcome to GitHub Profile Explorer</h2>
      <p style={styles.landingText}>Discover and visualize GitHub profiles with a detailed and user-friendly interface.</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Search</button>
      </form>
    </div>
  );
};

const Footer = () => (
  <footer style={styles.footer}>
    <p>© 2024 Git Profile Card. All rights reserved.</p>
  </footer>
);

const styles = {
  page: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  },
  header: {
    backgroundColor: '#20232a',
    color: '#61dafb',
    padding: '20px 0'
  },
  headerTitle: {
    fontWeight: '300',
    fontSize: '24px'
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px'
  },
  landing: {
    margin: 'auto',
    maxWidth: '600px',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  },
  landingTitle: {
    fontSize: '22px',
    color: '#20232a',
    marginBottom: '10px'
  },
  landingText: {
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '2px solid #ccc',
    borderRadius: '4px',
    width: 'calc(100% - 85px)',
    marginRight: '5px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#61dafb',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontWeight: 'bold'
  },
  footer: {
    padding: '10px 0',
    backgroundColor: '#20232a',
    color: '#61dafb'
  }
};

export default App;
