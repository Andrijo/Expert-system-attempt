// Base de Conocimiento

export const BASE_CONOCIMIENTO = `
  :- use_module(library(lists)).

  % Hechos

  % Memoria RAM 
  causa(memoria_ram, pantallazo_azul).
  causa(memoria_ram, reinicios_constantes).
  causa(memoria_ram, pitidos_al_arrancar).
  causa(memoria_ram, pantalla_negra).
  causa(memoria_ram, congelamientos).
  causa(memoria_ram, sistema_lento).
  causa(memoria_ram, archivos_corruptos).
  causa(memoria_ram, error_no_bootable_device).
  causa(memoria_ram, parpadeo_monitor).
  causa(memoria_ram, apagado_repentino).

  % Disco Duro / SSD
  causa(disco_duro, congelamientos).
  causa(disco_duro, sistema_lento).
  causa(disco_duro, error_no_bootable_device).
  causa(disco_duro, ruidos_metalicos).
  causa(disco_duro, archivos_corruptos).
  causa(disco_duro, reinicios_constantes).
  causa(disco_duro, pantalla_negra).
  causa(disco_duro, apagado_repentino).
  causa(disco_duro, pitidos_al_arrancar).
  causa(disco_duro, calentamiento).

  % Ventilador / Refrigeración 
  causa(ventilador, calentamiento).
  causa(ventilador, ruido_excesivo).
  causa(ventilador, apagado_repentino).
  causa(ventilador, pc_no_enciende).
  causa(ventilador, pitidos_al_arrancar).
  causa(ventilador, parpadeo_monitor).
  causa(ventilador, sistema_lento).
  causa(ventilador, congelamientos).
  causa(ventilador, reinicios_constantes).
  causa(ventilador, pantalla_negra).

  % Pasta Térmica 
  causa(pasta_termica, calentamiento).
  causa(pasta_termica, apagado_repentino).
  causa(pasta_termica, sistema_lento).
  causa(pasta_termica, congelamientos).
  causa(pasta_termica, reinicios_constantes).
  causa(pasta_termica, pantalla_negra).
  causa(pasta_termica, ruido_excesivo).
  causa(pasta_termica, pitidos_al_arrancar).
  causa(pasta_termica, parpadeo_monitor).
  causa(pasta_termica, pantallazo_azul).

  % Procesador / CPU 
  causa(procesador, calentamiento).
  causa(procesador, congelamientos).
  causa(procesador, apagado_repentino).
  causa(procesador, sistema_lento).
  causa(procesador, pantalla_negra).
  causa(procesador, pitidos_al_arrancar).
  causa(procesador, pantallazo_azul).
  causa(procesador, reinicios_constantes).
  causa(procesador, error_no_bootable_device).
  causa(procesador, parpadeo_monitor).

  % Fuente de Poder / PSU 
  causa(fuente_poder, apagado_repentino).
  causa(fuente_poder, pc_no_enciende).
  causa(fuente_poder, olor_a_quemado).
  causa(fuente_poder, reinicios_constantes).
  causa(fuente_poder, parpadeo_monitor).
  causa(fuente_poder, congelamientos).
  causa(fuente_poder, pantalla_negra).
  causa(fuente_poder, ruidos_metalicos).
  causa(fuente_poder, sistema_lento).
  causa(fuente_poder, pitidos_al_arrancar).

  % Tarjeta Gráfica / GPU 
  causa(tarjeta_grafica, artifacts_pantalla).
  causa(tarjeta_grafica, pantalla_negra).
  causa(tarjeta_grafica, parpadeo_monitor).
  causa(tarjeta_grafica, calentamiento).
  causa(tarjeta_grafica, fallo_driver).
  causa(tarjeta_grafica, apagado_repentino).
  causa(tarjeta_grafica, ruido_excesivo).
  causa(tarjeta_grafica, congelamientos).
  causa(tarjeta_grafica, reinicios_constantes).
  causa(tarjeta_grafica, pantallazo_azul).

  % Placa Madre / Motherboard
  causa(placa_madre, pc_no_enciende).
  causa(placa_madre, pitidos_al_arrancar).
  causa(placa_madre, pantalla_negra).
  causa(placa_madre, reinicios_constantes).
  causa(placa_madre, error_no_bootable_device).
  causa(placa_madre, olor_a_quemado).
  causa(placa_madre, parpadeo_monitor).
  causa(placa_madre, congelamientos).
  causa(placa_madre, apagado_repentino).
  causa(placa_madre, artifacts_pantalla).

  % Batería (laptops) 
  causa(bateria, apagado_repentino).
  causa(bateria, pc_no_enciende).
  causa(bateria, sistema_lento).
  causa(bateria, reinicios_constantes).
  causa(bateria, no_carga).
  causa(bateria, calentamiento).
  causa(bateria, parpadeo_monitor).
  causa(bateria, pantalla_negra).
  causa(bateria, congelamientos).
  causa(bateria, pitidos_al_arrancar).

  % Sistema Operativo / Software 
  causa(sistema_operativo, sistema_lento).
  causa(sistema_operativo, congelamientos).
  causa(sistema_operativo, pantallazo_azul).
  causa(sistema_operativo, reinicios_constantes).
  causa(sistema_operativo, archivos_corruptos).
  causa(sistema_operativo, fallo_driver).
  causa(sistema_operativo, error_no_bootable_device).
  causa(sistema_operativo, pantalla_negra).
  causa(sistema_operativo, apagado_repentino).
  causa(sistema_operativo, parpadeo_monitor).


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
          olor_a_quemado, pitidos_al_arrancar, ruidos_metalicos
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
  % Cuenta cuántos síntomas reportados coinciden con un componente
  % y devuelve cuáles son. Permite ordenar los resultados desde React/JS.
  diagnostico_mayoria(Componente, Sintomas, Coincidencias, Coincidentes) :-
      componente(Componente),
      findall(S, (member(S, Sintomas), causa(Componente, S)), Coincidentes),
      length(Coincidentes, Coincidencias),
      Coincidencias > 0.

  % Regla 12: Diagnóstico Prioritario por Síntoma Crítico
  % Entre varios componentes candidatos, se prioriza el que presenta
  % al menos un síntoma de urgencia crítica.
  diagnostico_prioritario(Componente, Sintomas) :-
      member(Sintoma, Sintomas),
      causa(Componente, Sintoma),
      member(Sintoma, [
          pc_no_enciende, apagado_repentino,
          olor_a_quemado, pitidos_al_arrancar, ruidos_metalicos
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
