import axios from "axios";
import { PrismaClient } from "@prisma/client";

import PokeApiGateway from "./data/gateways/PokeApiGateway";

import GetAllController from "./application/controllers/GetAllController";
import FindOneController from "./application/controllers/FindOneController";

import GetAllUseCase from "./domain/use-cases/GetAllUseCase";
import FindOneUseCase from "./domain/use-cases/FindOneUseCase";
import PokemonRepository from "./domain/repositories/PokemonRepository";

import PokemonPrismaStorage from "./data/gateways/PokemonPrismaStorage";

const prismaClient = new PrismaClient()
const axiosClient = axios.create()
const pokeApiGateway = new PokeApiGateway(axiosClient)
const pokemonStorage = new PokemonPrismaStorage(prismaClient)
const pokemonRepository = new PokemonRepository(pokeApiGateway, pokemonStorage)

const getAllUseCase = new GetAllUseCase(pokemonRepository)
const findOneUseCase = new FindOneUseCase(pokemonRepository)

const getAllController = new GetAllController(getAllUseCase)
const findOneController = new FindOneController(findOneUseCase)

export { getAllController, findOneController }