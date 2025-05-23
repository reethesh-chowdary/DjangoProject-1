import React,{useState,useEffect, use} from 'react'
import axios from 'axios';
import './Footer.css'
function Footer() {
    const [instances, setInstances] = useState([]);
useEffect(() => {
    const fetchInstances = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/servers/');
            setInstances(response.data);
        } catch (error) {
            console.error('Error fetching instances:', error);
        }
    };
    fetchInstances();
}, []);
   return (
    <div className="container">
      <h2>Active Instances</h2>
      <table>
        <thead>
          <tr>
            <th>Servers</th>
            <th>IP Address</th>
            <th>Created</th>
            <th>Tag</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {instances.map((instance) => (
            <tr key={instance.id}>
              <td className="server">
                <div className="info">
                  <strong>{instance.name}</strong>
                  <p>{instance.description}</p>
                </div>
              </td>
              <td>{instance.ip_address}</td>
              <td>{instance.created_at}</td>
              <td>
                <span className={`tag ${instance.tagType}`}>{instance.tag}</span>
              </td>
              <td>{instance.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Footer