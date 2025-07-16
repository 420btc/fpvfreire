import React from 'react';
import { Button, Input, Textarea } from "@heroui/react";
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // EmailJS service configuration (misma configuración que ContactPage)
  const SERVICE_ID = 'service_o2fmskg';
  const TEMPLATE_ADMIN = 'template_oukgybe';
  const TEMPLATE_CLIENT = 'template_1d1a60b';
  const PUBLIC_KEY = '0SZPpCqrP9JOhJBde';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Initialize EmailJS with public key
      emailjs.init(PUBLIC_KEY);
      
      // Prepare template parameters for admin email - Simplificado para pruebas
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: '', // No hay campo de teléfono en este formulario
        subject: 'Contacto desde página principal',
        message: formData.message,
        reply_to: formData.email
      };
      
      // Send email to admin (you) - Solo template admin por ahora
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ADMIN,
        templateParams
      );
      
      console.log('Email sent successfully:', result.status, result.text);
      
      // Send confirmation email to client - Reactivado con variables corregidas
      const clientParams = {
        to_name: formData.name,  // Nombre del cliente
        email: formData.email,   // Email del cliente (coincide con tu template)
        subject: 'Contacto desde página principal' // Asunto
      };
      
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_CLIENT,
        clientParams
      );
      
      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-16 bg-content2">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Contáctanos</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <Input
            label="Nombre"
            placeholder="Tu nombre"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mb-4"
            isRequired
          />
          <Input
            label="Email"
            placeholder="tu@email.com"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mb-4"
            isRequired
          />
          <Textarea
            label="Mensaje"
            placeholder="Tu mensaje"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="mb-4"
            minRows={4}
            isRequired
          />
          
          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              ¡Mensaje enviado correctamente! Te contactaremos pronto.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              Error al enviar el mensaje. Por favor, inténtalo de nuevo.
            </div>
          )}
          
          <Button 
            type="submit" 
            color="primary" 
            className="w-full bg-orange-500 hover:bg-orange-600"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;