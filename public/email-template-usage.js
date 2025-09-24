/**
 * Email Template Kullanım Örneği
 * Bu dosya, email template'lerini nasıl kullanacağınızı gösterir.
 */

// Template değiştirme fonksiyonu
function replaceTemplateVariables(template, variables) {
    let result = template;
    
    // Tüm {KEY} formatındaki değişkenleri değiştir
    for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`{${key}}`, 'g');
        result = result.replace(regex, value || '');
    }
    
    return result;
}

// Örnek kullanım - Admin'e gönderilecek email
function generateAdminEmail(customerData) {
    // Template'i oku (gerçek uygulamada dosyadan okuyacaksınız)
    const template = `<!-- email-template.html içeriği buraya gelecek -->`;
    
    // Değişkenleri hazırla
    const variables = {
        LOGO_URL: 'https://drmunal.ae.tc/images/logo.png',
        CUSTOMER_NAME: customerData.name || 'Bilinmiyor',
        CUSTOMER_EMAIL: customerData.email || 'Bilinmiyor',
        CUSTOMER_PHONE: customerData.phone || 'Bilinmiyor',
        MESSAGE_SUBJECT: customerData.subject || 'İletişim Formu',
        MESSAGE_CONTENT: customerData.message || 'Mesaj içeriği bulunamadı',
        SUBMISSION_DATE: new Date().toLocaleString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    
    // Template'i işle
    return replaceTemplateVariables(template, variables);
}

// Örnek kullanım - Müşteriye gönderilecek email
function generateCustomerEmail(customerData) {
    // Template'i oku (gerçek uygulamada dosyadan okuyacaksınız)
    const template = `<!-- customer-email-template.html içeriği buraya gelecek -->`;
    
    // Değişkenleri hazırla
    const variables = {
        LOGO_URL: 'https://drmunal.ae.tc/images/logo.png',
        CUSTOMER_NAME: customerData.name || 'Değerli Hastamız'
    };
    
    // Template'i işle
    return replaceTemplateVariables(template, variables);
}

// Node.js Express örneği
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// Email gönderme fonksiyonu
async function sendEmail(to, subject, htmlContent) {
    // Email transporter'ı yapılandırın
    const transporter = nodemailer.createTransporter({
        host: 'smtp.gmail.com', // Gmail için
        port: 587,
        secure: false,
        auth: {
            user: 'dr.munal1101@gmail.com',
            pass: 'your-app-password' // Gmail App Password kullanın
        }
    });
    
    const mailOptions = {
        from: 'dr.munal1101@gmail.com',
        to: to,
        subject: subject,
        html: htmlContent
    };
    
    try {
        const result = await transporter.sendMail(mailOptions);
        console.log('Email gönderildi:', result.messageId);
        return result;
    } catch (error) {
        console.error('Email gönderme hatası:', error);
        throw error;
    }
}

// İletişim formu endpoint'i
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        
        // Müşteri verilerini hazırla
        const customerData = {
            name,
            email,
            phone,
            subject,
            message
        };
        
        // Template'leri oku
        const adminTemplate = await fs.readFile(
            path.join(__dirname, 'public', 'email-template.html'), 
            'utf8'
        );
        const customerTemplate = await fs.readFile(
            path.join(__dirname, 'public', 'customer-email-template.html'), 
            'utf8'
        );
        
        // Admin'e gönderilecek email
        const adminEmailHtml = replaceTemplateVariables(adminTemplate, {
            LOGO_URL: 'https://drmunal.ae.tc/images/logo.png',
            CUSTOMER_NAME: name,
            CUSTOMER_EMAIL: email,
            CUSTOMER_PHONE: phone,
            MESSAGE_SUBJECT: subject,
            MESSAGE_CONTENT: message,
            SUBMISSION_DATE: new Date().toLocaleString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        });
        
        // Müşteriye gönderilecek email
        const customerEmailHtml = replaceTemplateVariables(customerTemplate, {
            LOGO_URL: 'https://drmunal.ae.tc/images/logo.png',
            CUSTOMER_NAME: name
        });
        
        // Email'leri gönder
        await Promise.all([
            sendEmail('dr.munal1101@gmail.com', `Yeni İletişim Mesajı - ${name}`, adminEmailHtml),
            sendEmail(email, 'Mesajınız Alındı - Doç. Dr. Mehmet Ünal', customerEmailHtml)
        ]);
        
        res.json({ 
            success: true, 
            message: 'Mesajınız başarıyla gönderildi!' 
        });
        
    } catch (error) {
        console.error('İletişim formu hatası:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Mesaj gönderilirken bir hata oluştu.' 
        });
    }
});

// PHP örneği
const phpExample = `
<?php
// email-template-usage.php

function replaceTemplateVariables($template, $variables) {
    foreach ($variables as $key => $value) {
        $template = str_replace('{' . $key . '}', $value, $template);
    }
    return $template;
}

function sendContactEmail($customerData) {
    // Template'leri oku
    $adminTemplate = file_get_contents('public/email-template.html');
    $customerTemplate = file_get_contents('public/customer-email-template.html');
    
    // Değişkenleri hazırla
    $adminVariables = [
        'LOGO_URL' => 'https://drmunal.ae.tc/images/logo.png',
        'CUSTOMER_NAME' => $customerData['name'],
        'CUSTOMER_EMAIL' => $customerData['email'],
        'CUSTOMER_PHONE' => $customerData['phone'],
        'MESSAGE_SUBJECT' => $customerData['subject'],
        'MESSAGE_CONTENT' => $customerData['message'],
        'SUBMISSION_DATE' => date('d.m.Y H:i')
    ];
    
    $customerVariables = [
        'LOGO_URL' => 'https://drmunal.ae.tc/images/logo.png',
        'CUSTOMER_NAME' => $customerData['name']
    ];
    
    // Template'leri işle
    $adminEmailHtml = replaceTemplateVariables($adminTemplate, $adminVariables);
    $customerEmailHtml = replaceTemplateVariables($customerTemplate, $customerVariables);
    
    // Email gönder (PHPMailer kullanarak)
    // ... email gönderme kodu ...
}

// POST verilerini al
if ($_POST) {
    $customerData = [
        'name' => $_POST['name'],
        'email' => $_POST['email'],
        'phone' => $_POST['phone'],
        'subject' => $_POST['subject'],
        'message' => $_POST['message']
    ];
    
    sendContactEmail($customerData);
}
?>
`;

// Template değişkenleri listesi
const templateVariables = {
    // Admin email template değişkenleri
    admin: [
        'LOGO_URL',
        'CUSTOMER_NAME',
        'CUSTOMER_EMAIL', 
        'CUSTOMER_PHONE',
        'MESSAGE_SUBJECT',
        'MESSAGE_CONTENT',
        'SUBMISSION_DATE'
    ],
    
    // Customer email template değişkenleri
    customer: [
        'LOGO_URL',
        'CUSTOMER_NAME'
    ]
};

module.exports = {
    replaceTemplateVariables,
    generateAdminEmail,
    generateCustomerEmail,
    sendEmail,
    templateVariables
};
