import os
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mail import Mail, Message
from forms import ContactForm


app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')  # Accessing MAIL_USERNAME environment variable
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')  # Accessing MAIL_PASSWORD environment variable
app.config['MAIL_RECIPIENT'] = os.getenv('MAIL_RECIPIENT')

mail = Mail(app)


@app.route('/', methods=['GET', 'POST'])
def home():
    form = ContactForm()
    if form.validate_on_submit():
        name = form.name.data
        email = form.email.data
        message = form.message.data

        msg = Message('New Message from Your Website',
                      sender=os.getenv('MAIL_USERNAME'),
                      recipients=[os.getenv('MAIL_RECIPIENT')])
        msg.body = f"From: {name}\nEmail: {email}\nMessage: {message}"

        mail.send(msg)
        flash('Message sent successfully!', 'success')
        return redirect(url_for('home'))

    return render_template("index.html", form=form)


if __name__ == "__main__":
    app.run(debug=False, port=5002)