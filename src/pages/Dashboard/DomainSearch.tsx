import React, { useState } from 'react';
import axios from 'axios';

interface DomainSearchProps {}

const DomainSearch: React.FC<DomainSearchProps> = () => {
  const [domain, setDomain] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
  };

  const checkDomainAvailability = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
        const options = {
            method: 'GET',
            url: `https://cors-anywhere.herokuapp.com/https://domain-availability.whoisxmlapi.com/api/v1`,
            params: { domain },
            headers: {
              'X-RapidAPI-Key': 'at_GfVJERRwdVlTTqHF2U58QEcehFxie',
              'X-RapidAPI-Host': 'domain-availability.whoisxmlapi.com',
            },
          };
          

      const response = await axios.request(options);
      const available = response.data.DomainInfo.domainAvailability === 'AVAILABLE';
      setResult(available ? 'Domain is available!' : 'Domain is taken.');
    } catch (error) {
      setError('Error checking domain availability');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain) {
      checkDomainAvailability();
    }
  };

  return (
    <div className="domain-search">
      <form onSubmit={handleSearch} className="domain-search-form">
        <input
          type="text"
          placeholder="Enter domain name"
          value={domain}
          onChange={handleDomainChange}
          className="domain-input"
        />
        <button type="submit" disabled={loading} className="search-button">
          {loading ? 'Searching...' : 'Search Domain'}
        </button>
      </form>

      {result && <div className="result">{result}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default DomainSearch;
