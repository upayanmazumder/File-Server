import { https } from "firebase-functions";
import qwikApp from './server/entry-firebase.js';


export const app = https.onRequest(qwikApp)
