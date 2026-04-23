const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/send-email", async (req, res) => {
  const { name, email, date, time } = req.body;

  if (!email || !date || !time) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  // ── EMAIL TO ALFRED (DEVELOPER) ──────────────────────────────────────────
  const devEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
    body { margin: 0; padding: 0; background: #fff0f3; font-family: 'DM Sans', Arial, sans-serif; }
    .wrapper { max-width: 560px; margin: 40px auto; padding: 20px; }
    .card {
      background: white;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 8px 40px rgba(244,63,94,0.15);
    }
    .header {
      background: linear-gradient(135deg, #f43f5e, #e11d48);
      padding: 40px 32px;
      text-align: center;
    }
    .header h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      color: white;
      font-size: 36px;
      margin: 0 0 8px;
      font-weight: 400;
    }
    .header p { color: rgba(255,255,255,0.85); margin: 0; font-size: 14px; }
    .body { padding: 36px 32px; }
    .big-text {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 28px;
      color: #be123c;
      text-align: center;
      margin-bottom: 24px;
      line-height: 1.4;
    }
    .info-box {
      background: #fff0f3;
      border-left: 4px solid #f43f5e;
      border-radius: 12px;
      padding: 20px 24px;
      margin-bottom: 20px;
    }
    .info-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
    .info-row:last-child { margin-bottom: 0; }
    .label { color: #9f1239; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
    .value { color: #1f2937; font-size: 14px; font-weight: 500; }
    .footer { text-align: center; padding: 24px 32px; border-top: 1px solid #ffe4e8; }
    .footer p { color: #fb7185; font-size: 13px; margin: 0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <div style="font-size:48px;margin-bottom:12px;">🌹</div>
        <h1>She Said Yes!</h1>
        <p>Your message reached her heart, Alfred.</p>
      </div>
      <div class="body">
        <p class="big-text">"May I Finally Court You Properly?"<br/><span style="color:#f43f5e;">She said YES. ❤️</span></p>

        <div class="info-box">
          <div class="info-row">
            <span class="label">Her Name</span>
            <span class="value">Red 💕</span>
          </div>
          <div class="info-row">
            <span class="label">Her Email</span>
            <span class="value">${email}</span>
          </div>
          <div class="info-row">
            <span class="label">Date</span>
            <span class="value">${date} 📅</span>
          </div>
          <div class="info-row">
            <span class="label">Time</span>
            <span class="value">${time} 🕐</span>
          </div>
        </div>

        <p style="color:#6b7280;font-size:14px;text-align:center;line-height:1.6;">
          Now go plan the best dinner of your life.<br/>
          She's worth every detail. 🌹
        </p>
      </div>
      <div class="footer">
        <p>Sent from your confession game • Made with ❤️ by Alfred</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  // ── EMAIL TO RED (HER) ───────────────────────────────────────────────────
  const herEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
    body { margin: 0; padding: 0; background: #fff0f3; font-family: 'DM Sans', Arial, sans-serif; }
    .wrapper { max-width: 560px; margin: 40px auto; padding: 20px; }
    .card {
      background: white;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 8px 40px rgba(244,63,94,0.12);
    }
    .header {
      background: linear-gradient(160deg, #ffe4e8 0%, #ffd6e0 50%, #ffb3c6 100%);
      padding: 48px 32px 36px;
      text-align: center;
      position: relative;
    }
    .header h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      color: #9f1239;
      font-size: 38px;
      margin: 0 0 8px;
      font-weight: 400;
      font-style: italic;
    }
    .header p { color: #f43f5e; margin: 0; font-size: 14px; letter-spacing: 0.05em; }
    .body { padding: 40px 36px; }
    .letter-text {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 18px;
      color: #4b1f29;
      line-height: 1.9;
      margin-bottom: 28px;
    }
    .highlight-box {
      background: linear-gradient(135deg, #fff0f3, #ffe4e8);
      border: 2px solid #fda4af;
      border-radius: 16px;
      padding: 24px;
      text-align: center;
      margin-bottom: 28px;
    }
    .highlight-box .date {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 24px;
      color: #be123c;
      font-weight: 600;
      display: block;
      margin-bottom: 4px;
    }
    .highlight-box .time {
      font-size: 16px;
      color: #f43f5e;
    }
    .signature {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 22px;
      color: #9f1239;
      font-style: italic;
      text-align: right;
      margin-top: 32px;
    }
    .footer {
      background: #fff0f3;
      text-align: center;
      padding: 20px 32px;
      border-top: 1px solid #ffe4e8;
    }
    .footer p { color: #fb7185; font-size: 12px; margin: 0; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <div style="font-size:52px;margin-bottom:14px;">💌</div>
        <h1>Hello, Larrence.</h1>
        <p>A little something just for you.</p>
      </div>
      <div class="body">
        <div class="letter-text">
          <p>You just made me very happy.🥹👉👈</p>
          <p>
           Thank you for giving me the chance to court you properly and As I already told you personally, I will always make sure that you feel my love.
           <p>
           This time, I’ll make my intentions clear and official.
           </p>
          </p>
          <p>
            And now that you've said yes, I promise to ragebait you in every possibble moment hehe.
          </p>
        </div>

        <div class="highlight-box">
          <span style="font-size:13px;color:#9f1239;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:10px;">Our Date</span>
          <span class="date">${date}</span>
          <span class="time">🕐 ${time}</span>
        </div>  
        <div class="signature">
          See you soon,<br/>
          <strong>Alfred</strong> 
        </div>
      </div>
      <div class="footer">
        <p>
          © made with love by &lt;ReddishFreddish/&gt;<br/>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  try {
    // Send to Alfred
    await transporter.sendMail({
      from: `"Confession Game 💌" <${process.env.SENDER_EMAIL}>`,
      to: process.env.DEV_EMAIL,
      subject: "She said yes ❤️",
      html: devEmailHtml,
    });

    // Send to Red
    await transporter.sendMail({
      from: `"Alfred 🌹" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Thank you for playing, Larrence 🌹",
      html: herEmailHtml,
    });

    res.json({ success: true, message: "Emails sent! 💌" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Failed to send emails." });
  }
});

module.exports = router;
