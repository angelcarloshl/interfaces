import React, { useEffect, useState } from 'react';
import {
  Button,
  Image,
  Text,
  Box,
  Tag,
} from '@chakra-ui/react';

function PersonajeDisney() {
  const [personajeId, setPersonajeId] = useState(300); // Inicia con el ID 300
  const [personaje, setPersonaje] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonaje = async () => {
      setCargando(true);
      try {
        const respuesta = await fetch(`https://api.disneyapi.dev/characters/${personajeId}`);
        const datos = await respuesta.json();
        if (datos.data) {
          setPersonaje(datos.data); // Ajustar según la estructura real de los datos
        } else {
          setError("No se encontró el personaje");
          setPersonaje(null);
        }
      } catch (error) {
        setError("Error al cargar el personaje");
        setPersonaje(null);
      } finally {
        setCargando(false);
      }
    };

    fetchPersonaje();
  }, [personajeId]);

  const handleSiguiente = () => {
    setPersonajeId((prevId) => prevId + 1); // Incrementa el ID
  };

  return (
    <Box textAlign="center" py={10}>
      {cargando && <Text>Cargando...</Text>}
      {error && <Text color="red.500">{error}</Text>}
      {personaje && (
        <>
          <Text fontSize="4xl" fontWeight="bold" mb={2}>{personaje.name.toUpperCase()}</Text>
          {personaje.imageUrl && (
            <Image
              src={personaje.imageUrl}
              alt={`Imagen de ${personaje.name}`}
              boxSize="200px"
              objectFit="cover"
              borderRadius="md"
              m="auto"
              display="block"
            />
          )}
          <Box my={4}>
            {/* Aquí puedes añadir más información del personaje usando componentes de Chakra UI, como Tags */}
          </Box>
          <Box display="flex" justifyContent="center" mt={4}>
            <Button colorScheme="pink" mr={2} onClick={handleSiguiente}>
              Siguiente
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default PersonajeDisney;



