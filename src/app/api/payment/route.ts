
import { error } from 'console';
import { NextRequest, NextResponse } from 'next/server';
import paypal from 'paypal-rest-sdk';

paypal.configure({
  'mode': process.env.PAYPAL_MODE || 'sandbox',
  'client_id': process.env.PAYPAL_CLIENT_ID || '',
  'client_secret': process.env.PAYPAL_CLIENT_SECRET || ''
});


export async function POST(req: NextRequest) {
  try {
    const body=await req.json();
    const subTotal=await body.subTotal;

    if(!subTotal  || subTotal<=0){
      return NextResponse.json({
        message:"Invalid subTotal"
      },{
        status:400
      })
    }


    const create_payment_json: paypal.Payment = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: '/',
        cancel_url: '/addToCart',
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: 'Your Cart Item',
                sku: 'cart',
                price: subTotal.toFixed(2),
                currency: 'USD',
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: 'USD',
            total: subTotal.toFixed(2),
          },
          description: 'Payment for items in cart.',
        },
      ],
    };

    
    return new Promise((resolve) => {
      paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
          console.error('PayPal payment creation error:', error.response);
          resolve(NextResponse.json({ error: 'Error creating PayPal payment', details: error.response }, { status: 500 }));
        } else {
          if (payment && payment.links) {
            const approvalUrl = payment.links.find((link) => link.rel === 'approval_url');
            if (approvalUrl) {
              resolve(NextResponse.json({ approvalUrl: approvalUrl.href }));
            }
          } else {
            resolve(NextResponse.json({ error: 'No approval URL found in PayPal payment' }, { status: 500 }));
          }
        }
      });
    });
  } catch (error) {
    console.error('Error initiating payment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
