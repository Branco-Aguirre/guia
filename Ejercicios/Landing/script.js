const launchDate = new Date("2024-12-20T00:00:00").getTime();
const countdownElement = document.getElementById("countdown");

const interval = setInterval(() => {
  const now = new Date().getTime();
  const distance = launchDate - now;

  if (distance < 0) {
    clearInterval(interval);
    countdownElement.innerText = "¡El curso ya está disponible!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.innerText = `Faltan: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": "-",
        },
        body: JSON.stringify({
          sender: {
            email: "brancoaguirrebran@gmail.com",
            name: "Curso Redes Sociales",
          },
          to: [{ email: email, name: name }],
          subject: "¡Gracias por registrarte!",
          htmlContent: `
                    <h1>¡Hola ${name}!</h1>
                    <p>Gracias por registrarte en nuestro curso de redes sociales.</p>
                    <p>Tu código de descuento del 15% es: <strong>REDES15</strong></p>
                    <p>¡Esperamos verte pronto!</p>
                `,
        }),
      });

      if (response.ok) {
        document.getElementById("successMessage").style.display = "block";
      } else {
        throw new Error("Error al enviar el correo.");
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error al registrarte. Intenta nuevamente.");
    }
  });
