# Email Integration Guide

## Overview
This guide explains how to integrate email functionality for order notifications in the UN1 E-commerce application.

## Email Templates

We have created two professional HTML email templates:

### 1. Order Confirmation Email (`order-confirmation.html`)
Sent immediately after a customer places an order.

**Placeholders:**
- `{{ORDER_NUMBER}}` - Order number (e.g., ORD-2026-001)
- `{{ORDER_DATE}}` - Order date
- `{{TRACKING_NUMBER}}` - Shipping tracking number
- `{{CUSTOMER_NAME}}` - Customer full name
- `{{SHIPPING_ADDRESS}}` - Full shipping address
- `{{ITEMS}}` - Array of order items (loop)
  - `{{ITEM_IMAGE}}` - Product image URL
  - `{{ITEM_NAME}}` - Product name
  - `{{ITEM_COLOR}}` - Product color
  - `{{ITEM_SIZE}}` - Product size
  - `{{ITEM_QUANTITY}}` - Quantity
  - `{{ITEM_PRICE}}` - Formatted price
- `{{SUBTOTAL}}` - Subtotal amount
- `{{SHIPPING_COST}}` - Shipping cost
- `{{TOTAL_AMOUNT}}` - Total amount
- `{{TRACK_ORDER_URL}}` - URL to track order page
- `{{WEBSITE_URL}}` - Website base URL

### 2. Shipping Update Email (`shipping-update.html`)
Sent when order status changes (processing, shipping, delivered).

**Placeholders:**
- `{{STATUS_CLASS}}` - CSS class for status badge (pending/processing/shipping/delivered)
- `{{STATUS_TEXT}}` - Status text in Vietnamese
- `{{STATUS_MESSAGE}}` - Custom message for the status
- `{{ORDER_NUMBER}}` - Order number
- `{{TRACKING_NUMBER}}` - Shipping tracking number
- `{{UPDATE_DATE}}` - Date of status update
- `{{ORDER_DATE}}` - Original order date
- `{{PROCESSING_DATE}}` - Processing date
- `{{SHIPPING_DATE}}` - Shipping date
- `{{DELIVERED_DATE}}` - Delivery date
- `{{PROCESSING_CLASS}}` - Timeline class (active/completed)
- `{{SHIPPING_CLASS}}` - Timeline class (active/completed)
- `{{DELIVERED_CLASS}}` - Timeline class (active/completed)
- `{{TRACKING_URL}}` - URL to carrier tracking page
- `{{WEBSITE_URL}}` - Website base URL

## Backend Implementation Required

### 1. Email Service Setup

You need to choose an email service provider:

**Option A: NodeMailer (Self-hosted SMTP)**
```javascript
// Install: npm install nodemailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // or your SMTP server
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});
```

**Option B: SendGrid (Recommended)**
```javascript
// Install: npm install @sendgrid/mail
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
```

**Option C: AWS SES**
```javascript
// Install: npm install @aws-sdk/client-ses
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
```

### 2. Backend API Endpoints

Create these endpoints in your backend:

```javascript
// POST /api/orders/send-confirmation
// Send order confirmation email after checkout
router.post('/send-confirmation', async (req, res) => {
  const { orderData } = req.body;
  
  // Load template
  const template = fs.readFileSync('./templates/order-confirmation.html', 'utf8');
  
  // Replace placeholders
  const html = replaceTemplatePlaceholders(template, orderData);
  
  // Send email
  await sendEmail({
    to: orderData.customerEmail,
    subject: `Xác nhận đơn hàng ${orderData.orderNumber}`,
    html: html
  });
  
  res.json({ success: true });
});

// POST /api/orders/send-status-update
// Send shipping status update email
router.post('/send-status-update', async (req, res) => {
  const { orderId, newStatus } = req.body;
  
  // Get order from database
  const order = await Order.findById(orderId);
  
  // Load template
  const template = fs.readFileSync('./templates/shipping-update.html', 'utf8');
  
  // Prepare data
  const emailData = prepareStatusUpdateData(order, newStatus);
  
  // Replace placeholders
  const html = replaceTemplatePlaceholders(template, emailData);
  
  // Send email
  await sendEmail({
    to: order.customerEmail,
    subject: `Cập nhật đơn hàng ${order.orderNumber}`,
    html: html
  });
  
  res.json({ success: true });
});
```

### 3. Template Placeholder Replacement

```javascript
function replaceTemplatePlaceholders(template, data) {
  let html = template;
  
  // Simple replacements
  Object.keys(data).forEach(key => {
    if (typeof data[key] !== 'object') {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), data[key]);
    }
  });
  
  // Handle items loop
  if (data.ITEMS) {
    const itemsHtml = data.ITEMS.map(item => {
      let itemTemplate = getItemTemplate(template);
      Object.keys(item).forEach(key => {
        itemTemplate = itemTemplate.replace(new RegExp(`{{${key}}}`, 'g'), item[key]);
      });
      return itemTemplate;
    }).join('');
    
    html = html.replace(/{{#ITEMS}}.*{{\/ITEMS}}/s, itemsHtml);
  }
  
  return html;
}
```

### 4. Integration Points

**A. After Checkout (Frontend → Backend)**
```javascript
// In Checkout.jsx handleSubmit
const response = await fetch('/api/orders/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(orderData)
});

const { order } = await response.json();

// Backend will automatically send confirmation email
```

**B. Status Update (Admin/System → Backend)**
```javascript
// When admin updates order status
await fetch('/api/orders/send-status-update', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    orderId: order.id,
    newStatus: 'SHIPPING'
  })
});
```

### 5. Webhook Integration (SPX/Viettel)

For automatic status updates from shipping carriers:

```javascript
// POST /api/webhooks/shipping-update
router.post('/shipping-update', async (req, res) => {
  const { trackingNumber, status } = req.body;
  
  // Find order by tracking number
  const order = await Order.findOne({ trackingNumber });
  
  // Update status
  order.status = mapCarrierStatus(status);
  await order.save();
  
  // Send email notification
  await sendStatusUpdateEmail(order);
  
  res.json({ success: true });
});
```

## Environment Variables

Add these to your `.env` file:

```env
# Email Service
EMAIL_SERVICE=sendgrid  # or 'smtp', 'ses'
SENDGRID_API_KEY=your_sendgrid_api_key

# SMTP (if using NodeMailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Application
WEBSITE_URL=https://yourdomain.com
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=UN1 Fashion
```

## Testing

Use tools like:
- **Mailtrap** (for development testing)
- **SendGrid Test Mode**
- **Email on Acid** (for template testing across email clients)

## Next Steps

1. Set up backend API with Node.js/Express
2. Choose and configure email service provider
3. Implement API endpoints for sending emails
4. Test email templates with real data
5. Set up webhook handlers for carrier updates
6. Deploy and monitor email delivery rates

## Notes

- Email templates are responsive and work on all major email clients
- Images should be hosted on a CDN for reliable delivery
- Always test emails before production deployment
- Monitor bounce rates and spam complaints
- Consider implementing email queue for high volume
