import { useEffect, useState } from 'react';

function Completion(props) {
  const [messageBody, setMessageBody] = useState('');
  const { stripePromise } = props;

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) => {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      console.log('Client Secret:', clientSecret); // Log clientSecret

      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      console.log('Payment Intent:', paymentIntent); // Log paymentIntent

      setMessageBody(error ? `> ${error.message}` : (
        <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
      ));
      console.log('Message Body:', messageBody); // Log messageBody
    });
  }, [stripePromise]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Thank you!</h1>
      <a href="/" className="text-blue-500 hover:underline">home</a>
      <div id="messages" role="alert" style={messageBody ? { display: 'block' } : {}} className="md:block bg-[#3f3fa5] text-[green] p-4 my-4 rounded-md text-lg">
        {messageBody}
      </div>
    </>
  );
}

export default Completion;
