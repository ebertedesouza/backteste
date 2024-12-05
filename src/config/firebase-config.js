import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function sendNotificationToDevice(token, message) {
  const payload = {
    notification: {
      title: 'Mesa excluída',
      body: message,
    },
  };

  try {
    const response = await admin.messaging().sendToDevice(token, payload);
    console.log('Notificação enviada:', response);
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
  }
}

export { sendNotificationToDevice };
