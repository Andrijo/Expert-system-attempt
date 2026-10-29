// Base de Conocimiento

export const BASE_CONOCIMIENTO = `
  :- use_module(library(lists)).

  % Hechos: causa(Componente, Sintoma, Peso)
  % Peso de 1 a 5: 5 = síntoma característico del componente,
  % 1 = síntoma genérico que puede aparecer por muchas causas.

  % Memoria RAM
  causa(memoria_ram, pitidos_al_arrancar, 5).
  causa(memoria_ram, pantallazo_azul, 4).
  causa(memoria_ram, reinicios_constantes, 3).
  causa(memoria_ram, pantalla_negra, 3).
  causa(memoria_ram, congelamientos, 3).
  causa(memoria_ram, archivos_corruptos, 3).
  causa(memoria_ram, sistema_lento, 2).
  causa(memoria_ram, error_no_bootable_device, 2).
  causa(memoria_ram, apagado_repentino, 1).
  causa(memoria_ram, parpadeo_monitor, 1).

  % Disco Duro / SSD
  causa(disco_duro, error_no_bootable_device, 5).
  causa(disco_duro, ruidos_metalicos, 5).
  causa(disco_duro, archivos_corruptos, 5).
  causa(disco_duro, congelamientos, 3).
  causa(disco_duro, sistema_lento, 3).
  causa(disco_duro, reinicios_constantes, 2).
  causa(disco_duro, pantalla_negra, 1).
  causa(disco_duro, apagado_repentino, 1).

  % Ventilador / Refrigeración
  causa(ventilador, ruido_excesivo, 5).
  causa(ventilador, calentamiento, 4).
  causa(ventilador, apagado_repentino, 3).
  causa(ventilador, pitidos_al_arrancar, 3).
  causa(ventilador, sistema_lento, 2).
  causa(ventilador, congelamientos, 2).
  causa(ventilador, reinicios_constantes, 2).
  causa(ventilador, parpadeo_monitor, 1).
  causa(ventilador, pantalla_negra, 1).

  % Pasta Térmica
  causa(pasta_termica, calentamiento, 5).
  causa(pasta_termica, apagado_repentino, 3).
  causa(pasta_termica, sistema_lento, 2).
  causa(pasta_termica, congelamientos, 2).
  causa(pasta_termica, reinicios_constantes, 2).
  causa(pasta_termica, pantalla_negra, 1).

  % Procesador / CPU
  causa(procesador, calentamiento, 3).
  causa(procesador, pitidos_al_arrancar, 3).
  causa(procesador, congelamientos, 2).
  causa(procesador, apagado_repentino, 2).
  causa(procesador, sistema_lento, 2).
  causa(procesador, pantalla_negra, 2).
  causa(procesador, pantallazo_azul, 2).
  causa(procesador, reinicios_constantes, 2).
  causa(procesador, error_no_bootable_device, 1).
  causa(procesador, parpadeo_monitor, 1).

  % Fuente de Poder / PSU
  causa(fuente_poder, pc_no_enciende, 5).
  causa(fuente_poder, olor_a_quemado, 5).
  causa(fuente_poder, apagado_repentino, 4).
  causa(fuente_poder, reinicios_constantes, 3).
  causa(fuente_poder, parpadeo_monitor, 2).
  causa(fuente_poder, congelamientos, 2).
  causa(fuente_poder, pantalla_negra, 2).
  causa(fuente_poder, ruido_excesivo, 2).
  causa(fuente_poder, pitidos_al_arrancar, 2).
  causa(fuente_poder, sistema_lento, 1).

  % Tarjeta Gráfica / GPU
  causa(tarjeta_grafica, artifacts_pantalla, 5).
  causa(tarjeta_grafica, fallo_driver, 5).
  causa(tarjeta_grafica, parpadeo_monitor, 4).
  causa(tarjeta_grafica, pantalla_negra, 3).
  causa(tarjeta_grafica, calentamiento, 3).
  causa(tarjeta_grafica, pantallazo_azul, 3).
  causa(tarjeta_grafica, apagado_repentino, 2).
  causa(tarjeta_grafica, ruido_excesivo, 2).
  causa(tarjeta_grafica, congelamientos, 2).
  causa(tarjeta_grafica, reinicios_constantes, 2).

  % Monitor / Cable de video
  causa(monitor, parpadeo_monitor, 5).
  causa(monitor, pantalla_negra, 4).
  causa(monitor, artifacts_pantalla, 3).

  % Placa Madre / Motherboard
  causa(placa_madre, pc_no_enciende, 4).
  causa(placa_madre, pitidos_al_arrancar, 4).
  causa(placa_madre, olor_a_quemado, 4).
  causa(placa_madre, pantalla_negra, 2).
  causa(placa_madre, reinicios_constantes, 2).
  causa(placa_madre, error_no_bootable_device, 2).
  causa(placa_madre, congelamientos, 2).
  causa(placa_madre, apagado_repentino, 2).
  causa(placa_madre, parpadeo_monitor, 1).
  causa(placa_madre, artifacts_pantalla, 1).

  % Batería (laptops)
  causa(bateria, no_carga, 5).
  causa(bateria, bateria_hinchada, 5).
  causa(bateria, apagado_repentino, 3).
  causa(bateria, pc_no_enciende, 3).
  causa(bateria, calentamiento, 3).
  causa(bateria, reinicios_constantes, 2).
  causa(bateria, sistema_lento, 1).
  causa(bateria, pantalla_negra, 1).
  causa(bateria, congelamientos, 1).

  % Cargador / Adaptador de corriente (laptops)
  causa(cargador, no_carga, 4).
  causa(cargador, pc_no_enciende, 2).

  % Sistema Operativo / Software
  causa(sistema_operativo, pantallazo_azul, 4).
  causa(sistema_operativo, fallo_driver, 4).
  causa(sistema_operativo, sistema_lento, 3).
  causa(sistema_operativo, congelamientos, 3).
  causa(sistema_operativo, reinicios_constantes, 3).
  causa(sistema_operativo, archivos_corruptos, 3).
  causa(sistema_operativo, error_no_bootable_device, 3).
  causa(sistema_operativo, pantalla_negra, 2).
  causa(sistema_operativo, apagado_repentino, 1).
  causa(sistema_operativo, parpadeo_monitor, 1).

  % Versión sin peso, usada por las reglas que solo necesitan la relación.
  causa(Componente, Sintoma) :-
      causa(Componente, Sintoma, _).


  % Reglas de inferencia

  % Regla 1: Inferencia directa
  % Un síntoma apunta directamente a un posible componente fallido.
  posible_fallo(Componente, Sintoma) :-
      causa(Componente, Sintoma).

  % Regla 2: Coincidencia Doble (Fallo Confirmado)
  % Si dos síntomas distintos apuntan al mismo componente, se confirma el fallo.
  fallo_confirmado(Componente, Sintoma1, Sintoma2) :-
      causa(Componente, Sintoma1),
      causa(Componente, Sintoma2),
      Sintoma1 \\= Sintoma2.

  % Regla 3: Clasificación por Prioridad/Gravedad
  % Clasifica el diagnóstico según la urgencia del síntoma detectado.
  diagnostico_prioridad(Componente, Sintoma, critica) :-
      causa(Componente, Sintoma),
      member(Sintoma, [
          pc_no_enciende, apagado_repentino,
          olor_a_quemado, pitidos_al_arrancar, ruidos_metalicos,
          bateria_hinchada
      ]).

  diagnostico_prioridad(Componente, Sintoma, moderada) :-
      causa(Componente, Sintoma),
      member(Sintoma, [
          pantallazo_azul, congelamientos, artifacts_pantalla,
          error_no_bootable_device, pantalla_negra,
          archivos_corruptos, reinicios_constantes, fallo_driver
      ]).

  diagnostico_prioridad(Componente, Sintoma, preventiva) :-
      causa(Componente, Sintoma),
      member(Sintoma, [
          sistema_lento, calentamiento, ruido_excesivo,
          parpadeo_monitor, no_carga
      ]).

  % Regla 4: Diagnóstico Combinado
  % Dado un conjunto de síntomas, verifica si todos pertenecen
  % a un mismo componente.
  diagnostico_combinado(Componente, Sintomas) :-
      findall(Sintoma, causa(Componente, Sintoma), SintomasComponente),
      subset(Sintomas, SintomasComponente).

  % Regla 5: Diagnóstico de Exclusión
  % Identifica síntomas que apuntan a un único componente posible.
  excluir_fallo(Componente, Sintoma) :-
      causa(Componente, Sintoma),
      findall(C, causa(C, Sintoma), Causantes),
      Causantes = [Componente].

  % Regla 6: Diagnóstico de Correlación
  % Si un síntoma apunta a múltiples componentes, se sugiere revisar ambos.
  diagnostico_correlacion(Componente1, Componente2, Sintoma) :-
      causa(Componente1, Sintoma),
      causa(Componente2, Sintoma),
      Componente1 \\= Componente2.

  % Regla 7: Diagnóstico de Tendencia
  % Síntomas que suelen empeorar progresivamente indican revisión preventiva.
  diagnostico_tendencia(Componente, Sintoma) :-
      causa(Componente, Sintoma),
      member(Sintoma, [calentamiento, sistema_lento, ruido_excesivo]).

  % Regla 8: Diagnóstico por Combinación de Síntomas
  % Detecta cuando un componente presenta a la vez un síntoma
  % funcional y uno de fallo crítico.
  diagnostico_combinacion_sintomas(Componente, Sintoma1, Sintoma2) :-
      causa(Componente, Sintoma1),
      causa(Componente, Sintoma2),
      Sintoma1 \\= Sintoma2,
      member(Sintoma1, [
          pantallazo_azul, congelamientos,
          artifacts_pantalla, pantalla_negra, fallo_driver
      ]),
      member(Sintoma2, [
          error_no_bootable_device, ruidos_metalicos,
          parpadeo_monitor, apagado_repentino
      ]).

  % Regla 9: Diagnóstico de Exclusión Avanzada
  % Confirma un componente porque causa un síntoma presente
  % pero NO causa otro síntoma que también reportó el usuario.
  excluir_fallo_avanzado(Componente, SintomaIncluido, SintomaExcluido) :-
      causa(Componente, SintomaIncluido),
      \\+ causa(Componente, SintomaExcluido).

  % Regla 10: Diagnóstico de Correlación Avanzada
  % Entre dos componentes que comparten un síntoma, identifica cuál
  % revisar primero porque además presenta un síntoma exclusivo.
  diagnostico_correlacion_avanzada(Componente1, Componente2, SintomaComun, SintomaEspecifico) :-
      causa(Componente1, SintomaComun),
      causa(Componente2, SintomaComun),
      Componente1 \\= Componente2,
      causa(Componente1, SintomaEspecifico),
      \\+ causa(Componente2, SintomaEspecifico).

  % Componentes conocidos, sin repetir y en orden alfabético.
  componente(Componente) :-
      setof(C, S^causa(C, S), Componentes),
      member(Componente, Componentes).

  % Regla 11: Diagnóstico por Mayoría de Coincidencias
  % Cuenta cuántos síntomas reportados coinciden con un componente,
  % devuelve cuáles son y suma sus pesos (Puntaje). El orden final
  % por puntaje se hace desde React/JS.
  diagnostico_mayoria(Componente, Sintomas, Coincidencias, Coincidentes, Puntaje) :-
      componente(Componente),
      findall(S-P, (member(S, Sintomas), causa(Componente, S, P)), Pares),
      Pares \\= [],
      length(Pares, Coincidencias),
      findall(S, member(S-_, Pares), Coincidentes),
      findall(P, member(_-P, Pares), Pesos),
      sum_list(Pesos, Puntaje).

  % Regla 12: Diagnóstico Prioritario por Síntoma Crítico
  % Entre varios componentes candidatos, se prioriza el que presenta
  % al menos un síntoma de urgencia crítica.
  diagnostico_prioritario(Componente, Sintomas) :-
      member(Sintoma, Sintomas),
      causa(Componente, Sintoma),
      member(Sintoma, [
          pc_no_enciende, apagado_repentino,
          olor_a_quemado, pitidos_al_arrancar, ruidos_metalicos,
          bateria_hinchada
      ]).

  % Regla 13: Información Insuficiente
  % Si ningún componente coincide con al menos 2 síntomas del reporte,
  % el sistema declara el diagnóstico como indeterminado.
  informacion_insuficiente(Sintomas) :-
      findall(C,
          (findall(S, (member(S, Sintomas), causa(C, S)), M),
           length(M, N), N >= 2),
          Candidatos),
      Candidatos = [].

  % Regla 14: Diagnóstico Múltiple
  % Cuando dos componentes distintos tienen al menos 2 coincidencias
  % con los síntomas reportados, se reportan ambos como sospechosos.
  diagnostico_multiple(Componente1, Componente2, Sintomas) :-
      findall(S1, (member(S1, Sintomas), causa(Componente1, S1)), M1),
      length(M1, N1), N1 >= 2,
      findall(S2, (member(S2, Sintomas), causa(Componente2, S2)), M2),
      length(M2, N2), N2 >= 2,
      Componente1 \\= Componente2.

  % Regla 15: Síntoma Único Ambiguo
  % Si el usuario reporta un solo síntoma que comparte múltiples
  % componentes, se listan todos sin comprometerse a un diagnóstico.
  sintoma_ambiguo(Sintoma, Componentes) :-
      findall(C, causa(C, Sintoma), Componentes),
      length(Componentes, N),
      N > 1.
`
