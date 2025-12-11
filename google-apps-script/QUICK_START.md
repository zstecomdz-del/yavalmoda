# Quick Start Guide - Gmail Order Notifications

## What You Need

1. A Gmail account
2. The Google Apps Script code (already created in `Code.gs`)
3. 10 minutes to set it up

## Setup Steps (Simple Version)

### 1. Open Google Apps Script
- Go to https://script.google.com/
- Sign in with your Gmail account
- Click "New Project"

### 2. Paste the Code
- Delete any existing code
- Open `Code.gs` from this folder
- Copy ALL the code
- Paste it into the Google Apps Script editor

### 3. Set Your Email
Find this line in the code:
```javascript
const EMAIL_RECIPIENT = 'your-email@gmail.com';
```
Change `your-email@gmail.com` to your actual Gmail address.

### 4. Deploy
- Click "Deploy" button (top right)
- Choose "New deployment"
- Click the gear icon, select "Web app"
- Set:
  - Execute as: **Me**
  - Who has access: **Anyone**
- Click "Deploy"
- Click "Authorize access" when asked
- Choose your account
- If you see a warning, click "Advanced" then "Go to ... (unsafe)"
- Click "Allow"

### 5. Copy Your URL
You'll see a URL like:
```
https://script.google.com/macros/s/AKfycby...XYZ/exec
```
**COPY THIS URL!**

### 6. Update Your Website
- Open `src/components/OrderForm.jsx`
- Find line 96:
```javascript
const GOOGLE_SCRIPT_URL = 'PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE'
```
- Replace `'PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE'` with your URL (keep the quotes!)
- Save the file

### 7. Test It!
- Run your website
- Submit a test order
- Check your Gmail inbox

## That's It!

Your order form now sends emails to your Gmail automatically.

## Troubleshooting

**Not receiving emails?**
- Check your spam folder
- Make sure you replaced the URL correctly
- Check the browser console for errors (F12)

**Still not working?**
- See `SETUP_INSTRUCTIONS.md` for detailed troubleshooting
- Check "Executions" tab in Google Apps Script for errors

## Optional: Keep WhatsApp Too

If you want BOTH email and WhatsApp notifications:

1. Open `src/components/OrderForm.jsx`
2. Find the commented WhatsApp code (around line 210-236)
3. Remove the `/*` and `*/` to uncomment it
4. Save the file

Now orders will be sent to both Gmail AND WhatsApp!
