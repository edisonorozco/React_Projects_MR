import React, { useState } from 'react';
import './contact.css';
import Footer from '../../footer/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario
    console.log(formData);
  };

  return (
    <>
      <div class="contact_form">

        <div class="formulario">
          <h1>Formulario de contacto</h1>
          <h3>Escríbenos y en breve nos pondremos en contacto contigo</h3>

          <form onSubmit={handleSubmit}>

            <p>
              <label for="nombre" class="colocar_nombre">Nombre
                <span class="obligatorio">*</span>
              </label>
              <input type="text" name="name" id="name" placeholder="Escribe tu nombre" value={formData.name} onChange={handleChange} required />
            </p>

            <p>
              <label for="email" class="colocar_email">Email
                <span class="obligatorio">*</span>
              </label>
              <input type="email" name="email" id="email" placeholder="Escribe tu Email" value={formData.email} onChange={handleChange} required />
            </p>

            <p>
              <label for="telefone" class="colocar_telefono">Teléfono
              </label>
              <input type="tel" name="telefono" id="telefono" placeholder="Escribe tu teléfono" value={formData.telefono} onChange={handleChange} required />
            </p>

            <p>
              <label for="asunto" class="colocar_asunto">Asunto
                <span class="obligatorio">*</span>
              </label>
              <input type="text" name="subject" id="subject" placeholder="Escribe un asunto" value={formData.subject} onChange={handleChange} required />
            </p>

            <p>
              <label for="mensaje" class="colocar_mensaje">Mensaje
                <span class="obligatorio">*</span>
              </label>
              <textarea name="message" class="texto_mensaje" id="message" placeholder="Deja aquí tu comentario..." value={formData.message} onChange={handleChange} required></textarea>
            </p>

            <div className='btn__enviar'>
              <button type="submit" name="enviar_formulario" id="enviar"><p>Enviar</p></button>
            </div>

            <p class="aviso">
              <span class="obligatorio"> * </span>los campos son obligatorios.
            </p>

          </form>
        </div>
      </div>
      <Footer />
    </>
  );

}
