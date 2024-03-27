import React, { useEffect, useState } from 'react';
import {
  Button,
  Image,
  Text,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  Progress,
  Tag,
} from '@chakra-ui/react';

function PokemonStats({ stats }) {
  return (
    <Box p={4} my={4}>
      <StatGroup>
        {stats.map((stat) => (
          <Stat key={stat.stat.name}>
            <StatLabel>{stat.stat.name.toUpperCase()}</StatLabel>
            <StatNumber>{stat.base_stat}</StatNumber>
            <StatHelpText>
              <Progress colorScheme="green" size="sm" value={stat.base_stat} max={255} />
            </StatHelpText>
          </Stat>
        ))}
      </StatGroup>
    </Box>
  );
}

function Pokemon() {
  const [pokemonId, setPokemonId] = useState(25); // Inicia con el Pokémon con ID 25 que es pikachu
  const [pokemon, setPokemon] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setCargando(true);
      try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const datos = await respuesta.json();
        setPokemon(datos);
        setError(null);
      } catch (error) {
        setError("Error al cargar el Pokémon");
        setPokemon(null);
      } finally {
        setCargando(false);
      }
    };

    fetchPokemon();
  }, [pokemonId]);

  return (
    <Box textAlign="center" py={10}>
      {cargando && <Text>Cargando...</Text>}
      {error && <Text color="red.500">{error}</Text>}
      {pokemon && (
        <>
          <Text fontSize="4xl" fontWeight="bold" mb={2}>{pokemon.name.toUpperCase()}</Text>
          {pokemon.sprites && pokemon.sprites.front_default && (
            <Image
              src={pokemon.sprites.front_default}
              alt={`Imagen de ${pokemon.name}`}
              boxSize="200"
              objectFit="cover"
              borderRadius="md"
              m="auto" // Esto centra la imagen horizontalmente
              display="block" // Asegura que la imagen sea tratada como bloque para aplicar márgenes auto
            />
          )}
          <Box my={4}>
            {pokemon.types.map((typeInfo) => (
              <Tag size="lg" colorScheme="cyan" borderRadius="full" mr={2} key={typeInfo.type.name}>
                {typeInfo.type.name.toUpperCase()}
              </Tag>
            ))}
          </Box>
          {pokemon.stats && <PokemonStats stats={pokemon.stats} />}
          <Box display="flex" justifyContent="center" mt={4}>
            <Button colorScheme="pink" mr={2} onClick={() => setPokemonId(Math.max(1, pokemonId - 1))} isDisabled={pokemonId <= 1}>
              Anterior
            </Button>
            <Button colorScheme="blue" onClick={() => setPokemonId(pokemonId + 1)}>
              Siguiente
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Pokemon;


