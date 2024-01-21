import { Job } from "bull";
import nodemailer from 'nodemailer'

const emailProcess = async (job: Job) => {

    const {
        from,
        to,
        subject,
        html
    } = job.data

   const transporter = nodemailer.createTransport({
     host: "sandbox.smtp.mailtrap.io",
     port: 2525,
     auth: {
       user: "d552d331f080fd",
       pass: "56f40fdf965d12",
     },
   });

   
   const info = await transporter.sendMail({
     from: `"Fred Foo 👻" <jons@mail.com>`, // sender address
     to: "bar@example.com, baz@example.com", // list of receivers
     subject: "Hello ✔", // Subject line
     text: "Hello world?", // plain text body
     html: "<b>Hello world?</b>", // html body
   }).catch((error) => {
     throw new Error(error)
   });

   console.log("Message sent: %s", info.messageId);

  console.log(job.data);
};

export default emailProcess;
