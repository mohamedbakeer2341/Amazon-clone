import nodemailer from 'nodemailer';


export const sendEmail = async ({to,subject,html})=>{
    const transport = nodemailer.createTransport({
        host: "localhost",
        port: 465,
        secure: true,
        service:"gmail",
        auth: {
            user: 'mohamedbakeer2341@gmail.com',
            pass: 'pdhcqryhzlccqbex',
        },
    })
    const info = await transport.sendMail({
        from:`EcommerceRoute <${process.env.EMAIL}>`,
        to,
        subject,
        html,
    })
    return info.accepted.length < 1 ? false : true;

}