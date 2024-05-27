import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faUsers, faCodeBranch, faCalendarAlt, faFire, faFileCode
} from '@fortawesome/free-solid-svg-icons';

const GitHubUserCard = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`https://api.github.com/users/${username}`);
        setUserData(userResponse.data);
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
        calculateLanguageStats(reposResponse.data);
        setStreak(Math.floor(Math.random() * 100)); // Mock streak for demonstration
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [username]);

  const calculateLanguageStats = (repos) => {
    const languageCount = repos.reduce((acc, repo) => {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
      return acc;
    }, {});
    setLanguages(Object.entries(languageCount).sort((a, b) => b[1] - a[1]));
  };

  if (!userData) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.card}>
      <UserProfile userData={userData} />
      <UserStats userData={userData} languages={languages} streak={streak} />
      <div style={styles.profileButton} onClick={() => window.open(userData.html_url, '_blank')}>
        View GitHub Profile
      </div>
    </div>
  );
};

const UserProfile = ({ userData }) => (
  <div style={styles.header}>
    <img src={userData.avatar_url} alt="avatar" style={styles.avatar} />
    <div style={styles.userInfo}>
      <h2 style={styles.name}>{userData.name || userData.login}</h2>
      <p style={styles.login}>@{userData.login}</p>
      {userData.bio && <p style={styles.bio}>{userData.bio}</p>}
    </div>
  </div>
);

const UserStats = ({ userData, languages, streak }) => (
  <div>
    <div style={styles.stats}>
      <StatItem icon={faCodeBranch} value={userData.public_repos} label="Repos" />
      <StatItem icon={faUsers} value={userData.followers} label="Followers" />
      <StatItem icon={faUser} value={userData.following} label="Following" />
      <StatItem icon={faFileCode} value={userData.public_gists} label="Gists" />
      <StatItem icon={faCalendarAlt} value={new Date(userData.created_at).toLocaleDateString()} label="Joined" />
    </div>
    <div style={styles.languages}>
      <h3>Top Languages</h3>
      {languages.map(([language, count]) => (
        <div key={language} style={styles.languageItem}>{language}: {count} repos</div>
      ))}
    </div>
    <div style={styles.streak}>
      <FontAwesomeIcon icon={faFire} /> <strong>Coding Streak:</strong> {streak} days
    </div>
  </div>
);

const StatItem = ({ icon, value, label }) => (
  <div style={styles.statItem}>
    <FontAwesomeIcon icon={icon} /> {value} {label}
  </div>
);

const styles = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '600px',
    margin: '40px auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
    color: '#333',
    textAlign: 'left',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  avatar: {
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    marginRight: '20px',
    border: '3px solid #007bff',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    margin: '0',
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#007bff',
  },
  login: {
    margin: '0',
    color: '#666',
    fontSize: '18px',
  },
  bio: {
    fontStyle: 'italic',
    marginTop: '10px',
    color: '#444',
  },
  stats: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  statItem: {
    flex: '1 1 45%',
    margin: '10px 0',
    backgroundColor: '#f1f1f1',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
    lineHeight: '1.4',
  },
  languages: {
    marginBottom: '20px',
  },
  languageItem: {
    backgroundColor: '#e3e3e3',
    padding: '8px',
    borderRadius: '8px',
    margin: '5px 0',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
  },
  streak: {
    textAlign: 'center',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '10px',
    backgroundColor: '#ffc107',
    color: '#333',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  profileButton: {
    display: 'block',
    width: '100%',
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
    margin: '20px 0',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#0056b3',
    }
  }
};

export default GitHubUserCard;
