import React from 'react';
import { Button, Input, Textarea } from "@heroui/react";
import emailjs from 'emailjs-com';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target as HTMLFormElement, 'YOUR_USER_ID')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
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
            className="mb-4"
          />
          <Input
            label="Email"
            placeholder="tu@email.com"
            name="email"
            type="email"
            className="mb-4"
          />
          <Textarea
            label="Mensaje"
            placeholder="Tu mensaje"
            name="message"
            className="mb-4"
          />
          <Button type="submit" color="primary" className="w-full">
            Enviar Mensaje
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;