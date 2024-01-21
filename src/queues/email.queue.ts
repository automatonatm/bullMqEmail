import Bull, { JobOptions } from "bull";
import dotenv from "dotenv";
import emailProcess from "./email.process";

import {} from "bull-board";
dotenv.config();

const { REDIS_HOST, REDIS_PORT } = process.env;

const queueOptions: Bull.QueueOptions = {
  redis: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
  },
  prefix: "email-queue",
};

const emailQueue = new Bull("email", queueOptions);

emailQueue.process(emailProcess);

export const sendEmail = (data?: any) => {
  const options: JobOptions = {
    attempts: 2,
    removeOnComplete: true,
    repeat: {
      cron: "*/10 * * * * *",
    },
  };
  emailQueue.add(data, options);

  emailQueue.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
  });

  emailQueue.on("error", (err) => {
    console.log(err);
  });

  emailQueue.on("failed", (job, err) => {
    console.log(`Job ${job.id} failed with error ${err.message}`);
  });
};

export const consumer = () => {
  sendEmail();
};
