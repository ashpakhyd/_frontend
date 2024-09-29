import axios from 'axios';

export default async function handler(req, res) {
  const { gstin } = req.query;

  try {
    const response = await axios.get(
      `https://apisetu.gov.in/gstn/v1/gstin/details/${gstin}`,
      {
        headers: {
          'x-api-key': process.env.API_SETU_KEY, // Use an environment variable for your API key
          'Accept': 'application/json',
        },
      }
    );
    
    res.status(200).json(response.data);  // Return the data to the frontend
  } catch (error) {
    console.error('Error fetching GSTIN details:', error.message);
    res.status(500).json({ message: 'Error fetching GSTIN details' });
  }
}
