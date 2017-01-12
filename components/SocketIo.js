import io from 'socket.io-client';
import { baseUrl } from '../lib/localvars.js';

const socket = io.connect(baseUrl);

module.exports = socket;
