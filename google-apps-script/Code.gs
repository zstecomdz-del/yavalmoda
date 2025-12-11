/**
 * Google Apps Script to handle order form submissions and send emails
 * Deploy this as a Web App with the following settings:
 * - Execute as: Me
 * - Who has access: Anyone
 */

// Configuration
const EMAIL_RECIPIENT = 'valmodastie@gmail.com';
const EMAIL_SUBJECT = 'طلب جديد - YA VALMODA';

/**
 * Handle POST requests from the order form
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);

    // Send email notification
    sendOrderEmail(data);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Order received successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log error for debugging
    Logger.log('Error: ' + error.toString());

    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Send order confirmation email
 */
function sendOrderEmail(orderData) {
  // Create HTML email body
  const htmlBody = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 20px;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          letter-spacing: 1px;
        }
        .content {
          padding: 30px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          background-color: #1a1a1a;
          color: white;
          padding: 12px 15px;
          margin: 0 0 15px 0;
          font-size: 18px;
          border-radius: 4px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 15px;
          border-bottom: 1px solid #eee;
        }
        .info-row:last-child {
          border-bottom: none;
        }
        .info-label {
          font-weight: 600;
          color: #555;
        }
        .info-value {
          color: #1a1a1a;
        }
        .total-section {
          background-color: #f8f8f8;
          padding: 20px;
          border-radius: 6px;
          margin-top: 20px;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          font-size: 20px;
          font-weight: bold;
          color: #1a1a1a;
        }
        .footer {
          background-color: #f8f8f8;
          padding: 20px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>طلب جديد 🎉</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">YA VALMODA</p>
        </div>

        <div class="content">
          <div class="section">
            <h2 class="section-title">معلومات العميل</h2>
            <div class="info-row">
              <span class="info-label">الاسم:</span>
              <span class="info-value">${orderData.name}</span>
            </div>
            <div class="info-row">
              <span class="info-label">الهاتف:</span>
              <span class="info-value">${orderData.phone}</span>
            </div>
            <div class="info-row">
              <span class="info-label">الولاية:</span>
              <span class="info-value">${orderData.wilaya}</span>
            </div>
            <div class="info-row">
              <span class="info-label">نوع التوصيل:</span>
              <span class="info-value">${orderData.deliveryType}</span>
            </div>
            <div class="info-row">
              <span class="info-label">سعر التوصيل:</span>
              <span class="info-value">${orderData.deliveryCost}</span>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">تفاصيل المنتج</h2>
            <div class="info-row">
              <span class="info-label">المنتج:</span>
              <span class="info-value">${orderData.product}</span>
            </div>
            <div class="info-row">
              <span class="info-label">اللون:</span>
              <span class="info-value">${orderData.color}</span>
            </div>
            <div class="info-row">
              <span class="info-label">المقاس:</span>
              <span class="info-value">${orderData.size}</span>
            </div>
            <div class="info-row">
              <span class="info-label">الكمية:</span>
              <span class="info-value">${orderData.quantity}</span>
            </div>
          </div>

          <div class="total-section">
            <div class="total-row">
              <span>المجموع الإجمالي:</span>
              <span>${orderData.totalPrice}</span>
            </div>
          </div>
        </div>

        <div class="footer">
          <p>تم استلام هذا الطلب من موقع YA VALMODA</p>
          <p style="margin: 5px 0 0 0;">التاريخ: ${new Date().toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' })}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Create plain text version
  const textBody = `
═══════════════════════
طلب جديد - YA VALMODA
═══════════════════════

معلومات العميل:
━━━━━━━━━━━━━━━
الاسم: ${orderData.name}
الهاتف: ${orderData.phone}
الولاية: ${orderData.wilaya}
التوصيل: ${orderData.deliveryType}
سعر التوصيل: ${orderData.deliveryCost}

تفاصيل المنتج:
━━━━━━━━━━━━━━━
المنتج: ${orderData.product}
اللون: ${orderData.color}
المقاس: ${orderData.size}
الكمية: ${orderData.quantity}

═══════════════════════
المجموع: ${orderData.totalPrice}
═══════════════════════

التاريخ: ${new Date().toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' })}
  `;

  // Send email
  MailApp.sendEmail({
    to: EMAIL_RECIPIENT,
    subject: EMAIL_SUBJECT,
    body: textBody,
    htmlBody: htmlBody
  });
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'OK',
      message: 'YA VALMODA Order API is running'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
