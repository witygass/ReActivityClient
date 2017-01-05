import io from 'socket.io-client';
import { ngrokURL } from '../lib/localvars.js';

const socket = io.connect(ngrokURL);

module.exports = socket;
