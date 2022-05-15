import React from 'react';
import './App.css';
import PageLayout from './components/layout/page-layout';
import Users from './pages/users';
function App() {
  return (
    <PageLayout>
      <Users/>
    </PageLayout>
  );
}

export default App;
