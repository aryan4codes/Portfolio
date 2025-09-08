interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: string;
}

export const sendContactForm = async (data: ContactFormData): Promise<boolean> => {
  try {
    // Sanitize data before sending
    const sanitizedData = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      message: data.message.trim(),
    };

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanitizedData),
    });

    const result: ApiResponse = await response.json();

    if (!response.ok) {
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: result.error,
        details: result.details
      });
      return false;
    }

    if (result.success) {
      console.log('Email sent successfully:', result.message);
      return true;
    } else {
      console.error('Email sending failed:', result.error);
      return false;
    }
  } catch (error) {
    console.error('Network or parsing error:', error);
    return false;
  }
};