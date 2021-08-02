/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51JJB80SDRpM2Qwe5V1DoDfVePuetvBuJBm5pdwplP7o4rHnhoO3k9k0eYqobtg8qugIIF6TYG6VvfmCL25zESsgl00Hw2wsIeC'
);

export const bookTour = async tourId => {
  try {
    console.log('going');
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
