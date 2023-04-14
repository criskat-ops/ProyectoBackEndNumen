const axios = require('axios');

const axiosController = {

    randomUser : async (req, res) =>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://random-data-api.com/api/v2/users',
            headers: { }
          }
          
          await axios.request(config)
          .then((response) => {
            res.status(201).json(response.data)
            //console.log(JSON.stringify(response.data))
          })
          .catch((error) => {
            res.status(401).json(error)
            //console.log(error);
          })
    }

}

module.exports = axiosController

