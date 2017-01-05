import io from 'socket.io-client';
<<<<<<< 8252161a86053ffd7b3dc1662fc848c2d94cf23e
import { ngrokURL } from '../lib/localvars.js';
const socket = io.connect(ngrokURL);
=======
const socket = io.connect(' http://652f4185.ngrok.io');
>>>>>>> Integrate socketIO with ngrok

module.exports = socket;
