const axios = require('axios');
const { TIMEOUT } = process.env;

module.exports = (baseUrl) => {
    return axios.create({
        baseUrl: baseUrl,
        timeout: parseInt(TIMEOUT)
    });
}