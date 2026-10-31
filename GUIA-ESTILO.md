# Guía de estilo — Cómo escribe Javi

Referencia para redactar entradas del blog (y copy del portfolio) que suenen a mí y no a IA.
Basada en frases reales de mis posts, del copy de la web y de cómo hablo.

## La voz en una frase

Directo, español de España, con humor seco y cero humo: cuento un problema real mío,
explico qué monté para resolverlo y opino sin rodeos.

## Rasgos que me definen (usar)

1. **Arranque narrativo con problema propio.** Nunca con contexto genérico ni definiciones.
   - "En casa siempre acabábamos comprando lo mismo dos veces o llegando al súper sin la mitad de la lista."
   - "Cada Mundial repetíamos el mismo ritual: una hoja de cálculo compartida, predicciones a mano y, sin falta, alguien discutiendo cómo se contaban los puntos."
   - "Yo solo quería apuntar series y ver si progresaba. Así que me hice IronLog."

2. **"Así que…" como pivote** problema → solución. Es mi conector natural.
   - "Funcionaba… regular. Así que decidí montarlo bien."

3. **Coloquialismos de aquí**, con moderación (1-3 por post, no en cada párrafo):
   "la chicha", "sin humo", "tirar el tiempo", "la web vuela", "sin florituras",
   "sin enredos", "picarse con los amigos", "montar/te lo monto", "regular" (como valoración).

4. **Frases cortas de remate.** Una idea, punto.
   - "No tan rápido."
   - "No hay magia, hay decisiones técnicas."
   - "Si no sé explicarlo, no entra."

5. **Paréntesis con acotación irónica o aclaratoria.**
   - "funciona sin cobertura en el gimnasio (donde el WiFi siempre falla)."

6. **Puntos suspensivos para el matiz.**
   - "Funcionaba… regular."

7. **Opinión tajante y verificable.** Digo lo que pienso y por qué, con datos si los hay.
   - "Cada plugin de WordPress es una puerta más que mantener actualizada."
   - "No me fío a ciegas. Verifico todo lo que toca código o datos; la IA se equivoca con seguridad aparente."

8. **Primera persona y experiencia real.** Lo que uso a diario, lo que me falló, lo que aprendí.
   Nada de "muchos desarrolladores opinan que…".

9. **Con clientes: libertad, no paquetes.** El mensaje comercial siempre deja claro que
   el cliente elige y decide el producto final; yo pongo el criterio técnico, no un menú cerrado.
   - "Nada de paquetes raros ni letra pequeña: me cuentas qué necesitas y te lo monto."
   - Ofrecer opciones con su trade-off ("si quieres X, esto cuesta Y; si te vale Z, más simple"),
     nunca "la única forma correcta".

## Tics de IA que hay que evitar (detectados en mis posts actuales)

1. **Estructura clonada.** No repetir el molde "La idea / El stack / Por qué X / Lo que me llevo"
   en cada post. Variar: a veces cronológico, a veces un solo hilo, a veces empezar por el error.
2. **Negrita-muletilla.** Nada de poner en negrita la "idea clave" de cada frase o bullet.
   Negrita solo si de verdad quiero que alguien que escanea se lleve ESO. Máximo 2-3 por post.
3. **Cierre aforismo.** Prohibido terminar con eslogan pulido tipo
   "El valor no está en que escriba por ti, sino en que te ayude a pensar antes de escribir."
   Mejor terminar con algo concreto: qué haría distinto, qué sigue, o un enlace útil.
4. **"No X, sino Y".** Máximo una vez por post. Es el tic de contraste favorito de las IA.
5. **Guiones largos sistemáticos.** Los incisos con — están bien de vez en cuando,
   no en cada párrafo.
6. **Listas numeradas 1-4 + "Conclusión".** Si el contenido no es una secuencia real,
   no numerar. Y la sección "Conclusión" casi nunca hace falta.
7. **Emojis, "En resumen", "en el mundo actual", "cabe destacar"**: nunca (esto ya lo hago bien).

## Quién escribe (datos que se pueden usar)

Todo dato sobre mí sale del CV (`Desktop\Documentos\cv`) o de `src/utils/data/profileData.ts`.
Nada de inventar clientes, cifras ni anécdotas: si no ha pasado, no se cuenta.

- Javier García Magaldi, "Javi". Santander. Ingeniería Informática en la Universidad de Cantabria (2014-2020).
- 6+ años en producción. Senior full-stack en AMS Solutions desde 2023 (ecosistema Inditex,
  apps internas con 10.000+ usuarios diarios). Antes Innova-tsn (2022-2023) e Incentro (2020-2022).
- Stack: React, TypeScript, Next.js, React Native/Expo, Node, Java + Spring Boot, MongoDB, Postgres.
- Clientes reales: Ū Medicina Estética (web bilingüe + panel propio de agenda y citas, Santander)
  y Ū Skin Store (Shopify con productos que solo se compran con código de la clínica).
- Proyectos propios: Showcase (base para webs de comercios), Compras App (en uso diario, en mi NAS),
  IronLog (app de gimnasio offline), Porra del Mundial, una web de boda.
- Cómo trabajo con clientes: respondo en menos de 48 h, presupuesto cerrado antes de empezar,
  entregas por fases, el cliente elige entre opciones con su coste.
- Ojo: trabajo a jornada completa en AMS. Nada de "mi agencia", "mi equipo" ni "cientos de clientes".

## Cómo hablo (además de lo de arriba)

- Expresiones de casa, sueltas: "le vamos dando", "vamos con ello", "mejor que sobre que no que falte".
- Pienso en voz alta y le pregunto al lector: "¿o no es así?", "¿te suena?". Una o dos por post, no más.
- Hablo de tú al lector, siempre. Nada de "usted" ni de "el usuario".
- Si algo depende, digo de qué depende. No escondo el "depende" detrás de frases bonitas.

## Formato de los posts

Dos tipos, con medidas distintas:

- **Post de proyecto o personal**: 300-500 palabras. Si necesito más, probablemente son dos posts.
- **Artículo SEO del calendario** (`SEO Strategy - Magaldog.com.xlsx`): guía pilar 1.000-1.500 palabras,
  satélite 600-900. Aquí sí manda la estructura útil para quien busca (pasos reales, comparativas),
  pero con la misma voz: arranque propio, opinión y cero relleno.

Reglas de los artículos SEO:

- Keyword principal en el H1 (`title`), en el primer párrafo y en al menos un H2, escrita como la diría una persona.
- `seoTitle` en el frontmatter cuando el H1 pasa de 60 caracteres: es el `<title>` de Google, va tal cual.
- `excerpt` = meta description del Excel, 140-155 caracteres.
- La fecha del frontmatter es la fecha prevista del calendario: en producción el post no aparece
  hasta ese día (se puede escribir con antelación).
- Enlaces: siempre a la landing del cluster (ES `/servicios/…`, EN `/en/services/…`) y a los posts ya
  publicados. Los marcados "planificado" se enlazan cuando existan: al publicar uno, repasar la guía pilar.
- Respetar la columna "Diferenciación" del Excel: cada artículo con su intención, sin pisar a otro ni a la landing.

Para todos:

- H2 con títulos propios, no genéricos ("Por qué Supabase" mejor que "Tecnologías utilizadas").
- Tildes y ortografía impecables (aunque yo escriba rápido sin tildes en chats, el blog va limpio).
- Enlaces internos: si menciono algo que ya conté en otro post o proyecto, lo enlazo.
- CTA final según el tipo de post:
  - Post de proyecto → enlace al proyecto.
  - Post comercial/SEO → enlace a contacto ("escríbeme") además de proyectos.
- Versión EN: fiel al ES pero idiomática, no literal ("Funcionaba… regular." → "It sort of worked.").

## Checklist antes de publicar

- [ ] ¿Arranca con una situación real mía?
- [ ] ¿Hay al menos una opinión que alguien podría discutirme?
- [ ] ¿Menos de 3 negritas?
- [ ] ¿El cierre dice algo concreto (no un aforismo)?
- [ ] ¿Estructura distinta al post anterior?
- [ ] ¿Enlaces internos donde tocan?
- [ ] ¿Lo leería en voz alta sin que me dé vergüenza?
- [ ] ¿Todos los datos sobre mí cuadran con el CV?
- [ ] (SEO) ¿Keyword en H1, primer párrafo y un H2? ¿`seoTitle` ≤ 60 y `excerpt` ≤ 155?
- [ ] (SEO) ¿Enlace a la landing del cluster con la URL de su idioma?
