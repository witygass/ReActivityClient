import io from 'socket.io-client';
import { serverURL } from '../lib/localvars.js';

const socket = io.connect(serverURL);

module.exports = socket;
