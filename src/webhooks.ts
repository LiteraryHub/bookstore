import express from "express";
import { getPayloadClient } from "./get-payload";
import { stripe } from "./lib/stripe";
import { WebhookRequest } from "./server";
import type Stripe from "stripe"
import { Product } from "./payload-types";
import {Resend} from "resend"
import { ReceiptEmailHtml } from "./components/emails/ReceiptEmail";
import nodemailer from 'nodemailer';


const resend = new Resend(process.env.RESEND_API_KEY)

export const stripeWebhookHandler = async (
  req: express.Request,
  res: express.Response
) => {
  const webhookRequest = req as any as WebhookRequest;
  const body = webhookRequest.rawBody;
  const signature = req.headers["stripe-signature"] || "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || "whsec_1605ee2c761f218fe336b8f195e09f3160146c5854a9ff92ff18b9884d8867da"
    );
  } catch (err) {
    return res
      .status(400)
      .send(
        `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`
      );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session?.metadata?.userId || !session?.metadata?.orderId) {
    return res.status(400).send(`Webhook Error: No user present in metadata`);
  }

  if (event.type === "checkout.session.completed") {
    const payload = await getPayloadClient();

    const { docs: users } = await payload.find({
      collection: "users",
      where: {
        id: {
          equals: session.metadata.userId,
        },
      },
    });

    const [user] = users;

    if (!user) return res.status(404).json({ error: "No such user exists." });

    const { docs: orders } = await payload.find({
      collection: "orders",
      depth: 2,
      where: {
        id: {
          equals: session.metadata.orderId,
        },
      },
    });

    const [order] = orders;

    if (!user) return res.status(404).json({ error: "No such order exists." });

    await payload.update({
      collection: "orders",
      data: {
        _isPaid: true,
      },
      where: {
        id: {
          equals: session.metadata.orderId,
        },
      },
    });

    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      service: "gmail",
    
      auth: {
        user: "shokra19@gmail.com",
        pass: process.env.MAILER_TRANSPORTER_KEY,
      },
    });
    
    // send receipt
    try {
      const data = await transporter.sendMail({
        from: "LiteraryHub <shokra19@gmail.com>",
        to: [user.email],
        subject: "Thanks for your order! This is your receipt.",
        text: "",
        html: ReceiptEmailHtml({
          date: new Date(),
          email: user.email,
          orderId: session.metadata.orderId,
          products: order.products as Product[],
        }),
      });
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  return res.status(200).send();
};
