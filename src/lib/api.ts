interface ContactFormData {
    name: string;
    email: string;
    message: string;
  }
  
  export const sendContactForm = async (data: ContactFormData): Promise<boolean> => {
    try {
      // The API endpoint will be relative to your domain, e.g., /api/contact
      // This works well with platforms like Vercel or Netlify that serve functions from an /api directory.
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        // Try to parse error message from API response
        const errorResult = await response.json().catch(() => ({ error: 'Unknown server error' }));
        console.error('API Error:', response.status, errorResult.error);
        // You might want to throw an error with errorResult.error to be caught by the component
        // For now, just returning false as per the original structure.
        return false;
      }
  
      const result = await response.json();
      return result.success === true; // Ensure it explicitly checks for true
    } catch (error) {
      console.error('Error sending contact form:', error);
      return false;
    }
  };