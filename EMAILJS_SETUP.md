# EmailJS Setup Instructions

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up with your email (hussainahm041@gmail.com)
3. Verify your email

## Step 2: Add Email Service
1. Go to "Email Services" in dashboard
2. Click "Add New Service"
3. Choose "Gmail" 
4. Connect your Gmail account (hussainahm041@gmail.com)
5. Note the SERVICE_ID (e.g., "service_abc123")

## Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Subject:** New Contact Form Message from {{from_name}}

**Content:**
```
Hello Hussain,

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent from your portfolio website
```

4. Save and note TEMPLATE_ID (e.g., "template_xyz789")

## Step 4: Get Public Key
1. Go to "Account" > "General"
2. Copy your PUBLIC_KEY (e.g., "user_abcdefghijk")

## Step 5: Update Code
Replace these values in script.js:

```javascript
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your public key
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

**Example:**
```javascript
emailjs.init('user_abcdefghijk');
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

## Step 6: Test
1. Fill out contact form on your website
2. Check your email (hussainahm041@gmail.com)
3. You should receive the message!

## Free Tier Limits
- 200 emails/month
- Perfect for portfolio contact form

## Troubleshooting
- Check browser console for errors
- Verify all IDs are correct
- Make sure Gmail service is connected
- Check spam folder for test emails