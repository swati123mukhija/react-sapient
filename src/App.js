import React, { useEffect, useState } from 'react';
import './App.css';
import List from './components/list';
import withListLoading from './components/withListLoading';
function App() {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    space: null,
    loading: false
  });
  
  useEffect(() => {
    setAppState({ loading: true})
    const fetchData = async () => {
    const apiUrl = `https://api.spaceXdata.com/v3/launches?limit=100`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((space) => {
        setAppState({ loading: false, space: space});
      });      
}
  fetchData();
}, [setAppState]);
  
  return (
    <div className='App repo-container'>
        <ListLoading isLoading={appState.loading} space={appState.space}/>
    </div>
  );
}
export default App;
