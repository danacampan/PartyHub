import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { dotSpinner } from 'ldrs';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

dotSpinner.register();

export default function PartyDetails() {
  const [party, setParty] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchParty = async () => {
      try {
        const token = localStorage.getItem('token');

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:5001/parties/${id}`,
          config
        );
        setParty(response.data);
        setLoading(false);
        console.log('List of parties:', party);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    if (id) {
      fetchParty();
    }
  }, [id]);

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
    <Row className="d-flex justify-content-center align-items-center mt-5">
      <Col xs={12} md={5} className="d-flex justify-content-center">
        <img
          src={party.photo}
          alt={party.name}
          width={400}
          height={400}
          className="mt-4"
          style={{ borderRadius: '15px' }}
        />
      </Col>
      <Col xs={12} md={5} className="mt-4">
        <ul className="list-group list-group-flush space-grotesk-normal party-list">
          <li className="list-group-item">{party.name}</li>
          <li className="list-group-item">{party.location}</li>
          <li className="list-group-item">
            <div className="d-flex justify-content-between">
              Guests:
              {party.guests && party.guests.length > 0 ? (
                <ul>
                  {party.guests.map((guest, index) => (
                    <li key={index}>{guest}</li>
                  ))}
                </ul>
              ) : (
                ' No guests yet'
              )}
              <Button className="button" variant="light">
                <Link
                  className="button-link space-grotesk-normal"
                  to={`/parties/${party._id}/guests`}
                >
                  Add Guests
                </Link>
              </Button>
            </div>
          </li>

          <li className="list-group-item">
            {new Date(party.date).toLocaleDateString()}
          </li>
          <li className="list-group-item"> {party.description}</li>
          <li className="list-group-item">{party.activities}</li>
          <li className="list-group-item">
            <div className="d-flex justify-content-between">
              Budget:
              {party.budget ? <p>{party.budget}</p> : ' No budget planned yet'}
              <Button className="button" variant="light">
                Add budget
              </Button>
            </div>
          </li>
        </ul>
      </Col>
    </Row>
  );
}
