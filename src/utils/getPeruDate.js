export function getPeruDate() {
    // Obtener la fecha actual en la zona horaria de Perú (UTC-5)
    const fecha = new Date().toLocaleString("es-PE", {
      timeZone: "America/Lima",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      hour12: false, // Para formato de 24 horas
    });
  
    // Formatear la fecha y hora al formato deseado: "dd-mm-aaaa-hh"
    const [fechaFormateada, hora] = fecha.split(" ");
    const [dd, mm, aaaa] = fechaFormateada.split("/");
  
    return `${dd}-${mm}-${aaaa}-${hora}`;
}