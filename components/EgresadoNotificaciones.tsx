import React from "react";

export type Notificacion = {
  id: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
};

type Props = {
  notificaciones: Notificacion[];
  onLeer?: (id: string) => void;
};

export default function EgresadoNotificaciones({ notificaciones, onLeer }: Props) {
  return (
    <div className="bg-white shadow rounded p-4 max-w-md mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="material-icons text-blue-500">notifications</span>
        Notificaciones
      </h2>
      {notificaciones.length === 0 ? (
        <p className="text-gray-500">No tienes notificaciones.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {notificaciones.map((n) => (
            <li
              key={n.id}
              className={`p-3 rounded border ${n.leida ? "bg-gray-100" : "bg-blue-50 border-blue-300"}`}
            >
              <div className="flex justify-between items-center">
                <span className={n.leida ? "text-gray-500" : "font-bold"}>{n.mensaje}</span>
                {!n.leida && onLeer && (
                  <button
                    className="ml-2 text-xs text-blue-600 hover:underline"
                    onClick={() => onLeer(n.id)}
                  >
                    Marcar como leída
                  </button>
                )}
              </div>
              <span className="block text-xs text-gray-400 mt-1">{n.fecha}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}