# Email Template'leri Kullanım Kılavuzu

Bu klasörde, Doç. Dr. Mehmet Ünal Dermatoloji Kliniği için hazırlanmış email template'leri bulunmaktadır.

## 📁 Dosyalar

- `email-template.html` - Admin'e gönderilecek email template'i
- `customer-email-template.html` - Müşteriye gönderilecek otomatik yanıt template'i
- `email-template-usage.js` - Template kullanım örnekleri (Node.js, PHP)
- `EMAIL_TEMPLATES_README.md` - Bu kılavuz dosyası

## 🎨 Tasarım Özellikleri

### Renk Paleti
- **Ana Renk**: #D4AF37 (Altın)
- **Arka Plan**: #000000 (Siyah)
- **İkincil Arka Plan**: #1a1a1a (Koyu Gri)
- **Metin**: #333333 (Koyu Gri)
- **Beyaz**: #ffffff

### Font
- **Font Family**: 'Poppins', Arial, sans-serif
- **Responsive**: Mobil uyumlu tasarım

## 🔧 Template Değişkenleri

### Admin Email Template (`email-template.html`)

| Değişken | Açıklama | Örnek |
|----------|----------|-------|
| `{LOGO_URL}` | Logo resmi URL'si | `https://drmunal.ae.tc/images/logo.png` |
| `{CUSTOMER_NAME}` | Müşteri adı soyadı | `Ahmet Yılmaz` |
| `{CUSTOMER_EMAIL}` | Müşteri e-posta adresi | `ahmet@example.com` |
| `{CUSTOMER_PHONE}` | Müşteri telefon numarası | `+90 555 123 45 67` |
| `{MESSAGE_SUBJECT}` | Mesaj konusu | `Randevu Talebi` |
| `{MESSAGE_CONTENT}` | Mesaj içeriği | `Merhaba, randevu almak istiyorum...` |
| `{SUBMISSION_DATE}` | Gönderim tarihi | `15 Aralık 2024, 14:30` |

### Customer Email Template (`customer-email-template.html`)

| Değişken | Açıklama | Örnek |
|----------|----------|-------|
| `{LOGO_URL}` | Logo resmi URL'si | `https://drmunal.ae.tc/images/logo.png` |
| `{CUSTOMER_NAME}` | Müşteri adı soyadı | `Ahmet Yılmaz` |

## 💻 Kullanım Örnekleri

### Node.js ile Kullanım

```javascript
const fs = require('fs').promises;
const path = require('path');

// Template değiştirme fonksiyonu
function replaceTemplateVariables(template, variables) {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`{${key}}`, 'g');
        result = result.replace(regex, value || '');
    }
    return result;
}

// Template'i oku ve işle
async function generateAdminEmail(customerData) {
    const template = await fs.readFile('public/email-template.html', 'utf8');
    
    const variables = {
        LOGO_URL: 'https://drmunal.ae.tc/images/logo.png',
        CUSTOMER_NAME: customerData.name,
        CUSTOMER_EMAIL: customerData.email,
        CUSTOMER_PHONE: customerData.phone,
        MESSAGE_SUBJECT: customerData.subject,
        MESSAGE_CONTENT: customerData.message,
        SUBMISSION_DATE: new Date().toLocaleString('tr-TR')
    };
    
    return replaceTemplateVariables(template, variables);
}
```

### PHP ile Kullanım

```php
<?php
function replaceTemplateVariables($template, $variables) {
    foreach ($variables as $key => $value) {
        $template = str_replace('{' . $key . '}', $value, $template);
    }
    return $template;
}

function generateAdminEmail($customerData) {
    $template = file_get_contents('public/email-template.html');
    
    $variables = [
        'LOGO_URL' => 'https://drmunal.ae.tc/images/logo.png',
        'CUSTOMER_NAME' => $customerData['name'],
        'CUSTOMER_EMAIL' => $customerData['email'],
        'CUSTOMER_PHONE' => $customerData['phone'],
        'MESSAGE_SUBJECT' => $customerData['subject'],
        'MESSAGE_CONTENT' => $customerData['message'],
        'SUBMISSION_DATE' => date('d.m.Y H:i')
    ];
    
    return replaceTemplateVariables($template, $variables);
}
?>
```

### C# ile Kullanım

```csharp
public string ReplaceTemplateVariables(string template, Dictionary<string, string> variables)
{
    string result = template;
    foreach (var variable in variables)
    {
        result = result.Replace($"{{{variable.Key}}}", variable.Value ?? "");
    }
    return result;
}

public string GenerateAdminEmail(CustomerData customerData)
{
    string template = File.ReadAllText("public/email-template.html");
    
    var variables = new Dictionary<string, string>
    {
        ["LOGO_URL"] = "https://drmunal.ae.tc/images/logo.png",
        ["CUSTOMER_NAME"] = customerData.Name,
        ["CUSTOMER_EMAIL"] = customerData.Email,
        ["CUSTOMER_PHONE"] = customerData.Phone,
        ["MESSAGE_SUBJECT"] = customerData.Subject,
        ["MESSAGE_CONTENT"] = customerData.Message,
        ["SUBMISSION_DATE"] = DateTime.Now.ToString("dd.MM.yyyy HH:mm")
    };
    
    return ReplaceTemplateVariables(template, variables);
}
```

## 📧 Email Gönderme

### Nodemailer ile (Node.js)

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'dr.munal1101@gmail.com',
        pass: 'your-app-password'
    }
});

async function sendEmail(to, subject, htmlContent) {
    const mailOptions = {
        from: 'dr.munal1101@gmail.com',
        to: to,
        subject: subject,
        html: htmlContent
    };
    
    return await transporter.sendMail(mailOptions);
}
```

### PHPMailer ile (PHP)

```php
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require 'vendor/autoload.php';

function sendEmail($to, $subject, $htmlContent) {
    $mail = new PHPMailer(true);
    
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'dr.munal1101@gmail.com';
    $mail->Password = 'your-app-password';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    
    $mail->setFrom('dr.munal1101@gmail.com', 'Doç. Dr. Mehmet Ünal');
    $mail->addAddress($to);
    
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $htmlContent;
    
    return $mail->send();
}
?>
```

## 🔒 Güvenlik Notları

1. **App Password Kullanın**: Gmail için 2FA aktifse App Password kullanın
2. **SMTP Ayarları**: Production'da güvenli SMTP ayarları yapın
3. **Input Validation**: Müşteri verilerini mutlaka validate edin
4. **XSS Koruması**: HTML içeriğini güvenli şekilde işleyin

## 📱 Responsive Tasarım

Template'ler mobil cihazlarda da düzgün görünecek şekilde tasarlanmıştır:

- **Mobil**: Tek sütun layout
- **Tablet**: İki sütun layout
- **Desktop**: Üç sütun layout

## 🎯 Özelleştirme

### Renk Değiştirme
CSS dosyasındaki değişkenleri değiştirerek renkleri özelleştirebilirsiniz:

```css
:root {
    --primary-color: #D4AF37;
    --background-color: #000000;
    --text-color: #333333;
}
```

### Logo Değiştirme
`{LOGO_URL}` değişkenini kendi logo URL'niz ile değiştirin.

### İçerik Güncelleme
HTML içeriğini ihtiyaçlarınıza göre düzenleyebilirsiniz.

## 📞 Destek

Template'lerle ilgili sorularınız için:
- **E-posta**: dr.munal1101@gmail.com
- **Telefon**: +90 546 529 76 77

---

**Not**: Bu template'ler Doç. Dr. Mehmet Ünal Dermatoloji Kliniği için özel olarak tasarlanmıştır. Başka projelerde kullanmadan önce içerikleri güncelleyin.
