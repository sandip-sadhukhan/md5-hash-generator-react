import './App.css';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// https://api.hashify.net/hash/md5/hex?value=helloWorld

function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [hash, setHash] = useState('');
  const [copied, setCopied] = useState(false);


  const generateHash = async () => {
    setResult(false)
    setLoading(true);
    const res = await fetch(`https://api.hashify.net/hash/md5/hex?value=${input}`);
    const data = await res.json();
    let hash = data['Digest'];
    setLoading(false);
    setHash(hash)
    setCopied(false)
    setResult(true)
  }




  return (
    <div className="container mt-2">
      <h1 className=" display-4 text-center">MD5 Hash Generator</h1>
      <p className="small mb-3 text-center">Developed by Sandip Sadhukhan</p>
      <div className="row">
        <div className="col-md-8 col-sm-12 mx-auto">
          <textarea value={input} className="form-control text-white" rows="9" placeholder="Enter your text..." onChange={e => setInput(e.target.value)} autoFocus></textarea>
          <button className="btn btn-info btn-lg my-3" onClick={generateHash}>Generate</button>
          {/* Preloader */}
          <br />
          {loading ?
            <div className="spinner-border text-white mb-3" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            : null}

          {/* Result */}
          {result ?

            <section>
              <p className="lead text-white">Your Hash : <span className="text-warning">{hash}</span>
                <CopyToClipboard text={hash}
                  onCopy={() => setCopied(true)}>
                  <button className="btn btn-primary ml-3">{copied? "Copied":"Copy"}</button>
                </CopyToClipboard>
              </p>
            </section>
            : null}
        </div>
      </div>
    </div>
  );
}

export default App;
