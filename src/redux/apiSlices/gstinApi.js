import axios from 'axios';

const getGSTINDetails = async (gstin) => {
    try {
        const response = await axios.get(`https://api.cleartax.in/v1/gstin/details?gstin=${gstin}`, {
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_CLEARTAX_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('GSTIN Details:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching GSTIN details:', error);
        return null;
    }
};

export default getGSTINDetails;
