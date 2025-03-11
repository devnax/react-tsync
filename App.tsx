import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useAsync } from './src';

const Async = () => {
  const [id, setId] = useState(1)
  const { data, isLoading, error, reload } = useAsync(fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => response.json()), [id])
  if (isLoading) return <>Loading...</>
  if (error) return <>Error: {error.message}</>

  return <>
    <p>{data.body}</p>
    <button onClick={() => setId(id + 1)}>Random Post</button>
  </>
}



const App = () => {
  return (
    <div style={{ fontFamily: 'monospace,math, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <div style={{ marginTop: "50px" }}>
        <Async />
      </div>
    </div>
  );
}
const rootEle = document.getElementById('root')
if (rootEle) {
  const root = createRoot(rootEle);
  root.render(<App />);
}
