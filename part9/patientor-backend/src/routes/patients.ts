/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import toNewPatientEntry from '../../utils';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;