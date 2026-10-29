export const EXPLICACIONES = {
  // Memoria RAM
  memoria_ram: {
    componente: "Memoria RAM",
    descripcion:
      "La memoria RAM es el espacio de trabajo temporal del procesador. " +
      "Si uno o varios módulos fallan, los datos en tránsito se corrompen " +
      "o no pueden cargarse, causando cuelgues, pantallazos azules, pitidos " +
      "al arrancar y errores aleatorios que cambian entre reinicios.",
    pasos: [
      "Apaga el equipo y resitúa los módulos de RAM (retira e inserta de nuevo).",
      "Si hay más de un módulo, prueba con uno solo a la vez en cada ranura.",
      "Ejecuta MemTest86 desde USB durante al menos un ciclo completo (30–60 min).",
      "Anota los errores detectados: indican qué módulo o ranura está fallando.",
      "Prueba los módulos en otro equipo para confirmar el diagnóstico.",
      "Si hay errores confirmados, reemplaza el módulo defectuoso.",
    ],
    urgencia: "critica",
    herramientas: ["MemTest86", "Windows Memory Diagnostic"],
    videos: [
      {
        titulo: "Cómo usar MemTest86 paso a paso",
        query: "memtest86 tutorial español como usar desde usb",
      },
      {
        titulo: "Cómo reubicar y probar módulos de RAM",
        query: "como reubicar memoria ram pc no detecta modulo",
      },
      {
        titulo: "Diagnóstico de RAM con Windows Memory Diagnostic",
        query: "windows memory diagnostic tutorial español ram",
      },
      {
        titulo: "Cómo saber si tu RAM está fallando",
        query: "como saber si memoria ram esta fallando sintomas",
      },
    ],
  },

  // Disco duro
  disco_duro: {
    componente: "Disco duro / SSD",
    descripcion:
      "El almacenamiento guarda el sistema operativo y todos los archivos. " +
      "Un HDD con sectores dañados produce ruidos metálicos y lentitud extrema; " +
      "un SSD con celdas agotadas puede corromperse sin avisar. " +
      "Ambos pueden fallar en el arranque o perder archivos de forma silenciosa.",
    pasos: [
      "Ejecuta CrystalDiskInfo (Windows) o smartmontools (Linux/Mac) para leer el estado S.M.A.R.T.",
      "Presta atención a: Reallocated Sectors, Pending Sectors y Uncorrectable Errors.",
      "Si alguno de esos valores es mayor a 0, haz una copia de seguridad (o clona el disco) de inmediato.",
      "Solo después de la copia: en Windows ejecuta 'chkdsk C: /f /r' desde CMD como administrador. Esa opción fuerza mucho el disco y puede acelerar su fallo.",
      "En HDD: escucha si hay clics o rechinidos — son señal de fallo mecánico inminente.",
      "Considera reemplazar el disco si la salud S.M.A.R.T. es 'Caution' o 'Bad'.",
    ],
    urgencia: "critica",
    herramientas: [
      "CrystalDiskInfo",
      "smartmontools",
      "chkdsk",
      "GSmartControl",
    ],
    videos: [
      {
        titulo: "Cómo usar CrystalDiskInfo y leer S.M.A.R.T.",
        query: "crystaldiskinfo como leer smart disco duro tutorial español",
      },
      {
        titulo: "Ejecutar chkdsk correctamente en Windows",
        query: "chkdsk tutorial español reparar disco duro sectores",
      },
      {
        titulo: "Señales de que tu disco duro se está muriendo",
        query: "disco duro muriendo sintomas señales ruidos",
      },
      {
        titulo: "Cómo recuperar datos de un disco duro dañado",
        query: "recuperar datos disco duro dañado español tutorial",
      },
    ],
  },

  // Pasta térmica
  pasta_termica: {
    componente: "Pasta térmica",
    descripcion:
      "La pasta térmica rellena las micro-imperfecciones entre el procesador " +
      "y el disipador, conduciendo el calor de forma eficiente. " +
      "Con el tiempo (2–5 años) se reseca y pierde eficiencia, provocando que " +
      "la CPU suba de temperatura aunque el ventilador funcione correctamente. " +
      "En casos graves, el calor acumulado puede desencadenar congelamientos, " +
      "reinicios y apagados de protección.",
    pasos: [
      "Retira el disipador de la CPU con cuidado (desconecta el ventilador primero).",
      "Limpia la pasta vieja de la CPU y el disipador con alcohol isopropílico al 90%+ y un hisopo.",
      "Aplica una cantidad pequeña de pasta nueva en el centro de la CPU (tamaño de un grano de arroz).",
      "No extiendas la pasta manualmente; el disipador la distribuirá al presionar.",
      "Vuelve a montar el disipador con la presión correcta y en orden cruzado.",
      "Verifica temperaturas después con HWMonitor; en reposo deberían bajar 10–20 °C.",
    ],
    urgencia: "preventiva",
    herramientas: ["HWMonitor", "CoreTemp", "alcohol isopropílico 90%+"],
    videos: [
      {
        titulo: "Cómo cambiar la pasta térmica correctamente",
        query: "como cambiar pasta termica cpu paso a paso español",
      },
      {
        titulo: "Cuánta pasta térmica aplicar y cómo distribuirla",
        query: "cuanta pasta termica aplicar cpu metodos correctos",
      },
      {
        titulo: "Mejores pastas térmicas y cuál comprar",
        query: "mejores pastas termicas cpu comparativa español",
      },
    ],
  },

  // Ventilador / refrigeración
  ventilador: {
    componente: "Ventilador / Sistema de refrigeración",
    descripcion:
      "Los ventiladores expulsan el aire caliente del gabinete y del disipador. " +
      "Un ventilador obstruido por polvo, con rodamiento desgastado o desconectado " +
      "deja sin refrigeración al sistema. La BIOS detecta RPM en cero y puede " +
      "emitir pitidos, impedir el arranque o apagar el equipo por protección térmica. " +
      "El polvo acumulado también frena las RPM y eleva las temperaturas de toda la placa.",
    pasos: [
      "Al encender, observa si todos los ventiladores (CPU, GPU, gabinete) giran.",
      "Limpia el polvo del disipador y los fans con aire comprimido cada 6–12 meses.",
      "Comprueba que los conectores del ventilador CPU estén en el header 'CPU_FAN' de la placa base.",
      "En la BIOS, verifica que 'CPU Fan Speed' reporte RPM mayor a 0.",
      "Si el ventilador hace ruido de rodamiento, reemplázalo antes de que falle por completo.",
      "Considera agregar ventiladores de gabinete si las temperaturas siguen altas.",
    ],
    urgencia: "critica",
    herramientas: [
      "HWMonitor",
      "FanControl",
      "Control de ventiladores de la BIOS",
    ],
    videos: [
      {
        titulo: "Cómo limpiar el PC con aire comprimido",
        query: "como limpiar pc polvo aire comprimido tutorial ventiladores",
      },
      {
        titulo: "Cómo conectar ventiladores correctamente a la placa base",
        query: "como conectar ventiladores placa madre cpu fan header",
      },
      {
        titulo: "Cómo controlar la velocidad de los fans desde BIOS",
        query: "como controlar velocidad ventiladores bios fan curve español",
      },
      {
        titulo: "Cómo reemplazar el ventilador de CPU",
        query: "como cambiar ventilador cpu disipador tutorial español",
      },
    ],
  },

  // Procesador
  procesador: {
    componente: "Procesador (CPU)",
    descripcion:
      "La CPU ejecuta todas las instrucciones del sistema. " +
      "Si alcanza temperaturas críticas (>95 °C en la mayoría de modelos), " +
      "activa el throttling térmico (baja su velocidad) y, si el calor persiste, " +
      "apaga el equipo por protección. Fallos internos de la CPU son menos comunes " +
      "pero pueden causar congelamientos, pantallazos azules o reinicios impredecibles. " +
      "Un error de arranque también puede indicar daño en los pines o el socket.",
    pasos: [
      "Instala HWMonitor o CoreTemp y revisa la temperatura de la CPU en reposo y bajo carga.",
      "En reposo: < 50 °C es normal. Bajo carga: < 85 °C es aceptable.",
      "Si supera 90 °C en reposo, la pasta térmica o el disipador son el problema inmediato.",
      "Verifica que el disipador esté firmemente sujeto y sin holgura.",
      "Descarta overclocking: regresa a valores por defecto en la BIOS si está activo.",
      "No ejecutes pruebas de estrés (Prime95) si el equipo ya se apaga o supera 90 °C en reposo: arregla primero la refrigeración.",
      "Si las temperaturas son normales pero hay congelamientos, evalúa la RAM y el disco primero.",
      "Revisa visualmente los pines del socket (Intel) o de la CPU (AMD) buscando pines doblados.",
      "Un fallo de CPU propiamente dicho es raro; descarta otros componentes antes.",
    ],
    urgencia: "critica",
    herramientas: ["HWMonitor", "CoreTemp", "CPU-Z", "Prime95 (stress test)"],
    videos: [
      {
        titulo: "Cómo revisar la temperatura de tu CPU en tiempo real",
        query: "como ver temperatura cpu hwmonitor coretemp tutorial español",
      },
      {
        titulo: "Temperaturas normales de CPU en reposo y bajo carga",
        query: "temperaturas normales cpu gaming reposo que es normal español",
      },
      {
        titulo: "Qué es el throttling térmico y cómo solucionarlo",
        query: "que es thermal throttling cpu como solucionar español",
      },
      {
        titulo: "Stress test de CPU con Prime95",
        query: "prime95 stress test cpu tutorial español como usar",
      },
    ],
  },

  // Fuente de poder
  fuente_poder: {
    componente: "Fuente de poder (PSU)",
    descripcion:
      "La fuente convierte la corriente alterna de la red eléctrica en los voltajes " +
      "que necesita cada componente (+12 V, +5 V, +3.3 V). " +
      "Si entrega voltajes inestables o insuficientes, el sistema se apaga sin aviso, " +
      "no enciende, o puede generar reinicios y congelamientos aleatorios. " +
      "El olor a quemado indica un fallo grave e irreversible que puede dañar otros componentes.",
    pasos: [
      "Huele el interior del gabinete: olor a quemado indica fallo grave — no enciendas más el equipo.",
      "Revisa que el cable de alimentación y el interruptor trasero de la PSU estén bien.",
      "Verifica que los conectores de 24 pines (placa base) y 8 pines (CPU) estén insertados completamente.",
      "Prueba con otra fuente compatible si tienes acceso a una.",
      "Usa un tester de PSU o multímetro para medir voltajes en los conectores Molex.",
      "Si la fuente está dañada, reemplázala antes de usar el equipo: puede dañar todos los componentes.",
      "Al comprar reemplazo, verifica que tenga la potencia suficiente (usa PCPartPicker).",
    ],
    urgencia: "critica",
    alerta:
      "Si notas olor a quemado, apaga y desconecta el equipo ahora y no lo vuelvas a encender hasta que lo revise un técnico.",
    herramientas: ["Tester de PSU", "Multímetro", "HWMonitor (voltajes)"],
    videos: [
      {
        titulo: "Cómo probar una fuente de poder con tester",
        query: "como probar fuente de poder psu tester multimetro tutorial",
      },
      {
        titulo: "Síntomas de fuente de poder dañada o insuficiente",
        query: "fuente de poder dañada insuficiente sintomas señales pc",
      },
      {
        titulo: "Cómo elegir una fuente de poder para tu PC",
        query: "como elegir fuente de poder psu watts pc gaming español",
      },
      {
        titulo: "Cómo calcular los watts que necesita tu PC",
        query: "calcular watts fuente poder pc pcpartpicker tutorial español",
      },
    ],
  },

  // Tarjeta gráfica
  tarjeta_grafica: {
    componente: "Tarjeta gráfica (GPU)",
    descripcion:
      "La GPU procesa y genera la imagen que ves en el monitor. " +
      "Si falla su memoria de video (VRAM), aparecen artefactos visuales, " +
      "rayas o píxeles de colores. Un driver corrupto o desactualizado puede " +
      "causar pantalla negra o cierres inesperados. " +
      "El sobrecalentamiento de la GPU también provoca apagados de protección " +
      "y congelamientos bajo carga gráfica.",
    pasos: [
      "Reinstala los drivers usando DDU (Display Driver Uninstaller) en modo seguro, luego instala la versión más reciente.",
      "Resitúa la tarjeta en el slot PCIe (retira, limpia contactos con goma, reinserta).",
      "Verifica los conectores de alimentación PCIe (6 u 8 pines) de la GPU.",
      "Conecta el monitor a la salida de video integrada de la placa base: si la imagen es normal, el problema es la GPU.",
      "Revisa la temperatura de la GPU con GPU-Z o MSI Afterburner bajo carga; no debería superar 90 °C.",
      "Si los artefactos aparecen incluso en BIOS o antes de cargar Windows, el fallo es de hardware.",
      "No uses FurMark si la GPU ya se apaga o supera 90 °C: primero revisa la refrigeración.",
      "Como último recurso, prueba la GPU en otro equipo para confirmar si el fallo es del componente.",
    ],
    urgencia: "moderada",
    herramientas: [
      "DDU (Display Driver Uninstaller)",
      "GPU-Z",
      "MSI Afterburner",
      "FurMark (stress test)",
    ],
    videos: [
      {
        titulo: "Cómo desinstalar drivers de GPU con DDU correctamente",
        query: "display driver uninstaller ddu tutorial español como usar",
      },
      {
        titulo: "Cómo reubicar la tarjeta gráfica en el slot PCIe",
        query: "como reubicar tarjeta grafica pcie limpiar contactos tutorial",
      },
      {
        titulo: "Cómo revisar temperatura de GPU con MSI Afterburner",
        query: "msi afterburner temperatura gpu monitoreo tutorial español",
      },
      {
        titulo: "Stress test de GPU con FurMark",
        query: "furmark stress test gpu tutorial español artefactos",
      },
    ],
  },

  // Motherboard
  placa_madre: {
    componente: "Placa madre (Motherboard)",
    descripcion:
      "La placa madre es el circuito central que conecta e interconecta todos " +
      "los componentes del sistema. Si sus condensadores fallan, sus pistas se dañan " +
      "o los circuitos de alimentación se degradan, puede impedir el arranque, " +
      "generar pitidos de POST, causar que la RAM o GPU no sean detectadas, " +
      "o producir apagados y reinicios completamente aleatorios e impredecibles.",
    pasos: [
      "Observa la placa con una linterna: busca condensadores abombados, manchas quemadas o pistas dañadas.",
      "Revisa los códigos de pitido POST de tu BIOS (consulta el manual de la placa) para identificar qué falla.",
      "Si la placa tiene LED de diagnóstico o display de código Q-Code, úsalos para identificar el componente problemático.",
      "Desconecta todos los periféricos no esenciales y arranca solo con CPU, RAM mínima y video.",
      "Resetea la BIOS quitando la batería CMOS 30 segundos o usando el jumper CMOS_RST.",
      "Verifica que el conector ATX de 24 pines y el EPS de 8 pines estén completamente insertados.",
      "Si hay olor a quemado o condensadores visiblemente dañados, la placa debe reemplazarse.",
      "Un fallo de placa madre es difícil de confirmar sin equipo de reemplazo; descarta CPU y RAM primero.",
    ],
    urgencia: "critica",
    alerta:
      "Si notas olor a quemado o condensadores quemados, apaga y desconecta el equipo ahora y no lo vuelvas a encender.",
    herramientas: ["Multímetro", "Tester de POST", "CPU-Z", "HWMonitor"],
    videos: [
      {
        titulo: "Cómo identificar una placa madre dañada",
        query:
          "como saber si placa madre dañada condensadores quemados tutorial",
      },
      {
        titulo: "Cómo leer los pitidos POST de la BIOS",
        query: "pitidos bios post significado diagnostico placa madre tutorial",
      },
      {
        titulo: "Cómo resetear la BIOS y la batería CMOS",
        query: "como resetear bios bateria cmos jumper tutorial español",
      },
      {
        titulo: "Cómo diagnosticar placa madre con mínimos componentes",
        query:
          "diagnostico placa madre minimos componentes arranque bios español",
      },
    ],
  },

  // Monitor
  monitor: {
    componente: "Monitor / Cable de video",
    descripcion:
      "El monitor y su cable de video son el último eslabón entre la GPU y tus ojos. " +
      "Un cable flojo o dañado, un puerto sucio o un panel con falla provocan pantalla negra, " +
      "parpadeos y rayas aunque el resto del equipo funcione bien. " +
      "Es la causa más barata y rápida de descartar antes de sospechar de la GPU o la placa.",
    pasos: [
      "Revisa que el monitor esté encendido y que la fuente de entrada (HDMI, DisplayPort, VGA) sea la correcta en su menú.",
      "Desconecta y vuelve a conectar el cable de video en ambos extremos; comprueba que no tenga pines doblados.",
      "Prueba con otro cable y, si puedes, con otro puerto de salida de la tarjeta gráfica.",
      "Conecta el monitor a otro equipo, o conecta otro monitor o una TV a tu PC, para saber cuál de los dos falla.",
      "Si el parpadeo aparece también en el menú propio del monitor, el panel está dañado.",
      "Ajusta la frecuencia de actualización (Hz) a un valor soportado por el monitor y el cable.",
    ],
    urgencia: "moderada",
    herramientas: [
      "Otro cable de video",
      "Otro monitor o TV",
      "Menú OSD del monitor",
    ],
    videos: [
      {
        titulo: "Cómo saber si el problema es el monitor o la PC",
        query:
          "monitor sin señal como saber si es el monitor o la tarjeta grafica",
      },
      {
        titulo: "Por qué parpadea mi monitor y cómo solucionarlo",
        query:
          "monitor parpadea solucion cable hz frecuencia actualizacion español",
      },
      {
        titulo: "Diferencias entre HDMI, DisplayPort y VGA",
        query: "diferencias hdmi displayport vga cual usar monitor",
      },
    ],
  },

  // Batería
  bateria: {
    componente: "Batería (laptops)",
    descripcion:
      "La batería de una laptop suministra energía cuando no está conectada a la red. " +
      "Con el tiempo, sus celdas pierden capacidad y pueden inflamarse físicamente. " +
      "Una batería degradada puede causar apagados sin previo aviso incluso con porcentaje " +
      "alto mostrado en pantalla, impedir el arranque si está completamente descargada, " +
      "o generar calentamiento excesivo debajo del equipo.",
    pasos: [
      "Conecta el cargador original y verifica que el LED de carga encienda; si no lo hace, prueba con otro cargador.",
      "En Windows: abre CMD y ejecuta 'powercfg /batteryreport' para ver el estado de salud de la batería.",
      "Compara 'Design Capacity' con 'Full Charge Capacity': si la diferencia supera el 30%, la batería está degradada.",
      "En el BIOS/UEFI de algunos fabricantes (Lenovo, HP, Dell) hay sección de diagnóstico de batería.",
      "Prueba el equipo solo con el cargador (sin batería): si funciona bien, el problema es la batería.",
      "Si la batería está físicamente hinchada (la tapa trasera se levanta), retírala de inmediato y no la uses.",
      "Reemplaza la batería con una original o de fabricante reconocido; evita baterías genéricas de bajo costo.",
    ],
    urgencia: "moderada",
    alerta:
      "Si la batería está hinchada, deja de usar y de cargar el equipo: puede incendiarse. Retírala con cuidado y llévala a un punto de reciclaje.",
    herramientas: ["powercfg /batteryreport", "BatteryInfoView", "HWMonitor"],
    videos: [
      {
        titulo: "Cómo generar reporte de salud de batería en Windows",
        query: "powercfg batteryreport windows salud bateria laptop tutorial",
      },
      {
        titulo: "Cómo saber si la batería de tu laptop está dañada",
        query: "como saber si bateria laptop dañada degradada sintomas español",
      },
      {
        titulo: "Cómo cambiar la batería de una laptop",
        query: "como cambiar bateria laptop tutorial paso a paso español",
      },
      {
        titulo: "Batería hinchada: qué hacer y cómo retirarla con seguridad",
        query: "bateria laptop hinchada que hacer como retirar seguridad",
      },
    ],
  },

  // Sistema operativo
  sistema_operativo: {
    componente: "Sistema operativo / Software",
    descripcion:
      "El sistema operativo administra todos los recursos del hardware. " +
      "Archivos de sistema corruptos, drivers desactualizados o malware pueden " +
      "provocar pantallazos azules, congelamientos y lentitud que imitan fallos de hardware. " +
      "Antes de reemplazar cualquier componente físico, siempre conviene descartar " +
      "una causa de software, ya que es más rápida y económica de resolver.",
    pasos: [
      "Ejecuta 'sfc /scannow' en CMD como administrador para reparar archivos de sistema corruptos.",
      "Ejecuta 'DISM /Online /Cleanup-Image /RestoreHealth' si sfc reporta errores que no pudo reparar.",
      "Busca malware con Malwarebytes (versión gratuita) en modo seguro.",
      "Revisa el Visor de Eventos (eventvwr) buscando errores críticos en las horas previas al fallo.",
      "Actualiza o reinstala los drivers problemáticos desde el Administrador de Dispositivos.",
      "Si el problema persiste, realiza una reparación de Windows con el medio de instalación ('Reparar equipo').",
      "Como último recurso, realiza una instalación limpia de Windows conservando tus archivos.",
    ],
    urgencia: "moderada",
    herramientas: [
      "sfc /scannow",
      "DISM",
      "Malwarebytes",
      "Visor de Eventos",
      "Administrador de Dispositivos",
    ],
    videos: [
      {
        titulo: "Cómo usar sfc /scannow y DISM para reparar Windows",
        query:
          "sfc scannow dism reparar windows tutorial español archivos corruptos",
      },
      {
        titulo: "Cómo analizar el Visor de Eventos para diagnosticar errores",
        query:
          "visor eventos windows diagnostico errores criticos tutorial español",
      },
      {
        titulo: "Cómo limpiar malware con Malwarebytes gratis",
        query:
          "malwarebytes tutorial español eliminar malware gratis modo seguro",
      },
      {
        titulo: "Cómo reinstalar Windows sin perder archivos",
        query:
          "reinstalar windows sin perder archivos reparacion tutorial español",
      },
    ],
  },
}
