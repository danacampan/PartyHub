import multer from 'multer';
import Party from '../models/partySchema.js';
import authMiddleware from '../utils.js';
import express from 'express';

const partyRouter = express();

partyRouter.get('/', async (req, res) => {
  try {
    const parties = await Party.find({});
    res.send(parties);
  } catch {
    res.status(500).send('Error fetching parties');
  }
});

const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024;
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    const mimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (mimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type must be jpeg, png, or gif.'));
    }
  },
});

partyRouter.post('/:id/guests', async (req, res) => {
  const { partyId } = req.params;
  const { email } = req.body;

  try {
    const party = await Party.findById(partyId);
    if (!party) return res.status(404).send({ message: 'Party not found' });

    party.guests.push({ email });
    await party.save();

    res.status(200).send({ message: 'Guest added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error adding guest' });
  }
});

partyRouter.post(
  '/party',
  upload.single('photo'),
  authMiddleware,
  async (req, res) => {
    try {
      const { name, date, location, description, activities, budget } =
        req.body;
      const photo = req.file;

      if (!photo) {
        return res.status(400).send('No photo uploaded.');
      }

      const newParty = new Party({
        name,
        photo: `data:image/jpeg;base64,${photo.buffer.toString('base64')}`,
        date,
        location,
        description,
        activities,
        budget,
        user: req.user.userId,
      });
      const savedParty = await newParty.save();
      res.send(savedParty);
    } catch {
      res.status(500).send('Error posting party');
    }
  }
);

partyRouter.get('/:id', authMiddleware, async (req, res) => {
  const party = await Party.findById(req.params.id);
  if (party) {
    res.send(party);
  } else {
    res.status(404).send('List not found');
  }
});

export default partyRouter;
