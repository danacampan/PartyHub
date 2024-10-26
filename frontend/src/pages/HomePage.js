import { useEffect, useState } from 'react';
import axios from 'axios';
import { dotSpinner } from 'ldrs';
import { Card, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

dotSpinner.register();

export default function HomePage() {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const party = localStorage.getItem('party');

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/parties/`);
        setParties(response.data);
        setLoading(false);
      } catch {
        console.log('Error fetching parties');
        setLoading(false);
      }
    };
    fetchParties();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <l-dot-spinner size="60" speed="0.9" color="white"></l-dot-spinner>
      </div>
    );
  }

  return (
    <Row className="px-4">
      <h2 className="space-grotesk-normal text-white mb-5 mt-3">My parties</h2>
      {parties.map((party) => (
        <Col key={party._id} md={3} className="mb-4">
          <Card className="party-card glow-border">
            <Link to={`/parties/${party._id}`}>
              <Card.Img
                variant="top"
                src={party.photo}
                alt={party.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
            </Link>
            <Card.Body>
              <Card.Title>{party.name}</Card.Title>
              <Row>
                <Col>
                  <i className="fa-solid fa-map-pin"></i>
                  <Card.Subtitle className="text-secondary">
                    {party.location}
                  </Card.Subtitle>
                  <Card.Text className="text-secondary space-grotesk-normal">
                    {new Date(party.date).toLocaleDateString()}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
