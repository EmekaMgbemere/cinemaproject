import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

export default function Contactform() {
  const form = useRef();
  
  function sendEmail (e){
    e.preventDefault();

    emailjs.sendForm('1234gmail', 'gmail1234', form.current, 'C91nSiJzdBrrAH5JM')
      .then((result) => {console.log(result.text); },
       (error) => {console.log(error.text);});
       e.target.reset();
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="name" />
      <label>Email</label>
      <input type="email" name="email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};