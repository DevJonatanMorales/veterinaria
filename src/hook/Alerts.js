import Swal from "sweetalert2";

export const useAlerts = (title, text, icon) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Aceptar",
  });
}

export const eventAlert = (title, text, event) => {

  Swal.fire({
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      event()
    }
  });
}