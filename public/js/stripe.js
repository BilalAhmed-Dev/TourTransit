/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51JQZpYINksYwImgGo56P9ZlgoNXqSMQIUXvTzG44mem0jWEk8E9tDME6gNEHVLThIzJXw4AgJtDUkoAhAuSPJuxG00RdKcxFuE'
);
export const bookTour = async (tourID) => {
  try {
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourID}`
    );
    console.log(session);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
