import React from "react";
import "./style.css";


const ContactForm = () => {
    const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "0c55796e-0dd7-4e80-8cf6-7917b96ab219");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
    return (
        <div className="contact-form">
            <h2 className="title-2">Send me message</h2>
            <form onSubmit={onSubmit} className="form-content">
                <label htmlFor="name" className="name-label">Name*</label>
                <input type="text" name="name"/>
                <label htmlFor="mobile" className="email-label">Mobile number*</label>
                <input type="text" name="mobile"/>
                <label htmlFor="message" className="message-label">Message</label>
                <input type="text" name="message"  className="message-input"/>
                <button type="submit" className="btn btn-form">Submit</button>
            </form>
        </div>
    )
};

export default ContactForm;
