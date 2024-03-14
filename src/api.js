const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
const port = 5000;


app.use(bodyParser.json());

// SQL Server configuration
const config = {
  user:'shruzzPC22',
  password: '',
  server: 'shruzzPC22',
  database:'USERS',
};


const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();


app.post('/api/register', async (req, res) => {
  const formData = req.body;

  
  try {
    await poolConnect;
    const request = pool.request();

    
    await request.query(`
      INSERT INTO USERS (firstName, lastName, phoneNo, email, nationalId, addressType, addressLine1, addressLine2, addressLine3, city, state, pincode)
      VALUES (
        '${formData.firstName}',
        '${formData.lastName}',
        '${formData.phoneNo}',
        '${formData.email}',
        '${formData.nationalId}',
        '${formData.address.addressType}',
        '${formData.address.addressLine1}',
        '${formData.address.addressLine2}',
        '${formData.address.addressLine3}',
        '${formData.address.city}',
        '${formData.address.state}',
        '${formData.address.pincode}'
      )
    `);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
