const axios = require("axios")
const moment = require("moment")
const crypto = require("crypto")

const AppError = require("../utils/AppError")

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

//Encrypting text
function encrypt(text) {
    let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
}

// Decrypting text
function decrypt(text) {
    let iv = Buffer.from(text.iv, "hex");
    let encryptedText = Buffer.from(text.encryptedData, "hex");
    let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
// generate and return otp
function generateOTP() {
    // Declare a digits variable
    // which stores all digits
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

// sending messages
async function sendSingleSms(text, mobile) {
    return await axios.post(
      "http://weapi.connekio.com/sms/single",
      {
        account_id: 1532,
        text: text,
        msisdn: "2" + mobile,
        sender: "helpoo",
      },
      {
        headers: {
          Authorization: "Basic MTEwMjEzNTQ5NTA6K3llVz9HZV5DLitac0xmOjE1MzI=",
        },
      }
    );
}


class SendingSms {
    async sendOtp(mobileNumber){
        // check mobile Number
        if(!mobileNumber) return new AppError("Provide phone number",400)
        if(mobileNumber.length !== 11 ) return new AppError("Provide valid number",400)
        try {
            // generate and send the OTP
            const otp = generateOTP()
            await sendSingleSms(
                "الرقم التعريفي لبرنامج هيلبو " + otp , mobileNumber
            )
            return {
            // encrypt the message to check from it
                message: encrypt(
                    moment().format("yyyy-mm-dd hh:mm:ss A") + "," + mobileNumber + "," + otp
                    ),
                    created_at: moment().toISOString(),
                  };
        } catch (error) {
            console.log(error)
            return new AppError(error.message,500)

        }
    }
    
    async verifyOtp(body){
        const encryptedMessage = body.message
        const mobileNumber = body.mobileNumber
        const otp = body.otp
        // check no missing data
        if(!otp || !mobileNumber || !encryptedMessage || !encryptedMessage.iv || !encryptedMessage.encryptedData) return new AppError("missing data",400)
        
        try {
          // decrypt the message
          let message = decrypt(encryptedMessage)
          // split to get the data
          let messageArray = message.split(",")
          let mobile = messageArray[1]
          let sentOtp = messageArray[2]
          // get current time to check time valid
          const dateNow = moment(messageArray[0],"yyyy-mm-dd hh:mm A")
          if(dateNow.isBefore(moment().subtract("60","minutes"))) return new AppError("OTP has expired",400)
          if (mobileNumber !== mobile || sentOtp !== otp) return new AppError("Invalid OTP",400)
          
          return {message:"OK"}
          
        } catch (err) {
          console.log(err);
          return new AppError(err.message,400)

        }
    }
    
    async sendSms({mobile,message}){
      if(!mobile || !message || mobile.length !== 11) return new AppError("Invalid mobile number or message",400)
      
      try {
      console.log("Try");
        const res = await sendSingleSms(message,mobile)
        console.log("after res")
        console.log(res);
        if(!res || res.status !== 200) return new AppError("invalid response",400)
        return res.data
      
      } catch (error) {
         console.log(error);
         return new AppError(error.message,400)
      }
    }
    // async resetPassword(body){
    // }
}


const smsService = new SendingSms()

module.exports = smsService