import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: 'ap-south-1',
})

const ses = new AWS.SES({ apiVersion: '2010-12-01' })

// Note
// SES is still in sandbox mode so it can sent email only to verified users. if set to production can send it anyuser
const sendEmail = async (email) => {
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Data: 'Your Booking is SuccessFully Completed.',
        },
      },
      Subject: {
        Data: 'Booking Confirmation',
      },
    },
    Source: 'prathamesh06pt@gmail.com',
  }
  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.log('Error:', err)
    } else {
      console.log('Email sent successfully:', data)
    }
  })
}

export default sendEmail
