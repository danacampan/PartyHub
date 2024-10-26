import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function AddGuestsPage() {
  const { id } = useParams();
  const [guestEmail, setGuestEmail] = useState('');

  const addGuests = async () => {
    try {
      await axios.post(`http://localhost:5001/parties/${id}/guests`, {
        email: guestEmail,
      });
      alert('Guest added successfully!');
      setGuestEmail('');
    } catch (error) {
      console.error('Error adding guest:', error);
      alert('Failed to add guest. Please try again.');
    }
  };

  return (
    <div>
      <h1 className="space-grotesk-normal text-white mb-5 mt-3">
        Add Guests to Party
      </h1>
      <input
        type="email"
        placeholder="Enter guest's email"
        value={guestEmail}
        onChange={(e) => setGuestEmail(e.target.value)}
      />
      <button onClick={addGuests}>Add Guest</button>
    </div>
  );
}
