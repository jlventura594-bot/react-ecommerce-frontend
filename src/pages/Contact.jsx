const Contact = () => {
  return (
    <div className="container my-4" style={{ maxWidth: 720 }}>
      <h3>Contact Us</h3>
      <form className="mt-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input id="name" type="text" className="form-control" placeholder="Your name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input id="email" type="email" className="form-control" placeholder="you@example.com" />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea id="message" className="form-control" rows="4" placeholder="How can we help?" />
        </div>
        <button type="button" className="btn btn-primary">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;