# Google Apps Script Setup Instructions

Follow these steps to set up email notifications for your order form.

## Step 1: Create the Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Click **"New Project"**
3. Delete any default code
4. Copy the entire contents of `Code.gs` file
5. Paste it into the script editor
6. Click the file name (usually "Untitled project") and rename it to **"YA VALMODA Order Handler"**

## Step 2: Configure Your Email

1. In the script, find this line:
   ```javascript
   const EMAIL_RECIPIENT = 'your-email@gmail.com';
   ```
2. Replace `'your-email@gmail.com'` with your actual Gmail address

## Step 3: Deploy as Web App

1. Click **"Deploy"** > **"New deployment"** in the top right
2. Click the gear icon next to "Select type" and choose **"Web app"**
3. Fill in the deployment settings:
   - **Description**: YA VALMODA Order Form API
   - **Execute as**: Me (your-email@gmail.com)
   - **Who has access**: Anyone
4. Click **"Deploy"**
5. You may need to authorize the script:
   - Click **"Authorize access"**
   - Choose your Google account
   - Click **"Advanced"** if you see a warning
   - Click **"Go to YA VALMODA Order Handler (unsafe)"**
   - Click **"Allow"**
6. **IMPORTANT**: Copy the **Web app URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
7. Save this URL - you'll need it in the next step!

## Step 4: Update Your Order Form

1. Open the file `src/components/OrderForm.jsx`
2. At the top of the file (around line 94-95), replace the WhatsApp configuration with:
   ```javascript
   // Google Apps Script Web App URL for email notifications
   const GOOGLE_SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE'  // Paste your URL here
   ```
3. Replace `YOUR_WEB_APP_URL_HERE` with the Web app URL you copied in Step 3

## Step 5: Test Your Setup

1. Run your website locally or deploy it
2. Fill out and submit an order form
3. Check your Gmail inbox for the order notification email

## Troubleshooting

### Emails not arriving?

1. **Check Spam folder** - First orders might go to spam
2. **Check Apps Script Executions**:
   - Go to your Apps Script project
   - Click "Executions" in the left sidebar
   - Look for any errors in recent executions
3. **Verify the Web App URL** is correct in OrderForm.jsx
4. **Check browser console** for any JavaScript errors

### Authorization issues?

- Make sure you selected **"Execute as: Me"** and **"Who has access: Anyone"**
- Try redeploying the script

### Want to change the email template?

- Edit the `sendOrderEmail` function in Code.gs
- Make your changes to the HTML or text body
- **No need to redeploy** - changes take effect immediately!

## Notes

- The script runs under your Google account and sends emails from your Gmail
- You can modify the email template in the `sendOrderEmail` function
- The script logs all executions - check "Executions" tab for debugging
- Free tier limit: 100 emails per day (plenty for most small businesses)

## Optional: Keep WhatsApp as Backup

If you want to keep WhatsApp AND add email notifications, the script can do both! Just keep the WhatsApp code in OrderForm.jsx and add the email submission alongside it.
