import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import axios from 'axios';

export default function AddPartyPage() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState(null);
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState('');
  const [activites, setActivities] = useState('');
  const [budget, setBudget] = useState(0);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  console.log('Stored user:', storedUser);
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file);
    setPhoto(file);
  };

  const postParty = async (formData) => {
    try {
      const response = await axios.post(
        'http://localhost:5001/parties/party',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Party saved:', response.data);
      const party = response.data;
      localStorage.setItem('party', JSON.stringify(party));
      setName('');
      setPhoto(null);
      setLocation('');
      setDate('');
      setDescription('');
      setActivities('');
      setBudget(0);
      navigate('/');
    } catch (error) {
      console.error(
        'Error posting party:',
        error.response?.data || error.message
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error('User not found. Please log in.');
      navigate('/auth');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('photo', photo);
    formData.append('date', date);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('activities', activites);
    formData.append('budget', budget);
    formData.append('user', user.userId);

    await postParty(formData);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div className="form-container blurry-background space-grotesk-normal px-4 py-4">
        <h2 className="my-30">Add new party</h2>
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label className="">Name</Form.Label>
            <Form.Control
              type="text"
              className=""
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="photos">
            <Form.Label className="">Choose photo</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label className="">Location</Form.Label>
            <Form.Control
              type="text"
              className=""
              placeholder="Enter location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="dateInput">
            <Form.Label>Select Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label className="">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formActivities">
            <Form.Label className="">Activities</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter activities"
              onChange={(e) => setActivities(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBudget">
            <Form.Label>Enter budget</Form.Label>
            <Form.Control
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter a number"
            />
          </Form.Group>
          <button
            type="submit"
            className=""
            style={{
              display: 'block',
              justifyContent: 'center',
              maxWidth: '13em',
              height: '40px',
            }}
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}
