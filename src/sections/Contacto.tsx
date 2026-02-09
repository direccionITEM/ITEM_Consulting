import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Enviar el formulario usando mailto
    const subject = encodeURIComponent(formData.subject || 'Contacto desde la web');
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Asunto: ${formData.subject || 'No especificado'}\n\n` +
      `Mensaje:\n${formData.message}`
    );
    
    window.location.href = `mailto:direccion@itemconsulting.es?subject=${subject}&body=${body}`;
    
    setIsSubmitting(false);
    setSubmitMessage('¡Mensaje preparado! Se abrirá tu cliente de correo para enviar el mensaje.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setSubmitMessage(''), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contacto" className="section-padding bg-item-blue-light">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contacto</h2>
          <div className="w-20 h-1 bg-item-blue mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Comunícate con nosotros y nos pondremos en contacto contigo tan pronto como nos sea posible. 
            ¡Esperamos tener noticias tuyas!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h3>
            
            {submitMessage && (
              <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre *
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Asunto
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Asunto del mensaje"
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Escribe tu mensaje..."
                  rows={5}
                  required
                  className="w-full"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-item-blue hover:bg-item-blue/90 text-white flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  'Enviando...'
                ) : (
                  <>
                    Enviar mensaje
                    <Send size={18} />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de contacto</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-item-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-item-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Correo electrónico</h4>
                    <a 
                      href="mailto:direccion@itemconsulting.es"
                      className="text-item-blue hover:underline"
                    >
                      direccion@itemconsulting.es
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-item-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-item-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Teléfono</h4>
                    <a 
                      href="tel:+34619620268"
                      className="text-item-blue hover:underline"
                    >
                      619 620 268
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-item-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-item-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Dirección</h4>
                    <p className="text-gray-600">
                      Calle Cuartel 41<br />
                      Santo Ángel, Murcia 30151
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-item-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-item-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Horario</h4>
                    <p className="text-gray-600">
                      Lunes a Viernes<br />
                      9:00 - 14:00 y 16:00 - 19:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.1234567890123!2d-1.1234567890123!3d37.1234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDA3JzI0LjAiTiAxwrAwNycyNC4wIlc!5e0!3m2!1ses!2ses!4v1234567890123!5m2!1ses!2ses"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de ITEM Consulting"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
