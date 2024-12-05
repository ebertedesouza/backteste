const admin = require('firebase-admin');
const serviceAccount = require('./pizzariaapp-4662b-firebase-adminsdk-myun3-da0f4283cb.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function sendNotificationToDevice(token, mesaNumero) {
  const payload = {
    notification: {
      title: 'Mesa excluída',
      body: `A mesa número ${mesaNumero} foi excluída.`,
    },
  };

  try {
    const response = await admin.messaging().sendToDevice(token, payload);
    console.log('Notificação enviada:', response);
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
  }
}

module.exports = { sendNotificationToDevice };
